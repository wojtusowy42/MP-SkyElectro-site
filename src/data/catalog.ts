/**
 * Kolejność pozycji w menu i na stronie głównej (od góry).
 * 'product' wskazuje na produkt z src/data/products/, 'page' na zwykłą podstronę.
 */
export type PageId = 'accessories' | 'services' | 'contact';

export type CatalogEntry = { kind: 'product'; id: string } | { kind: 'page'; id: PageId };

export const CATALOG: CatalogEntry[] = [
  { kind: 'product', id: 'skytimer-1' },
  { kind: 'product', id: 'wieze' },
  { kind: 'product', id: 'przyciski-pojemnosciowe' },
  { kind: 'product', id: 'stateczniki' },
  { kind: 'product', id: 'rury-kadlubowe' },
  { kind: 'product', id: 'elektroniczne-sterowanie' },
  { kind: 'product', id: 'skrzydla-weglowe' },
  { kind: 'page', id: 'accessories' },
  { kind: 'page', id: 'services' },
  { kind: 'page', id: 'contact' },
];
