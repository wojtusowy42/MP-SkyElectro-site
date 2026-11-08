<!--
  Konfigurator produktu (wzór: strona "Kup" na apple.com).

  Cała logika (które kroki widać, czyszczenie wyborów, MOQ, wycena) jest w
  src/lib/configurator.ts i jest przetestowana. Ten komponent tylko ją wyświetla.

  Zasady wyglądu: jeden krok naraz w polu widzenia (duże odstępy między krokami),
  duże kafelki, podsumowanie dopiero po wybraniu wszystkiego.
  Krok, którego wszystkie opcje mają kolor (swatch), wyświetla się jako kółka kolorów.
  Każdy krok to grupa radio: działa z klawiatury i czytnikiem ekranu.
-->
<script lang="ts">
  import { onMount } from 'svelte';
  import type { ConfiguratorDefinition, ConfiguratorStep, Price } from '../../data/types.ts';
  import type { ProductTexts } from '../../i18n/index.ts';
  import type { Locale } from '../../i18n/locales.ts';
  import {
    checkQuantity,
    cleanSelection,
    isComplete,
    quote,
    visibleSteps,
    type Selection,
  } from '../../lib/configurator.ts';
  import { activePromo, currentPrice, formatPrice } from '../../lib/price.ts';
  import { addLine, readBag, writeBag } from '../../lib/bag.ts';

  interface Labels {
    summary: string;
    summaryHint: string;
    quantity: string;
    decrease: string;
    increase: string;
    total: string;
    chooseFirst: string;
    selectedOption: string;
    perPiece: string;
    priceOnRequest: string;
    lowestPrice30Days: string;
    minOrder: string;
    addToBag: string;
    addedToBag: string;
    viewBag: string;
  }

  interface Props {
    /** Id produktu (do torby). */
    productId: string;
    /** Adres strony torby. */
    bagHref: string;
    definition: ConfiguratorDefinition;
    texts: ProductTexts;
    labels: Labels;
    locale: Locale;
    /** Krótkie opisy pod nazwą opcji: krok → opcja. */
    hints?: Record<string, Record<string, string>>;
    /** Dzień buildu 'RRRR-MM-DD': ceny i promocje liczą się tak samo jak na reszcie strony. */
    today: string;
    /**
     * Parametry adresu, które wybierają opcję przy starcie: nazwa parametru → id kroku.
     * Np. { wersja: 'type' }: /konfigurator/?wersja=kit wybiera "Zestaw pełny".
     */
    urlParams?: Record<string, string>;
  }

  const {
    productId,
    bagHref,
    definition,
    texts,
    labels,
    locale,
    hints = {},
    today,
    urlParams = {},
  }: Props = $props();
  const date = new Date(`${today}T12:00:00`);

  // Kroki z jedną opcją są wybrane od razu (nie ma czego wybierać).
  const initial: Selection = {};
  for (const step of definition.steps) {
    const only = step.options.length === 1 ? step.options[0] : undefined;
    if (only) initial[step.id] = only.id;
  }

  let selection = $state<Selection>(initial);

  // Wybór z adresu (np. przycisk "Zamów" przy zestawie na stronie produktu), raz przy starcie.
  // Tylko istniejące opcje; czyszczenie wyborów przez cleanSelection, jak przy kliknięciu.
  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    let next = selection;
    for (const [param, stepId] of Object.entries(urlParams)) {
      const value = params.get(param);
      const step = definition.steps.find((s) => s.id === stepId);
      if (value && step?.options.some((o) => o.id === value)) {
        next = cleanSelection(definition, { ...next, [stepId]: value });
      }
    }
    if (next !== selection) selection = next;
  });
  let quantity = $state(definition.quantity.min);

  const clean = $derived(cleanSelection(definition, selection));
  // Galeria (Gallery.astro) słucha wyborów: pokazuje zdjęcia w wybranym kolorze.
  $effect(() => {
    window.dispatchEvent(new CustomEvent('configurator:change', { detail: { ...clean } }));
  });
  const steps = $derived(visibleSteps(definition, clean));
  const complete = $derived(isComplete(definition, clean));
  const result = $derived(quote(definition, clean, quantity, date));
  const canDecrease = $derived(checkQuantity(definition, quantity - 1) === null);
  const canIncrease = $derived(checkQuantity(definition, quantity + 1) === null);

  /** Krok jest zablokowany, dopóki któryś wcześniejszy widoczny krok nie ma wyboru. */
  function isLocked(index: number): boolean {
    return steps.slice(0, index).some((s) => clean[s.id] === undefined);
  }

  function isSwatchStep(step: ConfiguratorStep): boolean {
    return step.options.every((o) => o.swatch !== undefined);
  }

  function choose(stepId: string, optionId: string) {
    selection = cleanSelection(definition, { ...selection, [stepId]: optionId });
  }

  function fill(template: string, vars: Record<string, string | number>): string {
    return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
  }

  const fmt = (amount: number) => formatPrice(amount, locale);
  const stepName = (stepId: string) =>
    texts.steps?.[stepId]?.heading?.replace(/\.$/, '') ?? texts.steps?.[stepId]?.label ?? '';
  const optionName = (stepId: string, optionId: string | undefined) =>
    optionId ? (texts.steps?.[stepId]?.options[optionId] ?? '') : '';

  /** Cena opcji do pokazania na kafelku. */
  function optionPrice(price: Price | undefined) {
    if (!price) return null;
    const now = currentPrice(price, date);
    if (now === null) return { now: labels.priceOnRequest, old: null, lowest: null };
    const promo = activePromo(price, date);
    return {
      now: fmt(now),
      old: promo && price.regular !== null ? fmt(price.regular) : null,
      // Omnibus: przy obniżce zawsze obok najniższa cena z 30 dni przed nią.
      lowest:
        promo?.lowestPrice30Days != null
          ? fill(labels.lowestPrice30Days, { price: fmt(promo.lowestPrice30Days) })
          : null,
    };
  }

  // "Dodano do torby" znika, gdy klient zmieni wybory albo ilość (to byłaby już inna pozycja).
  let added = $state(false);
  $effect(() => {
    void [clean, quantity];
    added = false;
  });
  function addToBag() {
    writeBag(addLine(readBag(), { productId, selection: { ...clean }, quantity }));
    added = true;
  }

  /** Najniższa cena z 30 dni (Omnibus) dla wybranych opcji w promocji. */
  const lowest30 = $derived.by(() => {
    for (const step of steps) {
      const option = step.options.find((o) => o.id === clean[step.id]);
      const promo = option?.price ? activePromo(option.price, date) : null;
      if (promo?.lowestPrice30Days != null) return fmt(promo.lowestPrice30Days);
    }
    return null;
  });
