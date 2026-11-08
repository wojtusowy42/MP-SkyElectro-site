<!--
  Torba (wzór: torba na apple.com, bez płatności). Pozycje z localStorage (src/lib/bag.ts),
  ceny liczone na nowo z danych produktów (quote), zamówienie jednym mailem.
  Pozycja produktu, którego już nie ma albo z wyborami, które przestały pasować, jest pomijana.
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
          line,
          product,
          choices,
          thumb,
          price: quote(definition, selection, line.quantity, date),
        },
      ];
    }),
  );
  const total = $derived(
    rows.some((r) => r.price.total === null)
      ? null
      : rows.reduce((sum, r) => sum + (r.price.total ?? 0), 0),
  );

  function update(next: BagLine[]) {
    lines = next;
    writeBag(next);
  }
  const setQuantity = (index: number, quantity: number) =>
    update(lines.map((l, i) => (i === index ? { ...l, quantity } : l)));
  const remove = (index: number) => update(lines.filter((_, i) => i !== index));

  const fill = (template: string, vars: Record<string, string>) =>
    template.replace(/\{(\w+)\}/g, (m, k: string) => vars[k] ?? m);

  /** Jeden mail z całą torbą: każda pozycja z wyborami, ilością i ceną, na końcu suma. */
  const orderHref = $derived.by(() => {
    if (!orderEmail || rows.length === 0) return null;
    const body = [labels.orderIntro, ''];
    for (const r of rows) {
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

  {#if loaded && rows.length === 0}
    <p class="bag__empty">{labels.empty}</p>
    <a class="bag__button" href={homeHref}>{labels.continue}</a>
  {:else if loaded}
    <ul class="bag__list">
      {#each rows as row (row.index)}
        {@const def = row.product.definition}
        <li class="line">
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
      <span>{labels.total}</span>
      <span>{total === null ? labels.priceOnRequest : fmt(total)}</span>
    </div>
    {#if orderHref}
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

  .bag__list {
    margin: clamp(2rem, 5vw, 3.5rem) 0 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid var(--color-line);
  }

  /* Pozycja: zdjęcie | opis | ilość | cena; na telefonie ilość i cena pod opisem. */
  .line {
    display: grid;
    grid-template-columns: 7.5rem minmax(0, 1fr) auto auto;
    grid-template-areas: 'thumb main qty price';
    align-items: start;
    gap: 1.5rem;
    padding-block: 2rem;
    border-bottom: 1px solid var(--color-line);
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
      grid-template-columns: 5.5rem auto minmax(0, 1fr);
      grid-template-areas:
        'thumb main main'
        '. qty price';
      gap: 1rem;
    }
  }
</style>
