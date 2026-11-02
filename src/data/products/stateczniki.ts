import type { Product } from '../types.ts';

export const stateczniki: Product = {
  id: 'stateczniki',
  status: 'available',
  configurator: {
    steps: [
      {
        id: 'chord',
        options: [{ id: 'c130' }, { id: 'c150' }],
      },
      {
        id: 'width',
        options: [{ id: 'w600' }, { id: 'w750' }],
      },
      {
        // Cena zależy od pokrycia. Kolejność tego kroku do potwierdzenia.
        id: 'covering',
        options: [
          { id: 'uncovered', price: { regular: 25000 } },
          { id: 'covered', price: { regular: 30000 } },
        ],
      },
    ],
    // MOQ: dla jednej sztuki nie ruszy produkcja.
    quantity: { min: 2 },
  },
  todo: [
    'Szerokość: w notatkach są 2 wartości (600 / 750 mm) ORAZ "liczona ze wzoru" (wzór urwany). Co obowiązuje?',
    'Krok "Jak daleko od krawędzi natarcia jest słupek flop": jakie wartości do wyboru?',
    'Potwierdzić: cena 250 / 300 zł jest za sztukę?',
  ],
};