</script>

<div class="configurator">
  {#each steps as step, index (step.id)}
    {@const stepTexts = texts.steps?.[step.id]}
    {@const locked = isLocked(index)}
    <fieldset
      class="step"
      data-step={step.id}
      disabled={locked}
      aria-describedby={locked ? `${step.id}-locked` : undefined}
    >
      <legend class="step__title">
        {#if stepTexts?.heading}<strong>{stepTexts.heading}</strong>{/if}
        <span>{stepTexts?.label}</span>
      </legend>
      {#if locked}
        <p class="visually-hidden" id={`${step.id}-locked`}>{labels.chooseFirst}</p>
      {/if}

      {#if isSwatchStep(step)}
        <!-- Kolory: podpis z wybranym kolorem + kółka -->
        <p class="swatches__label">
          {fill(labels.selectedOption, {
            step: stepName(step.id),
            option: optionName(step.id, clean[step.id]),
          })}
        </p>
        <div class="swatches">
          {#each step.options as option (option.id)}
            <label class="swatch" style={`--swatch: ${option.swatch}`}>
              <input
                class="visually-hidden"
                type="radio"
                name={step.id}
                value={option.id}
                checked={clean[step.id] === option.id}
                onchange={() => choose(step.id, option.id)}
              />
              <span class="visually-hidden">{stepTexts?.options[option.id]}</span>
            </label>
          {/each}
        </div>
      {:else}
        <div class="options">
          {#each step.options as option (option.id)}
            {@const price = optionPrice(option.price)}
            <label class="option" class:option--selected={clean[step.id] === option.id}>
              <input
                class="visually-hidden"
                type="radio"
                name={step.id}
                value={option.id}
                checked={clean[step.id] === option.id}
                onchange={() => choose(step.id, option.id)}
              />
              <span class="option__name">
                {stepTexts?.options[option.id]}
                {#if hints[step.id]?.[option.id]}
                  <small class="option__hint">{hints[step.id]?.[option.id]}</small>
                {/if}
              </span>
              {#if price}
                <span class="option__price">
                  {#if price.old}<s>{price.old}</s>{/if}
                  {price.now}
                  {#if price.lowest}<small class="option__lowest">{price.lowest}</small>{/if}
                </span>
              {/if}
            </label>
          {/each}
        </div>
      {/if}
    </fieldset>
  {/each}

  <!-- Podsumowanie: dopiero gdy wszystko wybrane -->
  {#if complete}
    <section class="summary" aria-live="polite" data-step="summary">
      <h2 class="step__title">
        <strong>{labels.summary}</strong>
        <span>{labels.summaryHint}</span>
      </h2>

      <dl class="summary__list">
        {#each steps as step (step.id)}
          <div class="summary__row">
            <dt>{stepName(step.id)}</dt>
            <dd>{optionName(step.id, clean[step.id])}</dd>
          </div>
        {/each}
      </dl>

      <div class="summary__row summary__row--quantity">
        <span id="qty-label">{labels.quantity}</span>
        <div class="stepper" role="group" aria-labelledby="qty-label">
          <button
            type="button"
            class="stepper__btn"
            aria-label={labels.decrease}
            disabled={!canDecrease}
            onclick={() => (quantity -= 1)}>−</button
          >
          <output class="stepper__value">{quantity}</output>
          <button
            type="button"
            class="stepper__btn"
            aria-label={labels.increase}
            disabled={!canIncrease}
            onclick={() => (quantity += 1)}>+</button
          >
        </div>
      </div>
      {#if definition.quantity.min > 1}
        <p class="summary__note">{fill(labels.minOrder, { n: definition.quantity.min })}</p>
      {/if}

      <div class="total">
        <span class="total__label">{labels.total}</span>
        {#if result.total === null}
          <span class="total__value">{labels.priceOnRequest}</span>
        {:else}
          <span class="total__value">
            {#if result.hasPromo && result.regularUnitPrice !== null}
              <s>{fmt(result.regularUnitPrice * quantity)}</s>
            {/if}
            {fmt(result.total)}
          </span>
        {/if}
      </div>
      {#if result.unitPrice !== null && quantity > 1}
        <p class="summary__note">{fmt(result.unitPrice)} {labels.perPiece}</p>
      {/if}
      {#if result.hasPromo && lowest30}
        <p class="summary__note">{fill(labels.lowestPrice30Days, { price: lowest30 })}</p>
      {/if}
      <button type="button" class="order" onclick={addToBag}>{labels.addToBag}</button>
      <p class="added" role="status">
        {#if added}
          {labels.addedToBag} <a href={bagHref}>{labels.viewBag}</a>
        {/if}
      </p>
    </section>
  {:else if clean[definition.steps[0]!.id] !== undefined}
    <!-- Miejsce na podsumowanie, zanim się pojawi: karta z galerią stoi do miejsca, gdzie będzie cena
         (bez tego koniec kolumny wypadał wcześniej i karta odjeżdżała przy niedokończonych wyborach). -->
    <div class="summary-space" aria-hidden="true"></div>
  {/if}
</div>

<style>
  .configurator {
    display: grid;
    /* Duże odstępy: na ekranie jest zawsze jeden krok naraz. */
    gap: clamp(4.5rem, 14vh, 9rem);
  }

  /* shortcut: stała wysokość na oko (podsumowanie SkyTimera ~30rem); inny produkt z dłuższym = zmierzyć */
  .summary-space {
    height: 30rem;
  }

  /* ---------- Krok ---------- */
  .step {
    min-width: 0;
    margin: 0;
    padding: 0;
    border: 0;
  }

  .step:disabled {
    opacity: 0.35;
  }

  .step__title {
    display: block;
    margin: 0 0 1.5rem;
    padding: 0;
    font-size: clamp(1.5rem, 1.3rem + 0.6vw, 1.75rem);
    font-weight: 600;
    line-height: 1.14;
    letter-spacing: -0.02em;
  }

  .step__title strong {
    font-weight: 600;
    color: var(--color-text);
  }

  .step__title span {
    color: var(--color-text-2);
  }

  .options {
    display: grid;
    gap: 1rem;
  }

  /* ---------- Opcja (kafelek) ---------- */
  .option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.25rem;
    min-height: 6rem;
    padding: 1.5rem 1.375rem;
    border-radius: 1rem;
    background: var(--color-surface);
    /* Ramka jako cień wewnętrzny: zmiana 1 px → 2 px nie przesuwa treści. */
    box-shadow: inset 0 0 0 1px var(--color-line);
    cursor: pointer;
  }

  .step:disabled .option {
    cursor: default;
  }

  .option--selected {
    box-shadow: inset 0 0 0 2px var(--color-text);
  }

  .option:has(:focus-visible) {
    outline: 2px solid var(--color-text);
    outline-offset: 3px;
  }

  @media (hover: hover) {
    .step:not(:disabled) .option:not(.option--selected):hover {
      box-shadow: inset 0 0 0 1px var(--color-text-2);
    }
  }

  .option__name {
    font-size: 1.1875rem;
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.015em;
  }

  .option__hint {
    display: block;
    margin-top: 0.375rem;
    color: var(--color-text-2);
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.35;
    letter-spacing: -0.005em;
  }

  .option__price {
    flex-shrink: 0;
    font-size: 1rem;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  .option__lowest {
    display: block;
    max-width: 11rem;
    margin-top: 0.25rem;
    margin-left: auto;
    color: var(--color-text-2);
    font-size: 0.75rem;
    line-height: 1.3;
  }

  .option__price s,
  .total__value s {
    margin-right: 0.375rem;
    color: var(--color-text-2);
    font-weight: 400;
  }

  /* ---------- Kolory (kółka) ---------- */
  .swatches__label {
    margin-bottom: 1rem;
    font-size: 1.0625rem;
    font-weight: 600;
  }

  .swatches {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .swatch {
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    background: var(--swatch);
    /* Cienka obwódka, żeby jasne kolory nie znikały na białym. */
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.12);
    cursor: pointer;
  }

  .swatch:has(:checked) {
    box-shadow:
      inset 0 0 0 1px rgb(0 0 0 / 0.12),
      0 0 0 3px var(--color-surface),
      0 0 0 5px var(--color-text);
  }

  .swatch:has(:focus-visible) {
    outline: 2px solid var(--color-text);
    outline-offset: 7px;
  }

  /* ---------- Podsumowanie ---------- */
  .summary__list {
    display: grid;
    gap: 0.875rem;
    margin: 0;
    padding-bottom: 1.25rem;
  }

  .summary__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    font-size: 1.0625rem;
  }

  .summary__row dt,
  .summary__row--quantity > span {
    color: var(--color-text-2);
  }

  .summary__row dd {
    margin: 0;
    text-align: right;
  }

  .summary__row--quantity {
    padding-block: 1.25rem;
    border-top: 1px solid var(--color-line);
  }

  .stepper {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    border-radius: 980px;
    box-shadow: inset 0 0 0 1px var(--color-line);
  }

  .stepper__btn {
    width: 2.75rem;
    height: 2.75rem;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: none;
    font-size: 1.25rem;
    line-height: 1;
    cursor: pointer;
  }

  .stepper__btn:disabled {
    color: var(--color-line);
    cursor: default;
  }

  .stepper__value {
    min-width: 1.75rem;
    font-size: 1.0625rem;
    font-variant-numeric: tabular-nums;
    text-align: center;
  }

  .total {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    padding-top: 1.25rem;
    border-top: 1px solid var(--color-line);
  }

  .total__label {
    font-size: 1.1875rem;
    font-weight: 600;
  }

  .total__value {
    font-size: 1.75rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }

  .total__value s {
    font-size: 1.0625rem;
    letter-spacing: -0.011em;
  }

  .summary__note {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: var(--color-text-2);
    text-align: right;
  }

  .order {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 3.25rem;
    margin-top: 1.5rem;
    border: 0;
    border-radius: var(--radius-pill);
    background: var(--color-text);
    color: var(--color-surface);
    font: inherit;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
  }

  .order:focus-visible {
    outline: 2px solid var(--color-text);
    outline-offset: 3px;
  }

  /* Potwierdzenie pod przyciskiem; puste miejsce zarezerwowane, żeby nic nie skakało. */
  .added {
    min-height: 1.5rem;
    margin-top: 0.75rem;
    font-size: 0.9375rem;
    text-align: center;
  }

  .added a {
    color: var(--color-text);
    font-weight: 600;
  }

  /* ---------- Ruch ---------- */
  @media (prefers-reduced-motion: no-preference) {
    .option,
    .swatch {
      transition: box-shadow 160ms var(--ease-out);
    }

    .step {
      transition: opacity 240ms var(--ease-out);
    }

    .summary {
      animation: rise 480ms var(--ease-out) both;
    }
  }

  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(0.75rem);
    }
  }
</style>
