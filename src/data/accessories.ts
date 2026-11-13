import type { ConfiguratorDefinition, ConfiguratorStep } from './types.ts';
import { skytimer1 } from './products/skytimer-1.ts';

/**
 * Akcesoria i części zamienne (pojedyncze rzeczy do SkyTimera, ładowarki itp.).
 * Ceny: "Raw Assets/01 Dokumenty/Arkusze produktów/Akcesoria.html".
 * Każde ma mały konfigurator (strona akcesorium: zdjęcie, wybory, "Włóż do torby"),
 * ten sam format co produkty, więc torba liczy je tak samo.
 * Teksty (adres, nazwa, przegląd) są w słowniku pod accessories.items.<id>.
 */
export type AccessoryCategory = 'skytimer-1' | 'wieze';

/** Kolejność kategorii na stronie Akcesoria. Teksty: accessories.categories.<id>. */
export const ACCESSORY_CATEGORIES: AccessoryCategory[] = ['skytimer-1', 'wieze'];

export interface Accessory {
  /** Stały identyfikator (łączy torbę i słowniki). Nie może być taki sam jak id produktu. */
  id: string;
  category: AccessoryCategory;
  /**
   * Nazwa elementu w zdjęciach: renders/<produkt>/{kup,akcesoria}/element-<image>[-<id opcji>].jpg.
   * Ta sama nazwa co pozycja "W zestawie" (Kit, strona Kup), więc stamtąd linkujemy tutaj.
   * Brak = brak zdjęcia (kafelek z samą nazwą).
   */
  image?: string;
  configurator: ConfiguratorDefinition;
}

// Kroki wzięte z konfiguratora SkyTimer 1: te same kolory, warianty i śruby, te same teksty.
const step = (id: string): ConfiguratorStep => {
  const found = skytimer1.configurator!.steps.find((s) => s.id === id);
  if (!found) throw new Error(`SkyTimer 1 nie ma kroku ${id}`);
  return { id, options: found.options.map(({ id, swatch }) => (swatch ? { id, swatch } : { id })) };
};

/** Cena w złotówkach, opcjonalne kroki (kolor itd.), sztuki od 1. */
const item = (
  id: string,
  category: AccessoryCategory,
  zl: number,
  image: string | undefined,
  steps: string[] = [],
): Accessory => ({
  id,
  category,
  ...(image ? { image } : {}),
  configurator: { basePrice: { regular: zl * 100 }, steps: steps.map(step), quantity: { min: 1 } },
});

export const ACCESSORIES: Accessory[] = [
  // Drukowana płytka czołowa timera (z tabelką czasów), pod każdy wariant płytki.
  item('plytka-drukowana', 'skytimer-1', 5, 'plytka', ['variant', 'color']),
  item('modul-zasilania', 'skytimer-1', 30, 'modul-zasilania', ['color']),
  item('akumulator', 'skytimer-1', 30, 'akumulator'),
  item('przycisk-startu', 'skytimer-1', 15, 'przycisk'),
  item('flasher', 'skytimer-1', 30, 'led'),
  item('buzzer', 'skytimer-1', 20, 'buzzer', ['color']),
  item('zwalniacz-linek', 'skytimer-1', 60, 'mechanizm', ['color']),
  item('ladowarka', 'skytimer-1', 15, 'ladowarka'),
  item('zestaw-srubek', 'skytimer-1', 10, 'sruby', ['screws']),
  item('szablony', 'skytimer-1', 5, 'szablony'),
  item('podrecznik', 'skytimer-1', 10, 'podrecznik'),
  item('zestaw-gps', 'wieze', 50, undefined),
];

/** Akcesorium, które jest daną pozycją zestawu (nazwa elementu z Kit / strony Kup). */
export const accessoryForKitItem = (image: string) => ACCESSORIES.find((a) => a.image === image);

/**
 * Akcesoria polecane w oknie "Dodano do torby", w kolejności ważności. Klucz: id produktu albo kategoria akcesoriów.
 * SkyTimer 1 (zestaw ma już wszystko, więc tylko to, co realnie się dokupuje):
 *   akumulator: zapas na cały dzień lotów,
 *   moduł zasilania: do drugiego modelu (timer przekładasz, włącznik z przewodami zostaje w wieżyczce),
 *   śrubki: M2 łatwo zgubić w trawie,
 *   ładowarka: rezerwowa pozycja, gdy klient wkłada do torby jedną z powyższych.
 * Przyciski i stateczniki: nic. Przycisk pojemnościowy wymaga zmodyfikowanego modułu zasilania, a w akcesoriach jest zwykły.
 */
const RECOMMENDED: Record<string, string[]> = {
  'skytimer-1': ['akumulator', 'modul-zasilania', 'zestaw-srubek', 'ladowarka'],
};

/** Do trzech akcesoriów pasujących do właśnie dodanej pozycji (bez niej samej). */
export function recommendedFor(id: string): Accessory[] {
  const key = ACCESSORIES.find((a) => a.id === id)?.category ?? id;
  return (RECOMMENDED[key] ?? [])
    .filter((a) => a !== id)
    .slice(0, 3)
    .map((a) => {
      const found = ACCESSORIES.find((x) => x.id === a);
      if (!found) throw new Error(`Polecane akcesorium ${a} nie istnieje`);
      return found;
    });
}
