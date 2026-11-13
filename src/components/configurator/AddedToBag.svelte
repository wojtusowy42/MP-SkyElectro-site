<!--
  Okno na cały ekran po "Włóż do torby" (wzór: apple.com po dodaniu do torby). Góra na białym: zdjęcie i opis tego, co właśnie
  trafiło do torby, obok "Zajrzyj do torby". Dół na tle strony: do trzech akcesoriów, które do tego pasują
  (src/data/accessories.ts: recommendedFor), każde z wyborem koloru i własnym "Włóż do torby".
  Gdy dodano zestaw (inKit), pod nagłówkiem akcesoriów jest zdanie, że te części już w nim są i chodzi o zapas.
  Natywny <dialog>: Esc i pułapkę fokusu obsługuje przeglądarka.
  Użycie: bind:this i show(pozycja) zaraz po zapisaniu jej w torbie.
-->
<script lang="ts" module>
  import type { BagProduct } from '../../lib/bag-products.ts';

  /** Dane okna, takie same na stronie Kup i na stronie akcesorium (przygotowuje je strona .astro). */
  export interface AddedToBagData {
    /** Dodawany produkt i polecane akcesoria (id → dane jak w torbie). */
    products: Record<string, BagProduct>;
    /** Id polecanych akcesoriów, w kolejności kart. */
    recommended: string[];
    /** Wybór ('krok=opcja'), przy którym polecane akcesoria są już w kupowanym zestawie. Brak = nigdy. */
    inKit?: string;
    labels: {
      added: string;
      viewBag: string;
      close: string;
      recommended: string;
      recommendedInKit: string;
      addToBag: string;
      inBag: string;
      quantity: string;
      selectedOption: string;
      priceOnRequest: string;
    };
  }
</script>

<script lang="ts">
  import type { Locale } from '../../i18n/locales.ts';
  import { cleanSelection, quote, visibleSteps, type Selection } from '../../lib/configurator.ts';
  import { formatPrice } from '../../lib/price.ts';
  import { addLine, readBag, writeBag, type BagLine } from '../../lib/bag.ts';
  import { pickVersion } from '../../lib/versions.ts';

  interface Props extends AddedToBagData {
    locale: Locale;
    bagHref: string;
    /** Dzień buildu 'RRRR-MM-DD': ceny jak na reszcie strony. */
    today: string;
  }

  const { products, recommended, inKit, labels, locale, bagHref, today }: Props = $props();
  const date = new Date(`${today}T12:00:00`);
  const thumbOf = (product: BagProduct, selection: Selection) =>
    product.thumbs[pickVersion(product.thumbs.map((t) => t.match), selection)];

  let dialog: HTMLDialogElement;
  let line = $state<BagLine | null>(null);
  // Wybory na kartach akcesoriów (pierwsza opcja każdego kroku, jak na stronie akcesorium) i które już dodano.
  let picks = $state<Record<string, Selection>>({});
  let inBag = $state<Record<string, boolean>>({});

  export function show(added: BagLine) {
    line = added;
    inBag = {};
    picks = Object.fromEntries(
      recommended.map((id) => [
        id,
        Object.fromEntries(products[id]!.definition.steps.map((s) => [s.id, s.options[0]!.id])),
      ]),
    );
    dialog.showModal();
  }

  const summary = $derived.by(() => {
    const product = line && products[line.productId];
    if (!line || !product) return null;
    const selection = cleanSelection(product.definition, line.selection);
    return {
      name: product.texts.name,
      thumb: thumbOf(product, selection),
      inKit: inKit !== undefined && selection[inKit.split('=')[0]!] === inKit.split('=')[1],
      choices: visibleSteps(product.definition, selection).map((step) => {
        const t = product.texts.steps?.[step.id];
        return {
          step: t?.heading?.replace(/\.$/, '') ?? t?.label ?? step.id,
          option: t?.options[selection[step.id]!] ?? '',
        };
      }),
    };
  });

  function choose(id: string, stepId: string, optionId: string) {
    picks[id] = cleanSelection(products[id]!.definition, { ...picks[id], [stepId]: optionId });
    inBag[id] = false; // inny kolor to inna pozycja
  }
  function add(id: string) {
    writeBag(addLine(readBag(), { productId: id, selection: { ...picks[id] }, quantity: 1 }));
    inBag[id] = true;
  }
  const stepName = (product: BagProduct, id: string) =>
    product.texts.steps?.[id]?.heading?.replace(/\.$/, '') ?? id;
</script>

