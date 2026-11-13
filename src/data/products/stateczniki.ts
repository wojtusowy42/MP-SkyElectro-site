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
        // Szerokość = 530 + n × 72 mm (notatki klienta; 72 = para pól żeber), n = 0..3, etykiety zaokrąglone do 10 mm:
        // 530, 602 → 600, 674 → 670, 746 → 750 (model 130x600 z Fusion ma 602 mm).
        id: 'width',
        options: [{ id: 'w530' }, { id: 'w600' }, { id: 'w670' }, { id: 'w750' }],
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
    'Szerokość: wzór 530 + n × 72 mm, w notatkach urwane "n to liczby 0, 1, 2, 3, aż do". Przyjęte n = 0..3 (530-750 mm): potwierdzić górną granicę.',
    'Modele 130x530, 130x670, 150x530, 150x600, 150x670 wygenerowane z modeli z Fusion (wytnij_pola_statecznika.py): potwierdzić z klientem.',
    'Krok "Jak daleko od krawędzi natarcia jest słupek flop": jakie wartości do wyboru?',
    'Potwierdzić: cena 250 / 300 zł jest za sztukę?',
  ],
};
