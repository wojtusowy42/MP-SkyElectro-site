/**
 * Czas jako tekst: "0,2 s", "45 s", "2 min", "2 min 15 s". Formaty jednostek ze słownika
 * (units w tekstach strony), separator dziesiętny z języka strony.
 * Działa w buildzie i w przeglądarce (symulator przełączników).
 */
import { splitDuration } from './skytimer-timing.ts';

export interface DurationUnits {
  sec: string; // '{n} s'
  min: string; // '{n} min'
  minSec: string; // '{m} min {s} s'
}

const fill = (t: string, vars: Record<string, string>) =>
  t.replace(/\{(\w+)\}/g, (m, k: string) => vars[k] ?? m);

/**
 * @param tenths true = sekundy z jedną cyfrą po przecinku (czas flop: "1,0 s").
 */
export function formatDuration(
  ms: number,
  units: DurationUnits,
  lang: string,
  tenths = false,
): string {
  const { min, sec, tenths: t } = splitDuration(ms);
  if (min === 0 || tenths) {
    const n = tenths
      ? new Intl.NumberFormat(lang, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(
          min * 60 + sec + t / 10,
        )
      : String(sec);
    return fill(units.sec, { n });
  }
  if (sec === 0) return fill(units.min, { n: String(min) });
  return fill(units.minSec, { m: String(min), s: String(sec) });
}
