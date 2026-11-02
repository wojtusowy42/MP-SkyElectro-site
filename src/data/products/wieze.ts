import type { Product } from '../types.ts';

export const wieze: Product = {
  id: 'wieze',
  status: 'available',
  configurator: {
    steps: [
      {
        id: 'type',
        options: [
          { id: 'empty', price: { regular: null } },
          { id: 'with-timer', price: { regular: null } },
        ],
      },
      {
        // Tylko dla pustej wieżyczki: pod jaki timer.
        id: 'timerFor',
        showIf: { stepId: 'type', optionIds: ['empty'] },
        options: [{ id: 'skytimer-1' }, { id: 'other' }],
      },
    ],
    quantity: { min: 1 },
  },
  todo: ['PDF ze specyfikacją do custom order (do pobrania na końcu konfiguratora)'],
};