<dialog class="added" bind:this={dialog} aria-labelledby="added-title">
  {#if summary && line}
    <div class="added__card">
      <button type="button" class="added__close" aria-label={labels.close} onclick={() => dialog.close()}>
        <span aria-hidden="true">×</span>
      </button>

      <section class="added__top">
        <div class="added__thumb">
          {#if summary.thumb}<img src={summary.thumb.src} alt="" />{/if}
        </div>
        <div class="added__what">
          <h2 class="added__title" id="added-title">{labels.added}</h2>
          <p class="added__name">{summary.name}</p>
          <p class="added__choices">
            {#each summary.choices as c (c.step)}<span>{c.step}: {c.option}</span>{/each}
            {#if line.quantity > 1}<span>{labels.quantity}: {line.quantity}</span>{/if}
          </p>
        </div>
        <a class="added__bag" href={bagHref}>{labels.viewBag}</a>
      </section>

      {#if recommended.length > 0}
        <section class="added__more" aria-labelledby="added-more-title">
          <h3 class="added__more-title" id="added-more-title">{labels.recommended}</h3>
          {#if summary.inKit}<p class="added__more-lead">{labels.recommendedInKit}</p>{/if}
          <ul class="cards">
            {#each recommended as id (id)}
              {@const product = products[id]!}
              {@const pick = picks[id] ?? {}}
              {@const thumb = thumbOf(product, pick)}
              {@const price = quote(product.definition, pick, 1, date).unitPrice}
              <li class="card">
                <a class="card__media" href={product.href} tabindex="-1" aria-hidden="true">
                  {#if thumb}<img src={thumb.src} alt="" loading="lazy" />{/if}
                </a>
                <h4 class="card__name"><a href={product.href}>{product.texts.name}</a></h4>
                <p class="card__text">{product.overview}</p>
                <div class="card__choices">
                {#each product.definition.steps as step (step.id)}
                  {@const isColor = step.options.every((o) => o.swatch)}
                  <fieldset class="card__choice">
                    <legend class="visually-hidden">
                      {labels.selectedOption
                        .replace('{step}', stepName(product, step.id))
                        .replace('{option}', product.texts.steps?.[step.id]?.options[pick[step.id]!] ?? '')}
                    </legend>
                    <div class={isColor ? 'swatches' : 'pills'}>
                      {#each step.options as option (option.id)}
                        <label
                          class={isColor ? 'swatch' : 'pill'}
                          class:pill--on={!isColor && pick[step.id] === option.id}
                          style={isColor ? `--swatch: ${option.swatch}` : undefined}
                          title={product.texts.steps?.[step.id]?.options[option.id]}
                        >
                          <input
                            class="visually-hidden"
                            type="radio"
                            name={`${id}-${step.id}`}
                            value={option.id}
                            checked={pick[step.id] === option.id}
                            onchange={() => choose(id, step.id, option.id)}
                          />
                          <span class={isColor ? 'visually-hidden' : undefined}
                            >{product.texts.steps?.[step.id]?.options[option.id]}</span
                          >
                        </label>
                      {/each}
                    </div>
                  </fieldset>
                {/each}
                </div>
                <p class="card__price">{price === null ? labels.priceOnRequest : formatPrice(price, locale)}</p>
                <button type="button" class="card__button" class:card__button--done={inBag[id]} onclick={() => add(id)}>
                  {inBag[id] ? labels.inBag : labels.addToBag}
                </button>
              </li>
            {/each}
          </ul>
        </section>
      {/if}
    </div>
  {/if}
</dialog>

<style>
  /* Cały ekran (przeglądarka domyślnie ogranicza dialog do treści i marginesów) */
  .added {
    width: 100vw;
    max-width: none;
    height: 100dvh;
    max-height: none;
    margin: 0;
    padding: 0;
    border: 0;
    background: var(--color-bg);
    color: var(--color-text);
    overflow: auto;
    /* treść obu części w kolumnie 60rem na środku, tła na całą szerokość */
    --pad: max(var(--gutter), (100vw - 60rem) / 2);
  }

  /* dół z akcesoriami wypełnia resztę ekranu */
  .added__card {
    display: grid;
    grid-template-rows: auto 1fr;
    min-height: 100%;
  }

  .added__close {
    position: fixed;
    top: 1rem;
    right: 1rem;
    width: 2.75rem;
    height: 2.75rem;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: var(--color-bg);
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;
  }

  /* ---------- Góra: co dodano (białe tło) ---------- */
  .added__top {
    display: grid;
    grid-template-columns: 7.5rem minmax(0, 1fr) auto;
    align-items: center;
    gap: 1.5rem;
    padding: clamp(1.5rem, 3vw, 2.5rem) var(--pad);
    padding-right: max(var(--pad), 4.5rem); /* miejsce na przycisk zamykania */
    background: var(--color-surface);
  }

  .added__thumb {
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 0.75rem;
    background: var(--color-bg);
  }

  /* multiply: białe tło renderu przyjmuje kolor ramki, jak w torbie */
  .added__thumb img,
  .card__media img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    mix-blend-mode: multiply;
  }

  .added__title {
    font-size: clamp(1.5rem, 1.2rem + 1.2vw, 2rem);
    font-weight: 600;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  .added__name {
    margin-top: 0.5rem;
    font-size: 1.0625rem;
    font-weight: 600;
  }

  .added__choices {
    display: flex;
    flex-wrap: wrap;
    gap: 0.125rem 1rem;
    margin-top: 0.25rem;
    color: var(--color-text-2);
    font-size: 0.9375rem;
  }

  .added__bag,
  .card__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.75rem;
    padding-inline: 1.5rem;
    border: 0;
    border-radius: var(--radius-pill);
    background: var(--color-text);
    color: var(--color-surface);
    font: inherit;
    font-weight: 600;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
  }

  /* ---------- Dół: polecane akcesoria (tło strony) ---------- */
  .added__more {
    padding: clamp(1.5rem, 3vw, 2.5rem) var(--pad) clamp(3rem, 6vw, 5rem);
  }

  .added__more-lead {
    margin-top: 0.375rem;
    color: var(--color-text-2);
  }

  .added__more-title {
    font-size: clamp(1.25rem, 1.1rem + 0.8vw, 1.5rem);
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    margin: 1.25rem 0 0;
    padding: 0;
    list-style: none;
  }

  /* Karta: zdjęcie, nazwa, opis, kolor, cena, przycisk. Wiersze wspólne dla kart (subgrid), żeby ceny i przyciski były w linii. */
  .card {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 6;
    gap: 0.5rem;
    min-width: 0; /* długi tekst nie rozpycha kolumny */
    padding: 1.25rem;
    border-radius: 1.125rem;
    background: var(--color-surface);
  }

  .card__media {
    display: block;
    aspect-ratio: 3 / 2; /* niżej niż 4:3: na laptopie przyciski kart mieszczą się na pierwszym ekranie */
    margin-bottom: 0.25rem;
  }

  .card__media img {
    mix-blend-mode: normal; /* karta jest biała jak tło renderu */
  }

  .card__name {
    margin: 0;
    font-size: 1.0625rem;
    font-weight: 600;
    line-height: 1.25;
  }

  .card__name a {
    text-decoration: none;
  }

  .card__name a:hover {
    text-decoration: underline;
  }

  .card__text {
    color: var(--color-text-2);
    font-size: 0.875rem;
    line-height: 1.4;
  }

  .card__choice {
    min-width: 0;
    margin: 0;
    padding: 0;
    border: 0;
  }

  .swatches,
  .pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding-block: 0.25rem;
  }

  .swatch {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: var(--swatch);
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.15);
    cursor: pointer;
  }

  .swatch:has(:checked) {
    outline: 2px solid var(--color-text);
    outline-offset: 2px;
  }

  .pill {
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-pill);
    box-shadow: inset 0 0 0 1px var(--color-line);
    font-size: 0.8125rem;
    cursor: pointer;
  }

  .pill--on {
    box-shadow: inset 0 0 0 2px var(--color-text);
  }

  .swatch:has(:focus-visible),
  .pill:has(:focus-visible),
  .added__bag:focus-visible,
  .card__button:focus-visible,
  .added__close:focus-visible {
    outline: 2px solid var(--color-text);
    outline-offset: 3px;
  }

  .card__price {
    align-self: end;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  .card__button {
    width: 100%;
  }

  /* już w torbie: spokojniejszy przycisk, kolejne kliknięcie dokłada następną sztukę */
  .card__button--done {
    background: none;
    box-shadow: inset 0 0 0 1px var(--color-text);
    color: var(--color-text);
  }

  @media (max-width: 699px) {
    .added__top {
      grid-template-columns: 5rem minmax(0, 1fr);
    }

    .added__bag {
      grid-column: 1 / -1;
    }

    .cards {
      grid-template-columns: minmax(0, 1fr);
    }

    /* jedna kolumna: zdjęcie obok tekstu, bez wspólnych wierszy */
    .card {
      grid-template-rows: none;
      grid-row: auto;
    }

    .card__media {
      max-width: 12rem;
    }
  }
</style>
