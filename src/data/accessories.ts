import type { Price } from './types.ts';

/**
 * Akcesoria i części zamienne (pojedyncze rzeczy do SkyTimera, ładowarki itp.).
 * Proste pozycje: obrazek, nazwa, cena. Bez konfiguratora.
 * Nazwa każdej pozycji jest w słowniku pod accessories.items.<id>.
 */
export interface Accessory {
  id: string;
  price: Price;
}

// TODO: lista akcesoriów i ich ceny (brak w notatkach).
export const ACCESSORIES: Accessory[] = [];
