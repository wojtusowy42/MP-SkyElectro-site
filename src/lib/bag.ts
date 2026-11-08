/**
 * Torba: co klient odłożył do zamówienia. Bez płatności: z torby wychodzi jeden mail z zamówieniem.
 *
 * Trzymamy tylko produkt, wybory i ilość (w localStorage tej przeglądarki). Ceny liczy strona torby
 * z aktualnych danych, więc zmiana ceny albo koniec promocji od razu się w torbie zgadzają.
 */
import type { Selection } from './configurator.ts';

export interface BagLine {
  productId: string;
  selection: Selection;
  quantity: number;
}

const KEY = 'mp-skyelectro-bag';
/** Zdarzenie na window po każdej zmianie torby (licznik w menu, strona torby). */
export const BAG_EVENT = 'bag:change';

const sameSelection = (a: Selection, b: Selection) =>
  Object.keys(a).length === Object.keys(b).length &&
  Object.entries(a).every(([k, v]) => b[k] === v);

/** Dokłada pozycję. Ten sam produkt z tymi samymi wyborami zwiększa ilość zamiast nowej linii. */
export function addLine(lines: BagLine[], line: BagLine): BagLine[] {
  const i = lines.findIndex(
    (l) => l.productId === line.productId && sameSelection(l.selection, line.selection),
  );
  if (i === -1) return [...lines, line];
  return lines.map((l, n) => (n === i ? { ...l, quantity: l.quantity + line.quantity } : l));
}

export const bagCount = (lines: BagLine[]) => lines.reduce((sum, l) => sum + l.quantity, 0);

/** Odczyt odporny na zepsute dane i zablokowany localStorage (tryb prywatny): wtedy pusta torba. */
export function readBag(): BagLine[] {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    if (!Array.isArray(data)) return [];
    return data.filter(
      (l): l is BagLine =>
        typeof l?.productId === 'string' &&
        typeof l.selection === 'object' &&
        l.selection !== null &&
        Number.isInteger(l.quantity) &&
        l.quantity > 0,
    );
  } catch {
    return [];
  }
}

export function writeBag(lines: BagLine[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    // brak miejsca albo zablokowany localStorage: torba żyje tylko do przeładowania strony
  }
  window.dispatchEvent(new CustomEvent(BAG_EVENT, { detail: lines }));
}
