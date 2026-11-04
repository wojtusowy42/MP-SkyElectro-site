/**
 * Nazwy pozycji w pasku menu w danym języku.
 *
 * Kolejność bierze się z src/data/catalog.ts. Produkty "wkrótce" NIE trafiają do menu.
 * Na razie same nazwy, bez linków (menu jeszcze nie jest klikalne).
 */
import { CATALOG } from '../data/catalog.ts';
import { getProduct } from '../data/products/index.ts';
import type { Locale } from '../i18n/locales.ts';
import { getDictionary, productTexts } from '../i18n/index.ts';

export function navLabels(locale: Locale): string[] {
  const dict = getDictionary(locale);

  return CATALOG.filter(
    (entry) => entry.kind === 'page' || getProduct(entry.id)?.status !== 'coming-soon',
  ).map((entry) => {
    if (entry.kind === 'product') return productTexts(dict, entry.id).name;
    const page = dict.pages[entry.id];
    // Krótka nazwa do menu, jeśli pełna jest za długa.
    return 'navName' in page ? page.navName : page.name;
  });
}
