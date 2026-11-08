import type { Product } from '../types.ts';

export const skytimer1: Product = {
  id: 'skytimer-1',
  status: 'available',
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
                lowestPrice30Days: null,
              },
            },
          },
          { id: 'pcb', price: { regular: null } },
        ],
      },
      {
        // Tylko dla zestawu.
        id: 'variant',
        showIf: { stepId: 'type', optionIds: ['kit'] },
        options: [{ id: 'v1' }, { id: 'v2' }, { id: 'v3' }],
      },
    ],
    quantity: { min: 1 },
  },
  todo: [
    'Czym różnią się warianty płytki 1/2/3 i czy mają różne ceny',
    'Lista kolorów (krok "Kolor" dla zestawu) i czy kolor zmienia cenę',
    'Daty przeceny świątecznej (od/do)',
  ],
};
