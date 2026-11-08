import { describe, expect, it } from 'vitest';
import { pickVersion } from './versions.ts';

describe('wersje zdjęć', () => {
  const slide = ['color=blue', 'color=orange', 'variant=v1 color=blue', 'variant=v2 color=orange'];

  it('bez wyborów pierwsza', () => expect(pickVersion(slide, {})).toBe(0));
  it('sam kolor: "trzy warianty" w tym kolorze', () =>
    expect(pickVersion(slide, { color: 'orange' })).toBe(1));
  it('wariant i kolor: pojedynczy wariant', () =>
    expect(pickVersion(slide, { variant: 'v2', color: 'orange' })).toBe(3));
  it('zdjęcie bez opcji pasuje zawsze', () => expect(pickVersion([''], { color: 'blue' })).toBe(0));
});
