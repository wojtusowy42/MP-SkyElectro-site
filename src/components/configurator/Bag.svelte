<!--
  Torba (wzór: torba na apple.com, bez płatności). Pozycje z localStorage (src/lib/bag.ts),
  ceny liczone na nowo z danych produktów (quote), zamówienie jednym mailem.
  Pozycja produktu, którego już nie ma albo z wyborami, które przestały pasować, jest pomijana.
  Zaznaczanie: zamówienie i suma obejmują tylko zaznaczone pozycje (domyślnie wszystkie), reszta czeka w torbie.
  Nad listą: zaznacz wszystko, usuń zaznaczone, opróżnij torbę. Każde usunięcie można cofnąć.
-->
<script lang="ts">
  import { onMount } from 'svelte';
  import type { ConfiguratorDefinition } from '../../data/types.ts';
  import type { ProductTexts } from '../../i18n/index.ts';
  import type { Locale } from '../../i18n/locales.ts';
  import {
    checkQuantity,
    cleanSelection,
    isComplete,
    quote,
    visibleSteps,
  } from '../../lib/configurator.ts';
  import { formatPrice } from '../../lib/price.ts';
  import { readBag, writeBag, type BagLine } from '../../lib/bag.ts';
  import { pickVersion } from '../../lib/versions.ts';

  interface Labels {
    heading: string;
    empty: string;
    continue: string;
    remove: string;
    edit: string;
    total: string;
    totalSelected: string;
    selectAll: string;
    selected: string;
    select: string;
    removeSelected: string;
    clear: string;
    removed: string;
    undo: string;
    nothingSelected: string;
    quantity: string;
    decrease: string;
    increase: string;
    perPiece: string;
    priceOnRequest: string;
    orderButton: string;
    orderNote: string;
    orderSubject: string;
    orderIntro: string;
  }

  interface Props {
    products: Record<
      string,
      {
        definition: ConfiguratorDefinition;
        texts: ProductTexts;
        href: string;
        /** Miniatury w wersjach ('krok=opcja ...'), jak zdjęcia na stronie Kup. */
        thumbs: { src: string; match: string }[];
      }
    >;
    labels: Labels;
    locale: Locale;
    orderEmail: string | null;
    homeHref: string;
    /** Dzień buildu 'RRRR-MM-DD': ceny jak na reszcie strony. */
    today: string;
  }

  const { products, labels, locale, orderEmail, homeHref, today }: Props = $props();
  const date = new Date(`${today}T12:00:00`);
  const fmt = (amount: number) => formatPrice(amount, locale);

  let lines = $state<BagLine[]>([]);
  let loaded = $state(false);
  /** Pozycje odznaczone (klucz pozycji). Nie zapisujemy: po przeładowaniu znów wszystko zaznaczone. */
  let unchecked = $state<string[]>([]);
  /** Stan sprzed ostatniego usunięcia, do "Cofnij". */
  let removed = $state<{ lines: BagLine[]; count: number } | null>(null);
  // Torba łączy takie same pozycje (addLine), więc produkt + wybory to unikalny klucz.
  const keyOf = (l: BagLine) =>
    `${l.productId}|${Object.entries(l.selection).sort().join(';')}`;
  onMount(() => {
    lines = readBag();
    loaded = true;
    // Pozycje, których strona nie umie pokazać (produkt zniknął, opcje się zmieniły), usuwamy z torby,
    // inaczej licznik w menu liczyłby coś, czego tu nie widać.
    const shown = rows.map((r) => r.line);
    if (shown.length !== lines.length) update(shown);
    // zmiana torby w innej karcie przeglądarki
    const sync = (e: StorageEvent) => {
      if (e.key === null || e.key.includes('bag')) lines = readBag();
    };
    // powrót "wstecz" z bfcache: torba mogła się zmienić na innej stronie
    const reload = () => (lines = readBag());
    window.addEventListener('storage', sync);
    window.addEventListener('pageshow', reload);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('pageshow', reload);
    };
  });

  /** Pozycje gotowe do pokazania: nazwa, wybory, cena. Nieaktualne pozycje pomijamy. */
  const rows = $derived(
    lines.flatMap((line, index) => {
      const product = products[line.productId];
      if (!product) return [];
      const { definition, texts } = product;
      const selection = cleanSelection(definition, line.selection);
      if (!isComplete(definition, selection)) return [];
      const choices = visibleSteps(definition, selection).map((step) => {
        const stepTexts = texts.steps?.[step.id];
        const name = stepTexts?.heading?.replace(/\.$/, '') ?? stepTexts?.label ?? step.id;
        return { step: name, option: stepTexts?.options[selection[step.id]!] ?? '' };
      });
      const thumb = product.thumbs[pickVersion(product.thumbs.map((t) => t.match), selection)];
      return [
        {
          index,
          key: keyOf(line),
          checked: !unchecked.includes(keyOf(line)),
          line,
          product,
          choices,
          thumb,
          price: quote(definition, selection, line.quantity, date),
        },
      ];
    }),
  );
  const chosen = $derived(rows.filter((r) => r.checked));
  const total = $derived(
    chosen.some((r) => r.price.total === null)
      ? null
      : chosen.reduce((sum, r) => sum + (r.price.total ?? 0), 0),
  );

  function update(next: BagLine[]) {
    lines = next;
    writeBag(next);
  }
  const setQuantity = (index: number, quantity: number) => {
    removed = null;
    update(lines.map((l, i) => (i === index ? { ...l, quantity } : l)));
  };
  /** Usuwa pozycje o podanych indeksach i zapamiętuje poprzedni stan do cofnięcia. */
  function removeLines(indexes: number[]) {
    if (indexes.length === 0) return;
    removed = { lines, count: indexes.length };
    update(lines.filter((_, i) => !indexes.includes(i)));
    unchecked = unchecked.filter((k) => lines.some((l) => keyOf(l) === k));
  }
  const remove = (index: number) => removeLines([index]);
  const removeChosen = () => removeLines(chosen.map((r) => r.index));
  const clear = () => removeLines(rows.map((r) => r.index));
  function undo() {
    if (!removed) return;
    update(removed.lines);
    removed = null;
  }
  const toggle = (key: string, on: boolean) =>
    (unchecked = on ? unchecked.filter((k) => k !== key) : [...unchecked, key]);
  const toggleAll = (on: boolean) => (unchecked = on ? [] : rows.map((r) => r.key));

  const fill = (template: string, vars: Record<string, string>) =>
    template.replace(/\{(\w+)\}/g, (m, k: string) => vars[k] ?? m);

  /** Jeden mail z całą torbą: każda pozycja z wyborami, ilością i ceną, na końcu suma. */
  const orderHref = $derived.by(() => {
    if (!orderEmail || chosen.length === 0) return null;
    const body = [labels.orderIntro, ''];
    for (const r of chosen) {
      body.push(
        r.product.texts.name,
        ...r.choices.map((c) => `${c.step}: ${c.option}`),
        `${labels.quantity}: ${r.line.quantity}`,
        `${labels.total}: ${r.price.total === null ? labels.priceOnRequest : fmt(r.price.total)}`,
        '',
      );
    }
    body.push(`${labels.total}: ${total === null ? labels.priceOnRequest : fmt(total)}`);
    return `mailto:${orderEmail}?subject=${encodeURIComponent(fill(labels.orderSubject, {}))}&body=${encodeURIComponent(body.join('\r\n'))}`;
  });
