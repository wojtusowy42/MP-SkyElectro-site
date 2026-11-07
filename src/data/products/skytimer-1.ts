import type { Product } from '../types.ts';

export const skytimer1: Product = {
  id: 'skytimer-1',
  status: 'available',
  // Czerwień płytki z renderu: jaśniejsza (światło) → głęboka (cień).
  colors: ['#ffb08a', '#f0142f'],
  // Od właściciela 2026-11-06. Masa zestawu szacunkowa (patrz todo).
  physical: { sizeMm: [29, 37], weightG: 7, kitWeightG: 25 },
  configurator: {
    steps: [
      {
        // Pierwszy wybór: zestaw czy sama płytka.
        id: 'type',
        options: [
          {
            id: 'kit',
            price: {
              regular: 35000,
              promo: {
                price: 30000, // przecena świąteczna
                from: null,
                to: null,
                lowestPrice30Days: 35000, // Omnibus: najniższa cena z 30 dni przed obniżką (potwierdzone przez właściciela 2026-11-04)
              },
            },
          },
          { id: 'pcb', price: { regular: 18000 } },
        ],
      },
      {
        // Tylko dla zestawu.
        id: 'variant',
        showIf: { stepId: 'type', optionIds: ['kit'] },
        options: [{ id: 'v1' }, { id: 'v2' }, { id: 'v3' }],
      },
      {
        // Tylko dla zestawu: kolor części drukowanych. Filamenty z "Specs.pdf"; PETG Matte Gray
        // i Basic Gray to jedna pozycja (podobne, właściciel dopasowuje w produkcji).
        // Próbki przybliżone: dobrane z nazw filamentów, nie z próbników.
        id: 'color',
        showIf: { stepId: 'type', optionIds: ['kit'] },
        options: [
          { id: 'blue', swatch: '#a9c0d3' },
          { id: 'white', swatch: '#f2f1ec' },
          { id: 'gray', swatch: '#8d9093' },
          { id: 'orange', swatch: '#f07d2c' },
          { id: 'black', swatch: '#1f1f21' },
        ],
      },
    ],
    quantity: { min: 1 },
  },
  todo: [
    'Daty przeceny świątecznej (od/do)',
    'Dokładna masa zestawu (teraz szacunek 25 g, na stronie "około")',
  ],
};
