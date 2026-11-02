/**
 * Dostęp do tekstów w danym języku.
 */
import type { Locale } from './locales.ts';
import { pl, type Dictionary } from './dictionaries/pl.ts';

/** Słowniki włączonych języków. Nowy język: import + wpis tutaj. */
const DICTIONARIES: Record<Locale, Dictionary> = { pl };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

/** Podstawia zmienne do tekstu: format('Min. {n} szt.', { n: 2 }) → 'Min. 2 szt.' */
export function format(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

/** Teksty jednego produktu (tak samo zbudowane w każdym słowniku). */
export interface ProductTexts {
  slug: string;
  name: string;
  steps?: Record<string, { label: string; options: Record<string, string> }>;
  mountingNote?: string;
}

/** Teksty produktu po jego id. Rzuca błąd, jeśli w słowniku ich brakuje (build się zatrzyma). */
export function productTexts(dict: Dictionary, productId: string): ProductTexts {
  const texts = (dict.products as Record<string, ProductTexts | undefined>)[productId];
  if (!texts) throw new Error(`Brak tekstów produktu "${productId}" w słowniku`);
  return texts;
}

/** Nazwa usługi po id. */
export function serviceName(dict: Dictionary, serviceId: string): string {
  const name = (dict.services as Record<string, string | undefined>)[serviceId];
  if (!name) throw new Error(`Brak nazwy usługi "${serviceId}" w słowniku`);
  return name;
}
