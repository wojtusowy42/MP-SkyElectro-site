/**
 * SkyTimer 1: dane techniczne z podręcznika użytkownika V3 (FAKTY, zero tekstów).
 * Czasy liczy z nich src/lib/skytimer-timing.ts (symulator przełączników na stronie produktu).
 * Wymiary i masa: src/data/products/skytimer-1.ts (physical).
 *
 * Wszystkie czasy w MILISEKUNDACH, żeby uniknąć ułamków (0,2 s = 200 ms).
 */
export const SKYTIMER_1_TIMING = {
  /** Liczba przełączników DIP. Wszystkie na ON + włączenie zasilania = tryb konfiguracji (rozdz. 12). */
  switchCount: 10,

  /**
   * Flop (rozdz. 13): przełączniki 1-4. Czas = suma włączonych + 0,4 s.
   * Wszystkie 1-4 wyłączone = czas 0 = flop wyłączony.
   */
  flop: { switches: [200, 400, 800, 1600], offset: 400 },

  /**
   * Dether (rozdz. 13): przełączniki 5-10. Czas = suma włączonych.
   * Wszystkie 5-10 wyłączone = 10 s (wtedy bez odtwarzania czasu, rozdz. 14).
   */
  dether: {
    switches: [15_000, 30_000, 60_000, 120_000, 240_000, 480_000],
    whenAllOff: 10_000,
  },

  /**
   * Bonusowy czas dether (rozdz. 15), liczony od czasu ustawionego:
   * poniżej 2 min: 0; od 2 do 5 min (włącznie): +5 s; powyżej 5 min: +10 s.
   * Progi rosnąco: bonus z ostatniego progu, którego `from` jest spełnione.
   */
  detherBonus: [
    { from: 0, bonus: 0 },
    { from: 120_000, bonus: 5_000 },
    { from: 300_001, bonus: 10_000 },
  ],

  /** Odtwarzanie czasu dether (rozdz. 14): długi sygnał = 1 min, krótki = 15 s. */
  playback: { long: 60_000, short: 15_000 },
} as const;

/** Pozostałe dane techniczne pokazywane na stronie produktu. */
export const SKYTIMER_1_SPEC = {
  /**
   * Wyprowadzenia złącza 2 × 7 (rozdz. 3): numery pinów każdej funkcji.
   * Górny rząd 1-7, dolny 8-14.
   */
  pinout: {
    power: [1, 8],
    servo: [2, 3, 4],
    start: [5, 12],
    buzzer: [6, 13],
    led: [7, 14],
    rdt: [9, 10, 11],
  },
  /** Oszczędzanie energii (rozdz. 16): po 60 min od dether LED miga 12 razy rzadziej. */
  ledSlowdownAfterHour: 12,
  /** Akumulator w zestawie (rozdz. 4). */
  batteryMah: 250,
  /** AFA (rozdz. 11): czas do automatycznego startu i ostrzeżenie buzzerem przed nim. */
  afa: { afterMs: 120_000, warningMs: 10_000 },
} as const;
