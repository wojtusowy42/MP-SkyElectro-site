import { describe, expect, it } from 'vitest';
import { pickVersion, slideHidden } from './versions.ts';

describe('wersje zdjęć', () => {
  const slide = ['color=blue', 'color=orange', 'variant=v1 color=blue', 'variant=v2 color=orange'];

  it('bez wyborów pierwsza', () => expect(pickVersion(slide, {})).toBe(0));
  it('sam kolor: "trzy warianty" w tym kolorze', () =>
    expect(pickVersion(slide, { color: 'orange' })).toBe(1));
  it('wariant i kolor: pojedynczy wariant', () =>
    expect(pickVersion(slide, { variant: 'v2', color: 'orange' })).toBe(3));
  it('zdjęcie bez opcji pasuje zawsze', () => expect(pickVersion([''], { color: 'blue' })).toBe(0));
});

describe('miniatury w torbie', () => {
  const thumbs = [
    'type=pcb',
    'type=kit variant=v1 color=blue',
    'type=kit variant=v2 color=blue',
    'type=kit variant=v2 color=blue screws=blackened',
  ];
  it('sama płytka', () => expect(pickVersion(thumbs, { type: 'pcb' })).toBe(0));
  it('zestaw: wariant, kolor, cynk', () =>
    expect(pickVersion(thumbs, { type: 'kit', variant: 'v2', color: 'blue', screws: 'zinc' })).toBe(2));
  it('zestaw: czernione', () =>
    expect(
      pickVersion(thumbs, { type: 'kit', variant: 'v2', color: 'blue', screws: 'blackened' }),
    ).toBe(3));
});

describe('slajdy galerii', () => {
  const steps = ['chord', 'width', 'covering'];
  const all = { chord: 'c130', width: 'w600', covering: 'covered' };

  it('detal ogólny (complete=false): widoczny do wybrania wszystkiego', () => {
    expect(slideHidden(undefined, 'false', { chord: 'c130' }, steps)).toBe(false);
    expect(slideHidden(undefined, 'false', all, steps)).toBe(true);
  });
  it('zdjęcie konfiguracji (complete=true): dopiero po wybraniu wszystkiego', () => {
    expect(slideHidden(undefined, 'true', {}, steps)).toBe(true);
    expect(slideHidden(undefined, 'true', all, steps)).toBe(false);
  });
  it('only: schowany przy innym wyborze, bez complete zawsze widoczny', () => {
    expect(slideHidden('chord=c150', undefined, all, steps)).toBe(true);
    expect(slideHidden('chord=c130', undefined, all, steps)).toBe(false);
    expect(slideHidden(undefined, undefined, {}, steps)).toBe(false);
  });
});
