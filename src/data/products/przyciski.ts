import type { Product } from '../types.ts';

export const przyciski: Product = {
  id: 'przyciski-pojemnosciowe',
  status: 'available',
  configurator: {
    basePrice: { regular: 4000 }, // 40 zł / szt., niezależnie od średnicy
    steps: [
      {
        id: 'diameter',
        options: [{ id: 'd12' }, { id: 'd16' }, { id: 'd20' }],
      },
    ],
    quantity: { min: 1 },
  },
};
