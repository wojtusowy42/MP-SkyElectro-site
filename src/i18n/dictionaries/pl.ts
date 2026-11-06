/**
 * Wszystkie teksty strony po polsku. To jest WZÓR dla pozostałych języków:
 * każdy inny słownik musi mieć dokładnie te same klucze (pilnuje tego TypeScript).
 *
 * Klucze w products/steps/options odpowiadają identyfikatorom w src/data/.
 * slug = fragment adresu strony w tym języku (/pl/<slug>/).
 *
 * Teksty oznaczone "roboczy" to robocze sformułowania, do podmiany na finalne.
 */
export const pl = {
  site: {
    // roboczy
    description: 'MP SkyElectro: elektronika i osprzęt do modeli szybowców, m.in. klasy F1E.',
  },

  common: {
    priceOnRequest: 'Cena do ustalenia', // roboczy
    comingSoon: 'Wkrótce', // roboczy
    perPiece: 'za szt.',
    minOrder: 'Minimalne zamówienie: {n} szt.',
    regularPrice: 'Cena regularna',
    lowestPrice30Days: 'Najniższa cena z 30 dni przed obniżką: {price}',
    availableNow: 'Dostępny teraz.', // roboczy
    learnMore: 'Dowiedz się więcej',
    order: 'Zamów',
  },

  pages: {
    home: {
      title: 'MP SkyElectro',
      hero: {
        tagline: 'Każda sekunda lotu pod kontrolą.', // roboczy
        imageAlt: 'Czerwona płytka SkyTimer 1 z rzędem przełączników DIP',
      },
    },
    configurator: {
      // /pl/<produkt>/konfigurator/
      slug: 'konfigurator',
      title: 'Konfigurator {product}',
      heading: 'Zamów {product}',
      priceFrom: 'Od {price}',
      summary: 'Podsumowanie.',
      summaryHint: 'Twój wybór.',
      quantity: 'Ilość',
      decrease: 'Mniej',
      increase: 'Więcej',
      total: 'Razem',
      chooseFirst: 'Najpierw wybierz poprzednie opcje.',
      selectedOption: '{step}: {option}',
      galleryPrev: 'Poprzednie zdjęcie',
      galleryNext: 'Następne zdjęcie',
      galleryDot: 'Zdjęcie {n} z {total}',
    },
    accessories: {
      slug: 'akcesoria',
      name: 'Akcesoria / części zamienne', // nazwa do ustalenia
      navName: 'Akcesoria', // krótka nazwa w menu
      empty: 'Brak pozycji.', // roboczy
    },
    services: {
      slug: 'uslugi',
      name: 'Dodatkowe usługi',
      navName: 'Usługi',
    },
    contact: {
      slug: 'kontakt',
      name: 'Kontakt',
      noEmail: 'Adres e-mail zostanie podany wkrótce.', // roboczy
    },
  },

  products: {
    'skytimer-1': {
      slug: 'skytimer-1',
      name: 'SkyTimer 1',
      // Opisy zdjęć w konfiguratorze (dla czytników ekranu i Google). Klucz = nazwa pliku.
      images: {
        pcb: 'Płytka SkyTimer 1 z przodu, z rzędem dziesięciu przełączników DIP',
        'pcb-top': 'Płytka SkyTimer 1 widziana z góry',
        'pcb-back': 'Tył płytki SkyTimer 1 ze złączem i elektroniką',
        'pcb-detail-dip': 'Zbliżenie na przełączniki DIP od 1 do 10',
      },
      // Strona "Dowiedz się więcej"
      story: {
        tagline: 'Każda sekunda lotu pod kontrolą.', // roboczy
        introDescription:
          'Animacja: elementy płytki SkyTimer 1 zjeżdżają się w powietrzu i składają w gotową płytkę.',
        // Siatka "Poznaj SkyTimer 1" (układ jak "Poznaj MacBooka Pro" na apple.com).
        // Fakty z podręcznika użytkownika V3, chyba że oznaczone "roboczy".
        // \u00a0 = twarda spacja, \u2011 = twardy łącznik: te miejsca nie łamią się na dwie linie.
        highlights: {
          heading: 'Poznaj SkyTimer 1.',
          dip: {
            title: 'Dziesięć przełączników. Wszystko pod palcem.',
            text: 'Czas flop, czas dether i ustawienia timera.',
            alt: 'Zbliżenie na rząd dziesięciu przełączników DIP z napisem ON',
            // Liczby pod zdjęciem: przełączniki 1-4 = flop (0,2 / 0,4 / 0,8 / 1,6 s),
            // 5-10 = dether (15 s ... 8 min, razem 15 min 45 s).
            stats: [
              { value: '0,2\u00a0s', label: 'Krok czasu flop.' },
              { value: '15\u00a0s', label: 'Krok czasu dether.' },
              { value: '15\u00a0min 45\u00a0s', label: 'Najdłuższy czas dether.' },
            ],
          },
          connector: {
            title: 'Jedno złącze. Wszystko w\u00a0jednym miejscu.',
            text: 'Zasilanie, serwo, RDT, przycisk startu, buzzer i LED na jednym złączu 2\u00a0×\u00a07.',
            alt: 'Płytka SkyTimer 1 z kątowym złączem 2 × 7 i złoconymi pinami',
          },
          power: {
            value: '250\u00a0mAh',
            title: 'Bardzo niskie zużycie energii.',
            text: 'Akumulator Li\u2011Pol w zestawie. Ładowanie przez USB\u2011C.',
          },
          // Odtwarzanie czasu dether (podręcznik, rozdz. 14): długi sygnał = minuta, krótki = 15 s.
          playback: {
            title: 'Słyszysz, co ustawiłeś.',
            text: 'Po włączeniu timer zagra czas dether. Dwa długie i\u00a0krótki sygnał to\u00a02\u00a0min\u00a015\u00a0s.',
          },
          safety: {
            title: 'Wbudowane zabezpieczenia.',
            text: 'RDT, Anti Fly Away i ostrzeżenia przy starcie. Zgodny z Aeris RDT i MiniNeurone.',
            alt: 'Płytka SkyTimer 1 z góry: mikrokontroler, złącze i zworki JP1, JP2',
          },
          size: {
            title: 'Mały. Naprawdę mały.',
            text: 'Zaprojektowany do ciasnej wieży modelu F1E.', // roboczy: wymiary
            alt: 'Płytka SkyTimer 1 pod kątem, ze złączem i elektroniką',
          },
        },
        // "Przyjrzyj się bliżej": płytka obracana o 360° (przeciąganie, przyciski widoków).
        closer: {
          heading: 'Przyjrzyj się bliżej.',
          hint: 'Przeciągnij, aby obrócić.',
          stageLabel: 'Płytka SkyTimer 1 w obrocie',
          // Czytnik ekranu: suwak obrotu. {deg} = kąt, {view} = nazwa najbliższego widoku.
          valueText: 'Obrót {deg}°, widok: {view}',
          viewsLabel: 'Widoki płytki',
          views: {
            // callouts = opisy z kreskami rysowane, gdy płytka zatrzyma się na widoku.
            electronics: {
              label: 'Elektronika',
              caption: 'Mikrokontroler ATmega328P i zworki JP1, JP2 do funkcji DTA.',
              callouts: {
                mcu: { title: 'ATmega328P', text: 'Mikrokontroler' },
                connector: { title: 'Złącze 2\u00a0×\u00a07', text: 'Wszystkie podłączenia' },
                resonator: { title: 'Rezonator 4\u00a0MHz', text: 'Precyzyjne odmierzanie czasu' },
                jumpers: { title: 'Zworki JP1, JP2', text: 'Włączenie funkcji DTA' },
              },
            },
            connector: {
              label: 'Złącze',
              caption: 'Kątowe złącze 2\u00a0×\u00a07: wszystkie podłączenia w jednym miejscu.',
              callouts: {
                pins: { title: 'Piny kątowe', text: 'Przewody podłączasz z boku' },
                header: {
                  title: 'Złącze 2\u00a0×\u00a07',
                  text: 'Zasilanie, serwo, RDT, start, buzzer, LED',
                },
              },
            },
            switches: {
              label: 'Przełączniki',
              caption: 'Dziesięć przełączników DIP: czasy flop, dether i ustawienia.',
              callouts: {
                on: { title: 'Wszystkie na ON', text: 'Tryb konfiguracji' },
                flop: { title: 'Przełączniki 1-4', text: 'Czas flop, co 0,2\u00a0s' },
                dether: {
                  title: 'Przełączniki 5-10',
                  text: 'Czas dether, do 15\u00a0min 45\u00a0s',
                },
              },
            },
          },
        },
        // Pasek produktu przyklejony u góry strony (opis dla czytników ekranu).
        localNavLabel: 'SkyTimer 1: nawigacja produktu',
      },
      steps: {
        type: {
          heading: 'Wersja.',
          label: 'Zestaw czy sama płytka.',
          options: { kit: 'Zestaw pełny', pcb: 'Sama płytka (PCB only)' },
        },
        variant: {
          heading: 'Wariant.',
          label: 'Wybierz wariant płytki.',
          options: { v1: 'Wariant 1', v2: 'Wariant 2', v3: 'Wariant 3' },
        },
        color: {
          heading: 'Kolor.',
          label: 'Wybierz kolor.',
          options: { red: 'Czerwony' },
        },
      },
    },
    wieze: {
      slug: 'wieze-drukowane',
      name: 'Wieże drukowane',
      steps: {
        type: {
          label: 'Wieżyczka pusta czy z timerem SkyTimer 1',
          options: { empty: 'Pusta', 'with-timer': 'Z timerem SkyTimer 1' },
        },
        timerFor: {
          label: 'Dla jakiego timera',
          options: { 'skytimer-1': 'Dla SkyTimer 1', other: 'Dla innego timera' },
        },
      },
    },
    'przyciski-pojemnosciowe': {
      slug: 'przyciski-pojemnosciowe',
      name: 'Przyciski pojemnościowe',
      steps: {
        diameter: {
          label: 'Średnica',
          options: { d12: '12 mm', d16: '16 mm', d20: '20 mm' },
        },
      },
    },
    stateczniki: {
      slug: 'stateczniki',
      name: 'Stateczniki',
      steps: {
        chord: {
          label: 'Cięciwa',
          options: { c130: '130 mm', c150: '150 mm' },
        },
        width: {
          label: 'Szerokość',
          options: { w600: '600 mm', w750: '750 mm' },
        },
        covering: {
          label: 'Pokrycie',
          options: { uncovered: 'Niepokryty', covered: 'Pokryty' },
        },
      },
      mountingNote: 'W sprawie mocowania prosimy o kontakt, ponieważ potrzebny będzie rysunek.', // roboczy
    },
    'rury-kadlubowe': {
      slug: 'rury-kadlubowe',
      name: 'Rury kadłubowe',
    },
    'elektroniczne-sterowanie': {
      slug: 'elektroniczne-sterowanie',
      name: 'Elektroniczne sterowanie',
    },
    'skrzydla-weglowe': {
      slug: 'skrzydla-weglowe',
      name: 'Skrzydła węglowe',
    },
  },

  services: {
    'druk-3d': 'Druk 3D',
    projektowanie: 'Projektowanie',
    laser: 'Laser',
    frezowanie: 'Frezowanie',
  },

  accessories: {
    // Nazwy akcesoriów: klucz = id z src/data/accessories.ts
    items: {} as Record<string, string>,
  },
};

/** Kształt słownika. Każdy inny język musi go spełniać w 100%. */
export type Dictionary = typeof pl;