</script>

<div class="bag">
  <h1 class="bag__heading">{labels.heading}</h1>

  <!-- zawsze w drzewie, żeby czytnik ekranu ogłosił usunięcie; "Cofnij" działa też po opróżnieniu torby -->
  <p class="bag__removed" role="status">
    {#if removed}
      {fill(labels.removed, { n: String(removed.count) })}
      <button type="button" onclick={undo}>{labels.undo}</button>
    {/if}
  </p>

  {#if loaded && rows.length === 0}
    <p class="bag__empty">{labels.empty}</p>
    <a class="bag__button" href={homeHref}>{labels.continue}</a>
  {:else if loaded}
    <div class="bag__tools">
      <label class="bag__all">
        <input
          type="checkbox"
          checked={chosen.length === rows.length}
          indeterminate={chosen.length > 0 && chosen.length < rows.length}
          onchange={(e) => toggleAll(e.currentTarget.checked)}
        />
        {labels.selectAll}
      </label>
      <span class="bag__count">
        {fill(labels.selected, { n: String(chosen.length), total: String(rows.length) })}
      </span>
      <button type="button" disabled={chosen.length === 0} onclick={removeChosen}>
        {labels.removeSelected}
      </button>
      <button type="button" onclick={clear}>{labels.clear}</button>
    </div>
    <ul class="bag__list">
      {#each rows as row (row.key)}
        {@const def = row.product.definition}
        <li class="line" class:line--off={!row.checked}>
          <input
            class="line__check"
            type="checkbox"
            checked={row.checked}
            aria-label={fill(labels.select, { name: row.product.texts.name })}
            onchange={(e) => toggle(row.key, e.currentTarget.checked)}
          />
          <!-- obok jest nazwa i wybory, więc zdjęcie bez opisu -->
          <div class="line__thumb">
            {#if row.thumb}<img src={row.thumb.src} alt="" loading="lazy" />{/if}
          </div>
          <div class="line__main">
            <h2 class="line__name">{row.product.texts.name}</h2>
            <dl class="line__choices">
              {#each row.choices as choice (choice.step)}
                <div>
                  <dt>{choice.step}:</dt>
                  <dd>{choice.option}</dd>
                </div>
              {/each}
            </dl>
            <div class="line__actions">
              <a href={row.product.href}>{labels.edit}</a>
              <button type="button" onclick={() => remove(row.index)}>{labels.remove}</button>
            </div>
          </div>

          <div
            class="stepper"
            role="group"
            aria-label={`${labels.quantity}: ${row.product.texts.name}`}
          >
            <button
              type="button"
              class="stepper__btn"
              aria-label={labels.decrease}
              disabled={checkQuantity(def, row.line.quantity - 1) !== null}
              onclick={() => setQuantity(row.index, row.line.quantity - 1)}>−</button
            >
            <output class="stepper__value">{row.line.quantity}</output>
            <button
              type="button"
              class="stepper__btn"
              aria-label={labels.increase}
              disabled={checkQuantity(def, row.line.quantity + 1) !== null}
              onclick={() => setQuantity(row.index, row.line.quantity + 1)}>+</button
            >
          </div>

          <p class="line__price">
            {#if row.price.total === null}
              {labels.priceOnRequest}
            {:else}
              {#if row.price.hasPromo && row.price.regularUnitPrice !== null}
                <s>{fmt(row.price.regularUnitPrice * row.line.quantity)}</s>
              {/if}
              {fmt(row.price.total)}
              {#if row.line.quantity > 1 && row.price.unitPrice !== null}
                <small>{fmt(row.price.unitPrice)} {labels.perPiece}</small>
              {/if}
            {/if}
          </p>
        </li>
      {/each}
    </ul>

    <div class="bag__total">
      <span>{chosen.length < rows.length ? labels.totalSelected : labels.total}</span>
      <span>{total === null ? labels.priceOnRequest : fmt(total)}</span>
    </div>
    {#if chosen.length === 0}
      <p class="bag__note">{labels.nothingSelected}</p>
    {:else if orderHref}
      <a class="bag__button bag__button--wide" href={orderHref}>{labels.orderButton}</a>
      <p class="bag__note">{labels.orderNote}</p>
    {/if}
  {/if}
</div>

<style>
  .bag {
    max-width: 51rem;
    margin-inline: auto;
  }

  .bag__heading {
    font-size: clamp(2.25rem, 1.6rem + 2.4vw, 3.5rem);
    font-weight: 600;
    line-height: 1.07;
    letter-spacing: -0.025em;
  }

  .bag__empty {
    margin-top: 1.5rem;
    font-size: 1.1875rem;
  }

  .bag__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 3.25rem;
    margin-top: 2rem;
    padding-inline: 2rem;
    border-radius: var(--radius-pill);
    background: var(--color-text);
    color: var(--color-surface);
    font-weight: 600;
    text-decoration: none;
  }

  .bag__button--wide {
    display: flex;
    width: 100%;
  }

  .bag__button:focus-visible {
    outline: 2px solid var(--color-text);
    outline-offset: 3px;
  }

  /* Pasek nad listą: zaznacz wszystko | ile zaznaczonych | usuń zaznaczone | opróżnij */
  .bag__tools {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem 1.5rem;
    margin-top: clamp(2rem, 5vw, 3.5rem);
    padding-bottom: 1rem;
    font-size: 0.9375rem;
  }

  .bag__all {
    display: inline-flex;
    align-items: center;
    gap: 0.625rem;
    font-weight: 600;
    cursor: pointer;
  }

  .bag__count {
    margin-right: auto;
    color: var(--color-text-2);
  }

  .bag__tools button,
  .bag__removed button {
    padding: 0;
    border: 0;
    background: none;
    color: var(--color-text);
    font: inherit;
    text-decoration: underline;
    text-underline-offset: 0.2em;
    cursor: pointer;
  }

  .bag__tools button:disabled {
    color: var(--color-text-2);
    text-decoration: none;
    cursor: default;
  }

  .bag input[type='checkbox'] {
    width: 1.25rem;
    height: 1.25rem;
    margin: 0;
    accent-color: var(--color-text);
    cursor: pointer;
  }

  /* Komunikat po usunięciu; wysokość zarezerwowana tylko, gdy jest treść */
  .bag__removed:not(:empty) {
    margin-top: 1.5rem;
    padding: 0.875rem 1.25rem;
    border-radius: 0.75rem;
    background: var(--color-bg);
    font-size: 0.9375rem;
  }

  .bag__removed button {
    margin-left: 0.5rem;
    font-weight: 600;
  }

  .bag__list {
    margin: 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid var(--color-line);
  }

  /* Pozycja: zdjęcie | opis | ilość | cena; na telefonie ilość i cena pod opisem. */
  .line {
    display: grid;
    grid-template-columns: auto 7.5rem minmax(0, 1fr) auto auto;
    grid-template-areas: 'check thumb main qty price';
    align-items: start;
    gap: 1.5rem;
    padding-block: 2rem;
    border-bottom: 1px solid var(--color-line);
  }

  .line__check {
    grid-area: check;
    align-self: center;
  }

  /* odznaczona pozycja zostaje w torbie, ale nie wchodzi do zamówienia */
  .line--off .line__thumb,
  .line--off .line__main,
  .line--off .line__price {
    opacity: 0.5;
  }

  .line__thumb {
    grid-area: thumb;
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 0.75rem;
    background: var(--color-bg);
  }

  /* multiply: białe tło renderu przyjmuje szary kolor ramki */
  .line__thumb img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    mix-blend-mode: multiply;
  }

  .line__main {
    grid-area: main;
  }

  .stepper {
    grid-area: qty;
  }

  .line__price {
    grid-area: price;
  }

  .line__name {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  .line__choices {
    display: grid;
    gap: 0.25rem;
    margin: 0.75rem 0 0;
    color: var(--color-text-2);
    font-size: 0.9375rem;
  }

  .line__choices dt,
  .line__choices dd {
    display: inline;
    margin: 0;
  }

  .line__actions {
    display: flex;
    gap: 1.25rem;
    margin-top: 1rem;
    font-size: 0.9375rem;
  }

  .line__actions a,
  .line__actions button {
    padding: 0;
    border: 0;
    background: none;
    color: var(--color-text);
    font: inherit;
    text-decoration: underline;
    text-underline-offset: 0.2em;
    cursor: pointer;
  }

  .line__price {
    min-width: 7rem;
    font-size: 1.1875rem;
    font-weight: 600;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  .line__price s {
    display: block;
    color: var(--color-text-2);
    font-size: 0.9375rem;
    font-weight: 400;
  }

  .line__price small {
    display: block;
    margin-top: 0.25rem;
    color: var(--color-text-2);
    font-size: 0.8125rem;
    font-weight: 400;
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

  .bag__total {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding-block: 2rem 0.5rem;
    font-size: 1.75rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }

  .bag__note {
    margin-top: 0.75rem;
    color: var(--color-text-2);
    font-size: 0.875rem;
    text-align: center;
  }

  @media (max-width: 599px) {
    .line {
      grid-template-columns: auto 5.5rem auto minmax(0, 1fr);
      grid-template-areas:
        'check thumb main main'
        '. . qty price';
      gap: 1rem;
    }
  }
</style>
