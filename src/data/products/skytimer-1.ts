import type { Product } from '../types.ts';

export const skytimer1: Product = {
  id: 'skytimer-1',
  status: 'available',
  // Czerwień płytki z renderu: jaśniejsza (światło) → głęboka (cień).
  colors: ['#ffb08a', '#f0142f'],
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
        // Tylko dla zestawu. Na razie znany jeden kolor (z renderu), reszta: todo.
        id: 'color',
        showIf: { stepId: 'type', optionIds: ['kit'] },
        options: [{ id: 'red', swatch: '#d4141f' }],
      },
    ],
    quantity: { min: 1 },
  },
  todo: [
    'Czym różnią się warianty płytki 1/2/3 i czy mają różne ceny',
    'Lista kolorów (krok "Kolor" dla zestawu; na razie tylko czerwony z renderu) i czy kolor zmienia cenę',
    'Daty przeceny świątecznej (od/do)',
  ],
};
