/**
 * Sprawdzanie danych katalogu i słowników. Uruchamiane przez testy przy każdym buildzie.
 *
 * errors   = coś jest zepsute, build się NIE uda (np. opcja bez tłumaczenia, zdublowany adres).
 * warnings = czegoś brakuje, ale da się zbudować (np. cena nieznana, wpisy todo).
 */
import { PRODUCTS } from './products/index.ts';
import { SERVICES } from './services.ts';
import { ACCESSORIES } from './accessories.ts';
import { CATALOG } from './catalog.ts';
import type { Price } from './types.ts';
import { isPromoActive } from '../lib/price.ts';
import { LOCALES } from '../i18n/locales.ts';
import { getDictionary, type ProductTexts } from '../i18n/index.ts';

export interface ValidationResult {
  errors: string[];
  warnings: string[];
}

export function validateCatalog(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const today = new Date(); // dzień buildu, tak samo jak na stronie

  const checkPrice = (where: string, price: Price) => {
    if (price.regular === null) warnings.push(`${where}: brak ceny`);
    const promo = price.promo;
    // Omnibus: trwająca przecena MUSI mieć najniższą cenę z 30 dni (strona pokazuje ją obok).
    // Przecena zaplanowana na później: na razie tylko ostrzeżenie.
    if (promo && promo.lowestPrice30Days === null) {
      const msg = `${where}: przecena bez najniższej ceny z 30 dni (Omnibus, pole lowestPrice30Days)`;
      if (isPromoActive(promo, today)) errors.push(msg);
      else warnings.push(msg);
    }
    if (promo && promo.lowestPrice30Days !== null && promo.price >= promo.lowestPrice30Days) {
      errors.push(
        `${where}: cena promocyjna nie jest niższa od najniższej ceny z 30 dni, więc to nie jest obniżka`,
      );
    }
    if (price.promo && price.regular !== null && price.promo.price >= price.regular) {
      errors.push(`${where}: cena promocyjna nie jest niższa od regularnej`);
    }
  };

  // Unikalne id
  const ids = PRODUCTS.map((p) => p.id);
  for (const id of new Set(ids)) {
    if (ids.filter((x) => x === id).length > 1) errors.push(`Zdublowane id produktu: ${id}`);
  }

  // Katalog wskazuje tylko na istniejące produkty i każdy produkt jest w katalogu
  for (const entry of CATALOG) {
    if (entry.kind === 'product' && !ids.includes(entry.id)) {
      errors.push(`Katalog wskazuje na nieistniejący produkt: ${entry.id}`);
    }
  }
  for (const id of ids) {
    if (!CATALOG.some((e) => e.kind === 'product' && e.id === id)) {
      errors.push(`Produkt ${id} nie jest dodany do src/data/catalog.ts`);
    }
  }

  // Produkty: kroki, opcje, ceny
  for (const product of PRODUCTS) {
    const def = product.configurator;
    for (const item of product.todo ?? []) warnings.push(`${product.id}: TODO ${item}`);
    if (!def) continue;

    if (def.quantity.min < 1) errors.push(`${product.id}: minimalna ilość musi być >= 1`);
    if (def.basePrice) checkPrice(`${product.id} (cena bazowa)`, def.basePrice);

    const seenSteps: string[] = [];
    for (const step of def.steps) {
      if (seenSteps.includes(step.id)) errors.push(`${product.id}: zdublowany krok ${step.id}`);
      if (step.options.length === 0) errors.push(`${product.id}.${step.id}: krok bez opcji`);

      if (step.showIf) {
        // Warunek może wskazywać tylko na krok WCZEŚNIEJSZY i jego istniejące opcje.
        const parent = def.steps.find((s) => s.id === step.showIf?.stepId);
        if (!parent || !seenSteps.includes(parent.id)) {
          errors.push(`${product.id}.${step.id}: showIf wskazuje na zły lub późniejszy krok`);
        } else {
          for (const optId of step.showIf.optionIds) {
            if (!parent.options.some((o) => o.id === optId)) {
              errors.push(`${product.id}.${step.id}: showIf wskazuje na brakującą opcję ${optId}`);
            }
          }
        }
      }
      seenSteps.push(step.id);

      const optIds = step.options.map((o) => o.id);
      if (new Set(optIds).size !== optIds.length) {
        errors.push(`${product.id}.${step.id}: zdublowane opcje`);
      }
      for (const option of step.options) {
        if (option.price) checkPrice(`${product.id}.${step.id}.${option.id}`, option.price);
        if (option.swatch !== undefined && !/^#[0-9a-f]{6}$/i.test(option.swatch)) {
          errors.push(`${product.id}.${step.id}.${option.id}: swatch musi być kolorem #rrggbb`);
        }
      }
    }
  }

  for (const accessory of ACCESSORIES) checkPrice(`akcesorium ${accessory.id}`, accessory.price);
  for (const service of SERVICES) {
    for (const item of service.todo ?? []) warnings.push(`usługa ${service.id}: TODO ${item}`);
  }
  if (ACCESSORIES.length === 0) warnings.push('Akcesoria: lista jest pusta');

  // Słowniki: każdy włączony język ma teksty dla wszystkiego, adresy się nie powtarzają
  for (const locale of LOCALES) {
    const dict = getDictionary(locale);
    const products = dict.products as Record<string, ProductTexts | undefined>;
    const slugs: string[] = [
      dict.pages.accessories.slug,
      dict.pages.services.slug,
      dict.pages.contact.slug,
    ];

    for (const product of PRODUCTS) {
      const texts = products[product.id];
      if (!texts) {
        errors.push(`[${locale}] brak tekstów produktu ${product.id}`);
        continue;
      }
      slugs.push(texts.slug);
      for (const step of product.configurator?.steps ?? []) {
        const stepTexts = texts.steps?.[step.id];
        if (!stepTexts) {
          errors.push(`[${locale}] brak etykiety kroku ${product.id}.${step.id}`);
          continue;
        }
        for (const option of step.options) {
          if (!stepTexts.options[option.id]) {
            errors.push(`[${locale}] brak etykiety opcji ${product.id}.${step.id}.${option.id}`);
          }
        }
      }
    }
    for (const service of SERVICES) {
      if (!(dict.services as Record<string, string | undefined>)[service.id]) {
        errors.push(`[${locale}] brak nazwy usługi ${service.id}`);
      }
    }
    for (const accessory of ACCESSORIES) {
      if (!dict.accessories.items[accessory.id]) {
        errors.push(`[${locale}] brak nazwy akcesorium ${accessory.id}`);
      }
    }

    for (const slug of slugs) {
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
        errors.push(
          `[${locale}] adres "${slug}" może mieć tylko małe litery a-z, cyfry i myślniki`,
        );
      }
    }
    for (const slug of new Set(slugs)) {
      if (slugs.filter((s) => s === slug).length > 1) {
        errors.push(`[${locale}] zdublowany adres: /${locale}/${slug}/`);
      }
    }
  }

  return { errors, warnings };
}
