<!--
  Mały konfigurator akcesorium (wzór: strona produktu w sklepie apple.com, np. etui):
  po lewej duże zdjęcie, po prawej nazwa, cena, wybory (kolor jako kółka, reszta jako przyciski)
  i "Włóż do torby". Ta sama logika i torba co duży konfigurator (src/lib/configurator.ts, bag.ts).
-->
<script lang="ts">
  import type { ConfiguratorDefinition } from '../../data/types.ts';
  import type { ProductTexts } from '../../i18n/index.ts';
  import type { Locale } from '../../i18n/locales.ts';
  import { cleanSelection, quote, type Selection } from '../../lib/configurator.ts';
  import { formatPrice } from '../../lib/price.ts';
  import { addLine, readBag, writeBag } from '../../lib/bag.ts';
  import { pickVersion } from '../../lib/versions.ts';

  interface Props {
    accessoryId: string;
    name: string;
    definition: ConfiguratorDefinition;
    steps: NonNullable<ProductTexts['steps']>;
    /** Zdjęcia w wersjach ('krok=opcja ...'). Puste = brak zdjęcia. */
    images: { src: string; srcset: string; match: string }[];
    alt: string;
    labels: {
      addToBag: string;
      addedToBag: string;
      viewBag: string;
      selectedOption: string;
      priceOnRequest: string;
      noImage: string;
    };
    locale: Locale;
    bagHref: string;
    /** Dzień buildu 'RRRR-MM-DD': ceny jak na reszcie strony. */
    today: string;
  }

  const { accessoryId, name, definition, steps, images, alt, labels, locale, bagHref, today }: Props =
    $props();
  const date = new Date(`${today}T12:00:00`);

  // Jak na apple.com: pierwsza opcja każdego kroku wybrana od razu.
  let selection = $state<Selection>(
    Object.fromEntries(definition.steps.map((s) => [s.id, s.options[0]!.id])),
  );
  const result = $derived(quote(definition, selection, 1, date));
  const image = $derived(images[pickVersion(images.map((i) => i.match), selection)]);

  let added = $state(false);
  function choose(stepId: string, optionId: string) {
    selection = cleanSelection(definition, { ...selection, [stepId]: optionId });
    added = false;
  }
  function addToBag() {
    writeBag(addLine(readBag(), { productId: accessoryId, selection: { ...selection }, quantity: 1 }));
    added = true;
  }
  const stepName = (id: string) => steps[id]?.heading?.replace(/\.$/, '') ?? id;
</script>

<div class="buy">
  <div class="buy__media">
    {#if image}
      {#key image.src}
        <img class="buy__img" src={image.src} srcset={image.srcset} sizes="(max-width: 833px) 100vw, 55vw" {alt} />
      {/key}
    {:else}
      <p class="buy__noimg">{labels.noImage}</p>
    {/if}
  </div>

  <div class="buy__panel">
    <h1 class="buy__name">{name}</h1>
    <p class="buy__price">
      {result.unitPrice === null ? labels.priceOnRequest : formatPrice(result.unitPrice, locale)}
    </p>

    {#each definition.steps as step (step.id)}
      {@const isColor = step.options.every((o) => o.swatch)}
      <fieldset class="choice">
        <legend class="choice__label">
          {labels.selectedOption
            .replace('{step}', stepName(step.id))
            .replace('{option}', steps[step.id]?.options[selection[step.id]!] ?? '')}
        </legend>
        <div class={isColor ? 'swatches' : 'pills'}>
          {#each step.options as option (option.id)}
            <label
              class={isColor ? 'swatch' : 'pill'}
              class:pill--on={!isColor && selection[step.id] === option.id}
              style={isColor ? `--swatch: ${option.swatch}` : undefined}
            >
              <input
                class="visually-hidden"
                type="radio"
                name={step.id}
                value={option.id}
                checked={selection[step.id] === option.id}
                onchange={() => choose(step.id, option.id)}
              />
              <span class={isColor ? 'visually-hidden' : undefined}>{steps[step.id]?.options[option.id]}</span>
            </label>
          {/each}
        </div>
      </fieldset>
    {/each}

    <button type="button" class="buy__button" onclick={addToBag}>{labels.addToBag}</button>
    <p class="buy__added" role="status">
      {#if added}{labels.addedToBag} <a href={bagHref}>{labels.viewBag}</a>{/if}
    </p>
  </div>
</div>

<style>
  .buy {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
    gap: clamp(2rem, 5vw, 4.5rem);
    align-items: start;
  }

  /* Zdjęcie w jasnoszarej karcie, przyklejone przy przewijaniu jak na apple.com. */
  .buy__media {
    position: sticky;
    top: calc(var(--nav-h) + 1.5rem);
    display: grid;
    place-items: center;
    aspect-ratio: 1;
    border-radius: 1.5rem;
    background: #fff;
    overflow: hidden;
  }

  .buy__img {
    width: 100%;
    height: auto;
    animation: fade 300ms var(--ease-out);
  }

  @keyframes fade {
    from {
      opacity: 0;
    }
  }

  .buy__noimg {
    color: var(--color-text-2);
  }

  .buy__panel {
    display: grid;
    gap: 1.75rem;
    padding-top: 1rem;
  }

  .buy__name {
    font-size: clamp(2rem, 1.5rem + 1.6vw, 2.5rem);
    font-weight: 600;
    line-height: 1.1;
    letter-spacing: -0.03em;
  }

  .buy__price {
    margin-top: -1rem;
    font-size: 1.1875rem;
  }

  .choice {
    margin: 0;
    padding: 0;
    border: 0;
  }

  .choice__label {
    margin-bottom: 0.875rem;
    padding: 0;
    font-size: 1.0625rem;
    font-weight: 600;
  }

  .swatches,
  .pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.875rem;
  }

  .swatch {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    background: var(--swatch);
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.12);
    cursor: pointer;
  }

  .swatch:has(:checked) {
    box-shadow:
      inset 0 0 0 1px rgb(0 0 0 / 0.12),
      0 0 0 3px var(--color-surface),
      0 0 0 5px var(--color-text);
  }

  .swatch:has(:focus-visible),
  .pill:has(:focus-visible) {
    outline: 2px solid var(--color-text);
    outline-offset: 7px;
  }

  .pill {
    padding: 0.75rem 1.25rem;
    border-radius: 0.75rem;
    box-shadow: inset 0 0 0 1px var(--color-line);
    cursor: pointer;
  }

  .pill--on {
    box-shadow: inset 0 0 0 2px var(--color-text);
  }

  .buy__button {
    min-height: 3.25rem;
    border: 0;
    border-radius: var(--radius-pill);
    background: var(--color-text);
    color: var(--color-surface);
    font-size: 1.0625rem;
    cursor: pointer;
    transition: transform var(--duration-press) var(--ease-out);
  }

  .buy__button:active {
    transform: scale(0.98);
  }

  .buy__added {
    min-height: 1.5rem;
    margin-top: -1rem;
    color: var(--color-text-2);
  }

  .buy__added a {
    color: var(--color-text);
  }

  @media (max-width: 833px) {
    .buy {
      grid-template-columns: 1fr;
    }

    .buy__media {
      position: static;
    }
  }
</style>
