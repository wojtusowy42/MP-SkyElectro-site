/**
 * Ceny: która cena obowiązuje danego dnia i jak ją wyświetlić.
 *
 * Strona jest statyczna, więc "dzisiaj" = dzień buildu. Promocja z datami
 * włącza się / wyłącza dopiero po przebudowaniu strony (deploy).
 */
import type { Grosze, Price, Promo } from '../data/types.ts';
import { HTML_LANG, type Locale } from '../i18n/locales.ts';
import { SITE } from '../config/site.ts';

/** 'RRRR-MM-DD' danego dnia w czasie polskim (żeby promocja nie kończyła się o 1:00 w nocy). */
export function toDateKey(date: Date): string {
  return date.toLocaleDateString('sv-SE', { timeZone: 'Europe/Warsaw' });
}

/** Czy promocja obowiązuje w danym dniu (daty włącznie). */
export function isPromoActive(promo: Promo, date: Date): boolean {
  const day = toDateKey(date);
  if (promo.from !== null && day < promo.from) return false;
  if (promo.to !== null && day > promo.to) return false;
  return true;
}

/** Aktualna promocja albo null. */
export function activePromo(price: Price, date: Date): Promo | null {
  return price.promo && isPromoActive(price.promo, date) ? price.promo : null;
}

/** Cena obowiązująca danego dnia (promocyjna, jeśli trwa). null = cena nieznana. */
export function currentPrice(price: Price, date: Date): Grosze | null {
  if (price.regular === null) return null;
  return activePromo(price, date)?.price ?? price.regular;
}

/** 35000 → '350,00 zł' (format zależny od języka). */
export function formatPrice(amount: Grosze, locale: Locale): string {
  return new Intl.NumberFormat(HTML_LANG[locale], {
    style: 'currency',
    currency: SITE.currency,
  }).format(amount / 100);
}
