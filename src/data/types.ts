/**
 * Typy danych katalogu. Same fakty (ceny, opcje, statusy), ZERO tekstów.
 * Teksty (nazwy, etykiety) są w słownikach języków: src/i18n/dictionaries/.
 * Dzięki temu cenę zmieniasz w jednym miejscu, a tłumacz dostaje jeden plik na język.
 */

/** Kwota w groszach (35000 = 350,00 zł). Liczby całkowite, żeby uniknąć błędów zaokrągleń. */
export type Grosze = number;

/** Przecena. Przy przecenie w Polsce trzeba pokazać najniższą cenę z 30 dni przed obniżką (Omnibus). */
export interface Promo {
  price: Grosze;
  /** Data początku 'RRRR-MM-DD' włącznie. null = od zawsze. */
  from: string | null;
  /** Data końca 'RRRR-MM-DD' włącznie. null = do odwołania. */
  to: string | null;
  /** Najniższa cena z 30 dni przed obniżką. null = jeszcze nie wpisana (build ostrzeże). */
  lowestPrice30Days: Grosze | null;
}

export interface Price {
  /** Cena regularna. null = cena jeszcze nieznana (build ostrzeże). */
  regular: Grosze | null;
  promo?: Promo;
}

export interface ConfiguratorOption {
  /** Stały identyfikator opcji. Etykieta jest w słowniku pod tym kluczem. */
  id: string;
  /** Jeśli wybór tej opcji kosztuje, cena (za sztukę) dodaje się do sumy. */
  price?: Price;
}

export interface ConfiguratorStep {
  /** Stały identyfikator kroku. Etykieta jest w słowniku pod tym kluczem. */
  id: string;
  /** Krok widoczny tylko wtedy, gdy we wcześniejszym kroku wybrano jedną z tych opcji. */
  showIf?: { stepId: string; optionIds: string[] };
  options: ConfiguratorOption[];
}

export interface ConfiguratorDefinition {
  /** Cena bazowa za sztukę, niezależna od wyborów (np. przyciski: 40 zł / szt.). */
  basePrice?: Price;
  steps: ConfiguratorStep[];
  /** Ilość sztuk. min to MOQ (np. stateczniki: 2). */
  quantity: { min: number; max?: number };
}

export type ProductStatus = 'available' | 'coming-soon';

export interface Product {
  /** Stały identyfikator. NIE zmieniać po starcie: łączy wersje językowe i słowniki. */
  id: string;
  status: ProductStatus;
  configurator?: ConfiguratorDefinition;
  /**
   * Brakujące informacje. Build wypisuje je jako ostrzeżenia,
   * żeby nic nie zginęło. Usuń wpis, gdy dane są uzupełnione.
   */
  todo?: string[];
}

export interface Service {
  id: string;
  status: ProductStatus;
  todo?: string[];
}
