/**
 * Podstawowe ustawienia całej strony. Jedno miejsce, z którego czytają
 * astro.config.mjs, layout (SEO) i strony.
 */
export const SITE = {
  /** Nazwa firmy w tytułach stron i danych dla Google. */
  name: 'MP SkyElectro',

  /**
   * Docelowy adres strony. Od niego zależą linki kanoniczne, hreflang i sitemap.
   * TODO: wpisać prawdziwą domenę, gdy będzie znana.
   */
  url: 'https://example.com',

  /**
   * Adres, na który mają przychodzić zamówienia i pytania.
   * TODO: wpisać prawdziwy adres. Dopóki jest null, strona kontaktu pokazuje brak adresu.
   */
  orderEmail: null as string | null,

  /**
   * Czy Google może indeksować stronę. Do startu false: każda strona ma noindex,
   * a robots.txt blokuje roboty, żeby wersja robocza nie wylądowała w wynikach.
   * TODO: przestawić na true w dniu startu.
   */
  indexable: false,

  /** Waluta cen w danych. Na razie wszystko w złotówkach. */
  currency: 'PLN',
} as const;
