/**
 * Testy logiki konfiguratora na PRZYKŁADOWYM produkcie (nie na prawdziwych danych),
 * żeby zmiana cen w katalogu nie psuła testów.
 */
import { describe, expect, test } from 'vitest';
import type { ConfiguratorDefinition } from '../data/types.ts';
import { checkQuantity, cleanSelection, isComplete, quote, visibleSteps } from './configurator.ts';

const def: ConfiguratorDefinition = {
  steps: [
    {
      id: 'type',
      options: [
        {
          id: 'kit',
          price: {
            regular: 35000,
            promo: { price: 30000, from: '2026-12-01', to: '2026-12-24', lowestPrice30Days: 35000 },
          },
        },
        { id: 'pcb', price: { regular: null } },
      ],
    },
    {
      id: 'variant',
      showIf: { stepId: 'type', optionIds: ['kit'] },
      options: [{ id: 'v1' }, { id: 'v2', price: { regular: 1000 } }],
    },
  ],
  quantity: { min: 2, max: 10 },
};

const beforePromo = new Date('2026-11-15T12:00:00Z');
const duringPromo = new Date('2026-12-10T12:00:00Z');

describe('widoczność kroków', () => {
  test('wariant widać tylko dla zestawu', () => {
    expect(visibleSteps(def, {}).map((s) => s.id)).toEqual(['type']);
    expect(visibleSteps(def, { type: 'kit' }).map((s) => s.id)).toEqual(['type', 'variant']);
    expect(visibleSteps(def, { type: 'pcb' }).map((s) => s.id)).toEqual(['type']);
  });

  test('zmiana na płytkę kasuje wybrany wariant', () => {
    expect(cleanSelection(def, { type: 'pcb', variant: 'v1' })).toEqual({ type: 'pcb' });
  });

  test('nieistniejąca opcja jest usuwana', () => {
    expect(cleanSelection(def, { type: 'xxx' })).toEqual({});
  });

  test('kompletność', () => {
    expect(isComplete(def, { type: 'kit' })).toBe(false);
    expect(isComplete(def, { type: 'kit', variant: 'v1' })).toBe(true);
    expect(isComplete(def, { type: 'pcb' })).toBe(true);
  });
});

describe('ilość (MOQ)', () => {
  test('poniżej minimum, powyżej maksimum, ułamki', () => {
    expect(checkQuantity(def, 1)).toBe('below-min');
    expect(checkQuantity(def, 2)).toBeNull();
    expect(checkQuantity(def, 11)).toBe('above-max');
    expect(checkQuantity(def, 2.5)).toBe('not-integer');
  });
});

describe('wycena', () => {
  test('cena regularna przed promocją', () => {
    expect(quote(def, { type: 'kit', variant: 'v1' }, 2, beforePromo)).toEqual({
      unitPrice: 35000,
      regularUnitPrice: 35000,
      total: 70000,
      hasPromo: false,
    });
  });

  test('promocja w trakcie + dopłata za wariant', () => {
    expect(quote(def, { type: 'kit', variant: 'v2' }, 3, duringPromo)).toEqual({
      unitPrice: 31000,
      regularUnitPrice: 36000,
      total: 93000,
      hasPromo: true,
    });
  });

  test('promocja kończy się po ostatnim dniu (czas polski)', () => {
    // 24.12 23:30 w Polsce to jeszcze promocja, 25.12 00:30 już nie
    expect(quote(def, { type: 'kit' }, 2, new Date('2026-12-24T22:30:00Z')).hasPromo).toBe(true);
    expect(quote(def, { type: 'kit' }, 2, new Date('2026-12-24T23:30:00Z')).hasPromo).toBe(false);
  });

  test('nieznana cena opcji = nieznana cena całości', () => {
    expect(quote(def, { type: 'pcb' }, 2, duringPromo).total).toBeNull();
  });

  test('ukryty krok nie wpływa na cenę', () => {
    expect(quote(def, { type: 'pcb', variant: 'v2' }, 2, duringPromo).unitPrice).toBeNull();
  });
});
