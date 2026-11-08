/**
 * Pozycje paska menu w danym języku.
 *
 * Kolejność bierze się z src/data/catalog.ts. Produkty "wkrótce" NIE trafiają do menu.
 * Nazwa: navName ze słownika (krótka), a gdy go nie ma, name.
 */
import { CATALOG } from '../data/catalog.ts';
import { getProduct } from '../data/products/index.ts';
import type { Locale } from '../i18n/locales.ts';
import { getDictionary } from '../i18n/index.ts';
import { pathFor } from '../i18n/routes.ts';
import type { Dictionary } from '../i18n/dictionaries/pl.ts';

export function navItems(locale: Locale): { label: string; href: string }[] {
  const dict = getDictionary(locale);

  return CATALOG.filter(
    (entry) => entry.kind === 'page' || getProduct(entry.id)?.status !== 'coming-soon',
  ).map((entry) => {
    const texts: { name: string; navName?: string } | undefined =
      entry.kind === 'page'
        ? dict.pages[entry.id]
        : dict.products[entry.id as keyof Dictionary['products']];
    if (!texts) throw new Error(`Brak tekstów pozycji menu "${entry.id}" w słowniku`);
    return { label: texts.navName ?? texts.name, href: pathFor(locale, entry) };
  });
}
