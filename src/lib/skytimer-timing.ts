/**
 * Co pokaże SkyTimer 1 dla danego ustawienia przełączników DIP (bez wyglądu, bez tekstów).
 * Fakty: src/data/skytimer-1-spec.ts. Używa tego symulator na stronie produktu (w przeglądarce).
 *
 * Przełączniki: tablica 10 wartości, indeks 0 = przełącznik nr 1, true = ON.
 */
import { SKYTIMER_1_TIMING as T } from '../data/skytimer-1-spec.ts';

export type Switches = readonly boolean[];

export interface TimingResult {
  /** Wszystkie przełączniki na ON: po włączeniu timer wchodzi w tryb konfiguracji. */
  configMode: boolean;
  /** Czas flop w ms; null = flop wyłączony (przełączniki 1-4 na OFF). */
  flopMs: number | null;
  /** Czas dether ustawiony przełącznikami 5-10, w ms. */
  detherMs: number;
  /** Bonus doliczany automatycznie, w ms. */
  bonusMs: number;
  /** Odtwarzanie po włączeniu; null = brak (dether 10 s, wszystkie 5-10 na OFF). */
  playback: { long: number; short: number } | null;
}

function sumOn(switches: Switches, values: readonly number[], from: number): number {
  return values.reduce((sum, v, i) => (switches[from + i] ? sum + v : sum), 0);
}

export function flopMs(switches: Switches): number | null {
  const sum = sumOn(switches, T.flop.switches, 0);
  return sum === 0 ? null : sum + T.flop.offset;
}

export function detherMs(switches: Switches): number {
  const sum = sumOn(switches, T.dether.switches, T.flop.switches.length);
  return sum === 0 ? T.dether.whenAllOff : sum;
}

export function detherBonusMs(dether: number): number {
  let bonus = 0;
  for (const step of T.detherBonus) if (dether >= step.from) bonus = step.bonus;
  return bonus;
}

export function playback(dether: number, allOff: boolean): TimingResult['playback'] {
  if (allOff) return null;
  const long = Math.floor(dether / T.playback.long);
  const short = Math.round((dether - long * T.playback.long) / T.playback.short);
  return { long, short };
}

export function timing(switches: Switches): TimingResult {
  if (switches.length !== T.switchCount) {
    throw new Error(`Oczekiwano ${T.switchCount} przełączników, jest ${switches.length}`);
  }
  const dether = detherMs(switches);
  const detherAllOff = !switches.slice(T.flop.switches.length).some(Boolean);
  return {
    configMode: switches.every(Boolean),
    flopMs: flopMs(switches),
    detherMs: dether,
    bonusMs: detherBonusMs(dether),
    playback: playback(dether, detherAllOff),
  };
}

/** Rozbicie czasu na minuty, pełne sekundy i dziesiąte części sekundy (do formatowania tekstem). */
export function splitDuration(ms: number): { min: number; sec: number; tenths: number } {
  const totalTenths = Math.round(ms / 100);
  const min = Math.floor(totalTenths / 600);
  const rest = totalTenths - min * 600;
  return { min, sec: Math.floor(rest / 10), tenths: rest % 10 };
}
