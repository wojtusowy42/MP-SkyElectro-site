import { describe, expect, it } from 'vitest';
import { detherBonusMs, splitDuration, timing } from './skytimer-timing.ts';
import { formatDuration } from './duration.ts';

/** Przełączniki z listy numerów na ON (1-10). */
const on = (...nums: number[]) => Array.from({ length: 10 }, (_, i) => nums.includes(i + 1));

describe('SkyTimer 1: czasy z przełączników (podręcznik V3, rozdz. 12-15)', () => {
  it('flop = suma przełączników 1-4 + 0,4 s; wszystkie wyłączone = flop wyłączony', () => {
    expect(timing(on()).flopMs).toBeNull();
    expect(timing(on(1)).flopMs).toBe(600);
    expect(timing(on(1, 2)).flopMs).toBe(1000);
    expect(timing(on(1, 2, 3, 4)).flopMs).toBe(3400);
  });

  it('dether = suma przełączników 5-10; wszystkie wyłączone = 10 s bez odtwarzania', () => {
    const off = timing(on());
    expect(off.detherMs).toBe(10_000);
    expect(off.playback).toBeNull();
    expect(timing(on(5, 6, 7, 8, 9, 10)).detherMs).toBe(945_000); // 15 min 45 s
  });

  it('odtwarzanie: długi = 1 min, krótki = 15 s (przykład z podręcznika: 3 min 30 s)', () => {
    // 3 min 30 s = 2 min (8) + 1 min (7) + 30 s (6)
    expect(timing(on(6, 7, 8)).playback).toEqual({ long: 3, short: 2 });
    expect(timing(on(5)).playback).toEqual({ long: 0, short: 1 });
    expect(timing(on(5, 6, 7, 8, 9, 10)).playback).toEqual({ long: 15, short: 3 });
  });

  it('bonus: < 2 min brak, 2-5 min +5 s, > 5 min +10 s (przykłady 4 min i 8 min)', () => {
    expect(detherBonusMs(105_000)).toBe(0);
    expect(detherBonusMs(120_000)).toBe(5_000);
    expect(detherBonusMs(240_000)).toBe(5_000);
    expect(detherBonusMs(300_000)).toBe(5_000);
    expect(detherBonusMs(315_000)).toBe(10_000);
    expect(detherBonusMs(480_000)).toBe(10_000);
  });

  it('wszystkie 10 na ON = tryb konfiguracji', () => {
    expect(timing(on(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)).configMode).toBe(true);
    expect(timing(on(1, 2, 3, 4, 5, 6, 7, 8, 9)).configMode).toBe(false);
  });

  it('zła liczba przełączników = błąd', () => {
    expect(() => timing([true, false])).toThrow();
  });

  it('rozbicie czasu', () => {
    expect(splitDuration(945_000)).toEqual({ min: 15, sec: 45, tenths: 0 });
    expect(splitDuration(3400)).toEqual({ min: 0, sec: 3, tenths: 4 });
  });
});

describe('formatDuration', () => {
  const u = { sec: '{n} s', min: '{n} min', minSec: '{m} min {s} s' };
  it('formaty', () => {
    expect(formatDuration(1000, u, 'pl-PL', true)).toBe('1,0 s');
    expect(formatDuration(200, u, 'pl-PL', true)).toBe('0,2 s');
    expect(formatDuration(45_000, u, 'pl-PL')).toBe('45 s');
    expect(formatDuration(120_000, u, 'pl-PL')).toBe('2 min');
    expect(formatDuration(140_000, u, 'pl-PL')).toBe('2 min 20 s');
  });
});
