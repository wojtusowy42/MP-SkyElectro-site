/**
 * Wszystko, co da się włożyć do torby (produkty z konfiguratorem i akcesoria), w formacie dla Bag.svelte
 * i okna "Dodano do torby" (AddedToBag.svelte): definicja, teksty, adres i miniatury w wersjach.
 * Tylko w czasie buildu (astro:assets), nie do importu w komponentach przeglądarki.
 */
import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import stPcb from '../assets/renders/skytimer-1/konfigurator/pcb.png';
import type { ConfiguratorDefinition } from '../data/types.ts';
import { PRODUCTS } from '../data/products/index.ts';
import { ACCESSORIES, recommendedFor } from '../data/accessories.ts';
import { getDictionary, productTexts, type ProductTexts } from '../i18n/index.ts';
import type { Locale } from '../i18n/locales.ts';
import { accessoryPath, configuratorPath } from '../i18n/routes.ts';
import { accessoryImages } from './accessory-images.ts';

export interface BagProduct {
  definition: ConfiguratorDefinition;
  texts: ProductTexts;
  href: string;
  /** Miniatury w wersjach ('krok=opcja ...'), jak zdjęcia na stronie Kup; pickVersion wybiera pasującą. */
  thumbs: { src: string; match: string }[];
  /** Krótki opis (tylko akcesoria): karta polecanego akcesorium. */
  overview?: string;
}

/**
 * Miniatury pozycji. Zestaw: kup/miniatura-<wariant>-<kolor>.jpg (timer w obudowie, przycięty: cały zestaw
 * w małym kwadracie był nieczytelny); sama płytka: render płytki; przyciski: zdjęcie wybranej średnicy;
 * stateczniki: wybrany rozmiar i pokrycie.
 */
const KITS = import.meta.glob<ImageMetadata>('../assets/renders/*/kup/miniatura-*.jpg', {
  eager: true,
  import: 'default',
});
const BUTTONS = import.meta.glob<ImageMetadata>('../assets/renders/przyciski/kup/srednica-*.jpg', {
  eager: true,
  import: 'default',
});
const STABILIZERS = import.meta.glob<ImageMetadata>('../assets/renders/stateczniki/kup/statecznik-*.jpg', {
  eager: true,
  import: 'default',
});
const PLAIN: Record<string, { src: ImageMetadata; match: string }[]> = {
  'skytimer-1': [{ src: stPcb, match: 'type=pcb' }],
  'przyciski-pojemnosciowe': Object.entries(BUTTONS).map(([path, src]) => ({
    src,
    match: `diameter=${path.split('-').at(-1)!.replace(/\.jpg$/, '')}`,
  })),
  // statecznik-c130-w600-covered.jpg → 'chord=c130 width=w600 covering=covered'
  stateczniki: Object.entries(STABILIZERS).map(([path, src]) => {
    const [chord, width, covering] = path.replace(/\.jpg$/, '').split('-').slice(-3);
    return { src, match: `chord=${chord} width=${width} covering=${covering}` };
  }),
};

// 480 px: miniatura w torbie (120 px) i karta polecanego akcesorium (do 240 px) na ekranach 2x
const resize = (images: { src: ImageMetadata; match: string }[]) =>
  Promise.all(
    images.map(async ({ src, match }) => ({
      src: (await getImage({ src, width: 480, format: 'webp' })).src,
      match,
    })),
  );

function productThumbs(product: (typeof PRODUCTS)[number]) {
  const stepOf = new Map(
    product.configurator!.steps.flatMap((s) => s.options.map((o) => [o.id, s.id] as const)),
  );
  const kits = Object.entries(KITS).flatMap(([path, src]) => {
    if (!path.includes(`/${product.id}/kup/`)) return [];
    const options = path.split('/').at(-1)!.replace(/\.jpg$/, '').split('-').slice(1);
    if (options.some((o) => !stepOf.has(o))) return [];
    return [{ src, match: ['type=kit', ...options.map((o) => `${stepOf.get(o)}=${o}`)].join(' ') }];
  });
  return resize([...(PLAIN[product.id] ?? []), ...kits]);
}

export async function bagProducts(locale: Locale): Promise<Record<string, BagProduct>> {
  const dict = getDictionary(locale);
  const products: Record<string, BagProduct> = {};
  // Tylko produkty z konfiguratorem (tylko je da się włożyć do torby).
  for (const p of PRODUCTS.filter((p) => p.configurator)) {
    const texts = productTexts(dict, p.id);
    products[p.id] = {
      definition: p.configurator!,
      texts: { slug: texts.slug, name: texts.name, ...(texts.steps ? { steps: texts.steps } : {}) },
      href: configuratorPath(locale, p.id),
      thumbs: await productThumbs(p),
    };
  }
  // Akcesoria: ten sam format (mały konfigurator), teksty kroków wspólne ze SkyTimer 1.
  const stepTexts = productTexts(dict, 'skytimer-1').steps ?? {};
  for (const a of ACCESSORIES) {
    const texts = dict.accessories.items[a.id]!;
    products[a.id] = {
      definition: a.configurator,
      texts: {
        slug: texts.slug,
        name: texts.name,
        steps: Object.fromEntries(a.configurator.steps.map((s) => [s.id, stepTexts[s.id]!])),
      },
      href: accessoryPath(locale, { accessory: a.id }),
      thumbs: await resize(accessoryImages(a)),
      overview: texts.overview,
    };
  }
  return products;
}

/** Wybór, przy którym polecane akcesoria są już w kupowanym zestawie (okno dopisuje, że chodzi o zapas). */
const IN_KIT: Record<string, string> = { 'skytimer-1': 'type=kit' };

/** Dane okna "Dodano do torby" dla strony, z której wkłada się `id`: ta pozycja i polecane do niej akcesoria. */
export async function addedToBagData(locale: Locale, id: string) {
  const dict = getDictionary(locale);
  const c = dict.pages.configurator;
  const all = await bagProducts(locale);
  const recommended = recommendedFor(id).map((a) => a.id);
  return {
    products: Object.fromEntries([id, ...recommended].map((k) => [k, all[k]!])),
    recommended,
    ...(IN_KIT[id] ? { inKit: IN_KIT[id] } : {}),
    labels: {
      added: c.addedToBag,
      viewBag: c.viewBag,
      close: dict.common.close,
      recommended: c.recommended,
      recommendedInKit: c.recommendedInKit,
      addToBag: c.addToBag,
      inBag: c.inBag,
      quantity: c.quantity,
      selectedOption: c.selectedOption,
      priceOnRequest: dict.common.priceOnRequest,
    },
  };
}
