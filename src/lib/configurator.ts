/**
 * Logika konfiguratora, bez żadnego wyglądu.
 * Ten sam kod posłuży później komponentowi konfiguratora w przeglądarce
 * i formularzowi zamówienia, więc liczy się zawsze tak samo.
 */
import type { ConfiguratorDefinition, ConfiguratorStep, Grosze, Price } from '../data/types.ts';
import { activePromo, currentPrice } from './price.ts';

/** Wybory klienta: id kroku → id wybranej opcji. */
export type Selection = Record<string, string>;

/** Kroki widoczne przy danych wyborach (np. "Wariant płytki" tylko dla zestawu). */
export function visibleSteps(
  def: ConfiguratorDefinition,
  selection: Selection,
): ConfiguratorStep[] {
  return def.steps.filter((step) => {
    if (!step.showIf) return true;
    const chosen = selection[step.showIf.stepId];
    return chosen !== undefined && step.showIf.optionIds.includes(chosen);
  });
}

/**
 * Usuwa wybory, które przestały mieć sens (krok ukryty albo nieistniejąca opcja).
 * Przykład: klient wybrał wariant, potem zmienił na "sama płytka". Wariant znika.
 * Powtarza do skutku, bo ukrycie jednego kroku może ukryć kolejny.
 */
export function cleanSelection(def: ConfiguratorDefinition, selection: Selection): Selection {
  let current = { ...selection };
  for (;;) {
    const next: Selection = {};
    for (const step of visibleSteps(def, current)) {
      const chosen = current[step.id];
      if (chosen !== undefined && step.options.some((o) => o.id === chosen)) {
        next[step.id] = chosen;
      }
    }
    if (Object.keys(next).length === Object.keys(current).length) return next;
    current = next;
  }
}

/** Czy wszystkie widoczne kroki mają wybraną opcję. */
export function isComplete(def: ConfiguratorDefinition, selection: Selection): boolean {
  const clean = cleanSelection(def, selection);
  return visibleSteps(def, clean).every((step) => clean[step.id] !== undefined);
}

export type QuantityError = 'below-min' | 'above-max' | 'not-integer';

/** Sprawdza ilość sztuk (MOQ). null = ilość poprawna. */
export function checkQuantity(def: ConfiguratorDefinition, quantity: number): QuantityError | null {
  if (!Number.isInteger(quantity)) return 'not-integer';
  if (quantity < def.quantity.min) return 'below-min';
  if (def.quantity.max !== undefined && quantity > def.quantity.max) return 'above-max';
  return null;
}

export interface Quote {
  /** Cena za sztukę po promocjach. null = któraś część ceny jest nieznana. */
  unitPrice: Grosze | null;
  /** Cena za sztukę bez promocji (do przekreślenia, gdy trwa promocja). */
  regularUnitPrice: Grosze | null;
  /** unitPrice × ilość. */
  total: Grosze | null;
  /** Czy w cenie jest aktywna promocja. */
  hasPromo: boolean;
}

/**
 * Wycena: cena bazowa + ceny wybranych opcji, razy ilość.
 * Opcja bez ceny nic nie dodaje. Opcja z ceną nieznaną (null) robi całą cenę nieznaną.
 */
export function quote(
  def: ConfiguratorDefinition,
  selection: Selection,
  quantity: number,
  date: Date,
): Quote {
  const clean = cleanSelection(def, selection);

  const prices: Price[] = [];
  if (def.basePrice) prices.push(def.basePrice);
  for (const step of visibleSteps(def, clean)) {
    const option = step.options.find((o) => o.id === clean[step.id]);
    if (option?.price) prices.push(option.price);
  }

  let unit: Grosze | null = 0;
  let regular: Grosze | null = 0;
  let hasPromo = false;
  for (const price of prices) {
    const now = currentPrice(price, date);
    unit = unit === null || now === null ? null : unit + now;
    regular = regular === null || price.regular === null ? null : regular + price.regular;
    if (activePromo(price, date)) hasPromo = true;
  }

  return {
    unitPrice: unit,
    regularUnitPrice: regular,
    total: unit === null ? null : unit * quantity,
    hasPromo: hasPromo && unit !== null,
  };
}
