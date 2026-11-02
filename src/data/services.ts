import type { Service } from './types.ts';

/** Dodatkowe usługi. Bez cen (nie było ich w notatkach). */
export const SERVICES: Service[] = [
  { id: 'druk-3d', status: 'available' },
  { id: 'projektowanie', status: 'available' },
  { id: 'laser', status: 'coming-soon' },
  { id: 'frezowanie', status: 'coming-soon' },
];
