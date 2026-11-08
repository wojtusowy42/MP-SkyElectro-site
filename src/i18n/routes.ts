/**
 * Adresy stron. Jedno miejsce, które wie, jak zbudować link do czegokolwiek w danym języku.
 * Nigdy nie wpisuj adresów ręcznie w stronach, zawsze przez te funkcje.
 */
import type { CatalogEntry } from '../data/catalog.ts';
import { LOCALES, type Locale } from './locales.ts';
import { getDictionary, productTexts } from './index.ts';

export function homePath(locale: Locale): string {
  return `/${locale}/`;
}

/** Slug pozycji katalogu w danym języku. */
export function slugFor(locale: Locale, entry: CatalogEntry): string {
  const dict = getDictionary(locale);
  return entry.kind === 'product' ? productTexts(dict, entry.id).slug : dict.pages[entry.id].slug;
}

/** /pl/stateczniki/ */
export function pathFor(locale: Locale, entry: CatalogEntry): string {
  return `/${locale}/${slugFor(locale, entry)}/`;
}

/** Ta sama strona we wszystkich językach (do hreflang i przełącznika języka). */
export function alternatesFor(entry: CatalogEntry | 'home'): Record<Locale, string> {
  return Object.fromEntries(
    LOCALES.map((l) => [l, entry === 'home' ? homePath(l) : pathFor(l, entry)]),
  ) as Record<Locale, string>;
}
