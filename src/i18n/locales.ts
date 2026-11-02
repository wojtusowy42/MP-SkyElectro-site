/**
 * Lista języków strony.
 *
 * Język jest WŁĄCZONY, kiedy jest na tej liście. Wtedy build wygeneruje dla niego
 * wszystkie strony, a TypeScript wymusi, żeby jego słownik (src/i18n/dictionaries/)
 * był kompletny. Brakujące tłumaczenie = błąd buildu, nie pusta dziura na stronie.
 *
 * Jak dodać język (np. angielski):
 *   1. skopiuj src/i18n/dictionaries/pl.ts jako en.ts i przetłumacz wszystkie teksty,
 *   2. dopisz 'en' tutaj do LOCALES i do HTML_LANG,
 *   3. dopisz en do DICTIONARIES w src/i18n/index.ts.
 *
 * Planowane: en, cs, sk, fr (lista do potwierdzenia).
 */
export const LOCALES = ['pl'] as const;

export type Locale = (typeof LOCALES)[number];

/** Język, na który przekierowuje "/" i który jest x-default w hreflang. */
export const DEFAULT_LOCALE: Locale = 'pl';

/** Kod języka do atrybutu <html lang>, hreflang i formatowania cen. */
export const HTML_LANG: Record<Locale, string> = {
  pl: 'pl-PL',
};

export function isLocale(value: string | undefined): value is Locale {
  return (LOCALES as readonly string[]).includes(value ?? '');
}
