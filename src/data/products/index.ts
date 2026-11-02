/** Wszystkie produkty w jednej liście. Nowy produkt: nowy plik w tym folderze + wpis tutaj. */
import type { Product } from '../types.ts';
import { skytimer1 } from './skytimer-1.ts';
import { wieze } from './wieze.ts';
import { przyciski } from './przyciski.ts';
import { stateczniki } from './stateczniki.ts';
import { ruryKadlubowe, elektroniczneSterowanie, skrzydlaWeglowe } from './coming-soon.ts';

export const PRODUCTS: Product[] = [
  skytimer1,
  wieze,
  przyciski,
  stateczniki,
  ruryKadlubowe,
  elektroniczneSterowanie,
  skrzydlaWeglowe,
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
