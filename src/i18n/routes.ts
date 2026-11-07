/**
 * Adresy stron. Jedno miejsce, które wie, jak zbudować link do czegokolwiek w danym języku.
 * Nigdy nie wpisuj adresów ręcznie w stronach, zawsze przez te funkcje.
 */
import type { CatalogEntry } from '../data/catalog.ts';
import { LOCALES, type Locale } from './locales.ts';
import { getDictionary, productTexts } from './index.ts';

export function homePath(locale: Locale): string {
  return `${import.meta.env.BASE_URL}${locale}/`;
}

/** Slug pozycji katalogu w danym języku. */
export function slugFor(locale: Locale, entry: CatalogEntry): string {
  const dict = getDictionary(locale);
  return entry.kind === 'product' ? productTexts(dict, entry.id).slug : dict.pages[entry.id].slug;
}

/** /pl/stateczniki/ */
export function pathFor(locale: Locale, entry: CatalogEntry): string {
  return `${import.meta.env.BASE_URL}${locale}/${slugFor(locale, entry)}/`;
}

/** Ta sama strona we wszystkich językach (do hreflang i przełącznika języka). */
export function alternatesFor(entry: CatalogEntry | 'home'): Record<Locale, string> {
  return Object.fromEntries(
    LOCALES.map((l) => [l, entry === 'home' ? homePath(l) : pathFor(l, entry)]),
  ) as Record<Locale, string>;
}

/** Konfigurator produktu: /pl/skytimer-1/konfigurator/ */
export function configuratorPath(locale: Locale, productId: string): string {
  const dict = getDictionary(locale);
  return `${pathFor(locale, { kind: 'product', id: productId })}${dict.pages.configurator.slug}/`;
}

/** Konfigurator produktu we wszystkich językach (do hreflang). */
export function configuratorAlternates(productId: string): Record<Locale, string> {
  return Object.fromEntries(LOCALES.map((l) => [l, configuratorPath(l, productId)])) as Record<
    Locale,
    string
  >;
}
