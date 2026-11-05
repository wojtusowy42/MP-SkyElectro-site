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
          brain: {
            title: 'Sprawdzony mózg.',
            text: 'Mikrokontroler ATmega328P, rezonator 4\u00a0MHz.',
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
        // "Jak to działa": jeden duży blok tekstu (wzór: akapity na stronach iPhone'a).
        // Części: [tekst, wyróżnione?]. Fakty z podręcznika (rozdz. 9, 11, 13, 14).
        how: {
          heading: 'Jak to działa.',
          parts: [
            ['Ustaw czasy flop i dether ', false],
            ['dziesięcioma przełącznikami.', true],
            [' ', false],
            ['Naciśnij start.', true],
            [
              ' SkyTimer zwolni linkę flop, a po czasie dether sprowadzi model w dół. Wcześniej zrobisz to zdalnie przez ',
              false,
            ],
            ['RDT', true],
            [', a ', false],
            ['Anti Fly Away', true],
            [' nie pozwoli modelowi uciec.', false],
          ] as [string, boolean][],
        },
        // "Bezpieczeństwo": zdjęcie + 4 funkcje (podręcznik: rozdz. 9, 11, 14, 17).
        safety: {
          eyebrow: 'Bezpieczeństwo.',
          heading: 'Zrobiony, żeby model wrócił.', // roboczy
          imageAlt: 'Płytka SkyTimer 1 pod kątem, złocone piny złącza',
          items: [
            {
              title: 'Anti Fly Away',
              text: 'Gdy model poleci bez naciśnięcia startu, timer sam uruchomi sekwencję lotu po 2\u00a0minutach. 10\u00a0s wcześniej ostrzeże ciągłym tonem.',
            },
            {
              title: 'Radio dether',
              text: 'Po sekwencji startowej RDT reaguje natychmiast po odebraniu sygnału. Zgodny z Aeris RDT i MiniNeurone.',
            },
            {
              title: 'Odtwarzanie czasu dether',
              text: 'Po włączeniu timer zagra ustawiony czas: długi sygnał to minuta, krótki to 15\u00a0sekund.',
            },
            {
              title: 'Ostrzeżenia przy starcie',
              text: 'Sześć szybkich sygnałów: ustawienia uszkodzone, wczytane fabryczne. Krótki i długi: czas flop zmienił się od ostatniego włączenia.',
            },
          ],
        },
        // "Konfiguracja": 8 ustawień z trybu konfiguracji (podręcznik: rozdz. 12).
        settings: {
          eyebrow: 'Konfiguracja.',
          heading: 'Ustawienia bez komputera.',
          text: 'Wszystkie przełączniki na ON i włączenie zasilania: timer odpowie „prg” alfabetem Morse’a. Opcje ustawiasz tymi samymi przełącznikami, a zapisujesz przyciskiem startu.',
          imageAlt: 'Przełączniki DIP SkyTimer 1 widziane pod kątem',
          switchLabel: 'Przełącznik',
          items: [
            { switches: '1', title: 'RDT', text: 'Włączone albo wyłączone' },
            { switches: '2', title: 'DTA', text: '+15\u00a0s za impuls, maks. 60\u00a0s' },
            { switches: '3-4', title: 'Melodia buzzera', text: 'Cztery do wyboru' },
            { switches: '5', title: 'LED', text: 'Jak buzzer albo dwa błyski' },
            {
              switches: '6',
              title: 'Częstotliwość sygnału',
              text: 'Co 2,5\u00a0s albo co 5\u00a0s',
            },
            { switches: '7', title: 'Kierunek serwa', text: 'Normalny albo rewers' },
            { switches: '8', title: 'Wychylenie serwa', text: 'Małe albo duże' },
            {
              switches: '9-10',
              title: 'Anti Fly Away',
              text: 'Osobno dla przycisku wciśniętego i puszczonego',
            },
          ],
        },
        // "Detale": liczby (podręcznik: rozdz. 15, 16, 21, 2).
        details: {
          eyebrow: 'Detale.',
          heading: 'Przemyślany do ostatniej sekundy.', // roboczy
          items: [
            {
              value: '+10\u00a0s',
              text: 'Bonus do czasu dether powyżej 5\u00a0minut, +5\u00a0s od 2 do 5\u00a0minut. Timer sam wyrównuje niedokładność elektroniki.',
            },
            {
              value: '12×',
              text: 'Rzadziej miga LED godzinę po dether, buzzer 2 razy rzadziej. Tak timer oszczędza energię po lądowaniu.',
            },
            {
              value: '16\u00a0mm',
              text: 'Tyle głębokości wystarczy na komorę płytki w wieżyczce.',
            },
            {
              value: '3',
              text: 'Warianty płytki. Wariant 2 ma gniazdo przycisku startu prosto na płytce.',
            },
          ],
        },
        // "Dane techniczne" (podręcznik; mikrokontroler i rezonator z modelu płytki).
        specs: {
          heading: 'Dane techniczne.',
          manual: 'Podręcznik użytkownika (PDF, 0,9\u00a0MB)',
          rows: [
            ['Mikrokontroler', 'ATmega328P, rezonator 4\u00a0MHz'],
            ['Zasilanie', 'Akumulator Li\u2011Pol 1S 250\u00a0mAh przez moduł zasilania'],
            ['Ładowanie', 'USB\u2011C, przy wyłączonym timerze'],
            ['Czas flop', 'Przełączniki 1-4: 0,2 / 0,4 / 0,8 / 1,6\u00a0s, plus 0,4\u00a0s'],
            [
              'Czas dether',
              'Przełączniki 5-10: od 10\u00a0s do 15\u00a0min 45\u00a0s, co 15\u00a0s',
            ],
            ['Bonus dether', '+5\u00a0s od 2 do 5\u00a0min, +10\u00a0s powyżej 5\u00a0min'],
            ['RDT', 'Aeris RDT (FF Electronics), MiniNeurone (Flying Neurons)'],
            ['DTA', '+15\u00a0s za impuls, maks. 4 razy; zworki JP1, JP2; funkcja na przyszłość'],
            ['Anti Fly Away', 'Po 2\u00a0min, ostrzeżenie 10\u00a0s wcześniej'],
            ['Sygnalizacja', 'Buzzer (4 melodie) i LED, co 2,5\u00a0s lub 5\u00a0s'],
            ['Serwo', 'Kierunek normalny lub rewers, wychylenie małe lub duże'],
            ['Złącze', '2\u00a0×\u00a07: zasilanie, serwo, RDT, start, buzzer, LED'],
            ['Montaż', 'Śruby M2, komora w wieżyczce od 16\u00a0mm'],
            ['Warianty płytki', '1, 2, 3 (wariant 2 z gniazdem przycisku startu)'],
          ] as [string, string][],
        },
        // "W zestawie". Pozycje oznaczone "roboczy" wynikają z podręcznika pośrednio: do potwierdzenia.
        inBox: {
          heading: 'W zestawie.',
          lead: 'Wszystko, czego potrzebujesz do montażu w wieżyczce.',
          items: {
            board: { title: 'Płytka SkyTimer 1', text: 'W wybranym wariancie' },
            battery: { title: 'Akumulator Li\u2011Pol', text: '1S, 250\u00a0mAh' },
            power: { title: 'Moduł zasilania', text: 'Z czerwonym i czarnym złączem' }, // roboczy
            charger: {
              title: 'Ładowarka USB\u2011C',
              text: 'Dioda: czerwona ładuje, zielona gotowe',
            },
            buzzer: { title: 'Moduł buzzera', text: 'Wsuwany, do szybkiej wymiany' },
            led: { title: 'Moduł LED', text: 'Wystaje 5\u00a0mm ponad wieżyczkę' },
            release: { title: 'Mechanizm puszczania linek', text: 'Flop i dether' }, // roboczy
            mount: { title: 'Mocowanie przycisku startu', text: 'Do płytek wariantu 1 i 3' },
            screws: { title: 'Śruby M2', text: 'M2 × 4, M2 × 6, M2 × 10' },
          },
        },
        // "Który SkyTimer dla Ciebie?": porównanie zestawu i samej płytki (koniec strony).
        compare: {
          heading: 'Który SkyTimer 1 dla Ciebie?',
          orderLabel: 'Zamów {option}',
          features: {
            board: 'Płytka SkyTimer 1',
            variant: 'Wybór wariantu płytki',
            battery: 'Akumulator i ładowarka USB\u2011C',
            modules: 'Moduły buzzera i LED',
            mounting: 'Śruby i mocowanie przycisku startu',
          },
          notIncluded: 'Brak',
        },
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
