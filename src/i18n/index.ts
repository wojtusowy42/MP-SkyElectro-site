/**
 * Dostęp do tekstów w danym języku.
 */
import type { Locale } from './locales.ts';
import { pl, type Dictionary } from './dictionaries/pl.ts';
import { en } from './dictionaries/en.ts';

/** Słowniki włączonych języków. Nowy język: import + wpis tutaj. */
const DICTIONARIES: Record<Locale, Dictionary> = { pl, en };

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
  /**
   * Kroki konfiguratora. heading = krótki pogrubiony nagłówek ("Wariant."),
   * label = pytanie po nim, szarym ("Wybierz wersję płytki.").
   */
  steps?: Record<string, { heading?: string; label: string; options: Record<string, string> }>;
  mountingNote?: string;
  /** Opisy (alt) zdjęć produktu, klucz = nazwa pliku renderu bez rozszerzenia. */
  images?: Record<string, string>;
  /**
   * Teksty strony "Dowiedz się więcej". Sekcje właściwe jednemu produktowi (np. siatka
   * wyróżników SkyTimera) komponent czyta wprost ze słownika, z pełnym typem.
   */
  story?: {
    tagline?: string;
    introDescription?: string;
    /** Opis paska produktu (LocalNav) dla czytników ekranu. */
    localNavLabel?: string;
  };
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
