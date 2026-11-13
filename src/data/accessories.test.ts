import { describe, expect, it } from 'vitest';
import { ACCESSORIES, recommendedFor } from './accessories.ts';

describe('polecane akcesoria', () => {
  it('SkyTimer 1 dostaje trzy istniejące akcesoria', () => {
    expect(recommendedFor('skytimer-1').map((a) => a.id)).toEqual([
      'akumulator',
      'modul-zasilania',
      'zestaw-srubek',
    ]);
  });

  it('akcesorium nie poleca samego siebie i nadal ma trzy pozycje', () => {
    for (const a of ACCESSORIES.filter((x) => x.category === 'skytimer-1')) {
      const ids = recommendedFor(a.id).map((r) => r.id);
      expect(ids).not.toContain(a.id);
      expect(ids).toHaveLength(3);
    }
  });

  it('produkt bez polecanych akcesoriów ma pustą listę', () => {
    expect(recommendedFor('przyciski-pojemnosciowe')).toEqual([]);
  });
});
