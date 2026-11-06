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
        // Strona w układzie rozdziałów jak "MacBook Pro z wyświetlaczem PROLED XDR" na apple.com.
        // Fakty z podręcznika użytkownika V3 (numer rozdziału w komentarzu), liczby z danych
        // (src/data/skytimer-1-spec.ts, physical w skytimer-1.ts). Nagłówki marketingowe: "roboczy".
        // *fraza* = biała fraza w szarym akapicie (richText).
        // \u00a0 = twarda spacja, \u2011 = twardy łącznik: te miejsca nie łamią się na dwie linie.
        units: {
          // {n} już sformatowane (np. "0,2").
          sec: '{n}\u00a0s',
          min: '{n}\u00a0min',
          minSec: '{m}\u00a0min {s}\u00a0s',
          plus: '+{value}',
          times: '{n}×',
        },
        // "Co go wyróżnia.": poziomy rząd kart. {weight}, {short}, {long} z danych.
        gallery: {
          heading: 'Co go wyróżnia.',
          prev: 'Poprzednie wyróżnienie',
          next: 'Następne wyróżnienie',
          dot: 'Wyróżnienie {n} z\u00a0{total}',
          items: {
            dip: {
              text: '*Dziesięć przełączników.* Czasy flop i\u00a0dether ustawiasz palcem, bez komputera.',
              alt: 'Zbliżenie na rząd dziesięciu przełączników DIP z\u00a0napisem ON',
            },
            connector: {
              text: '*Jedno złącze 2\u00a0×\u00a07.* Zasilanie, serwo, RDT, start, buzzer i\u00a0LED w\u00a0jednym miejscu.',
              alt: 'Płytka SkyTimer 1 pod kątem: kątowe złącze 2 × 7 ze złoconymi pinami',
            },
            // Rozdz. 14.
            playback: {
              text: '*Słyszysz, co ustawiłeś.* Przed każdym lotem timer zagra ustawiony czas dether.',
              // Grafika: przykład 2 min 15 s. {time} = suma.
              total: '= {time}',
            },
            size: {
              text: '*{weight}\u00a0g.* Płytka {short}\u00a0×\u00a0{long}\u00a0mm do ciasnej wieży F1E.',
              alt: 'Płytka SkyTimer 1 widziana z góry',
            },
          },
        },
        // Rozdział "Konstrukcja": nagłówek nad obrotem 360° (teksty obrotu niżej, w closer).
        design: {
          eyebrow: 'Konstrukcja',
          // Rozdz. 1.
          intro:
            'SkyTimer 1 to *elektroniczny timer do szybowców F1E*. Steruje flopem i\u00a0detherem z\u00a0wysoką precyzją, a\u00a0mieści się na płytce *{short}\u00a0×\u00a0{long}\u00a0mm* o\u00a0masie *{weight}\u00a0g*.',
        },
        // Rozdział "Ustawianie czasów" (rozdz. 12-15) z symulatorem przełączników.
        timing: {
          eyebrow: 'Ustawianie czasów',
          heading: 'Dziesięć przełączników. Zero kabli.', // roboczy
          intro:
            'Przełączniki *1\u20114 ustawiają czas flop*, a\u00a0*5\u201110 czas dether*. Każdy dodaje swoją wartość, więc czas to po prostu suma. Spróbuj sam.',
          sim: {
            label: 'Symulator przełączników SkyTimer 1',
            switchesLabel: 'Przełączniki czasów',
            // Czytnik ekranu: "Przełącznik 5, 15 s".
            switch: 'Przełącznik {n}, {value}',
            on: 'ON',
            flopGroup: 'Flop',
            detherGroup: 'Dether',
            flop: 'Czas flop',
            flopOff: 'Wyłączony',
            flopOffNote: 'Przełączniki 1\u20114 na OFF',
            flopNote: 'Suma przełączników + {offset}',
            dether: 'Czas dether',
            detherNote: 'Suma przełączników 5\u201110',
            total: 'Z\u00a0bonusem',
            bonus: '{bonus} doliczone automatycznie',
            noBonus: 'Poniżej 2\u00a0min bez bonusu',
            playback: 'Po włączeniu usłyszysz',
            noPlayback: 'Bez odtwarzania: wszystkie przełączniki 5\u201110 na OFF to 10\u00a0s.',
            // Opis sygnałów dla czytnika ekranu.
            signals: 'Sygnały: {long} × długi, {short} × krótki',
            legend: 'Długi = 1\u00a0min · Krótki = 15\u00a0s',
            config: 'Wszystkie na ON: po włączeniu timer wejdzie w\u00a0tryb konfiguracji.',
          },
        },
        // Rozdział "Bezpieczeństwo" (rozdz. 9, 11, 14, 17).
        safety: {
          eyebrow: 'Bezpieczeństwo',
          heading: 'Pilnuje lotu od włączenia do lądowania.', // roboczy
          intro:
            'Zanim wypuścisz model, timer *zagra ustawiony czas dether* i\u00a0*zgłosi zmienione ustawienia*. W\u00a0powietrzu *RDT* ściągnie model na sygnał radiowy, a\u00a0*AFA* uruchomi lot, gdy model poleci bez wciśniętego przycisku startu.',
          items: {
            playback: {
              title: 'Odtwarzanie czasu.',
              text: 'Po włączeniu buzzer i\u00a0LED podają czas dether: długi sygnał to minuta, krótki 15\u00a0sekund.',
            },
            warnings: {
              title: 'Ostrzeżenia.',
              text: 'Sześć szybkich sygnałów: ustawienia wróciły do fabrycznych. Krótki z\u00a0długim: zmienił się czas flop.',
            },
            rdt: {
              title: 'RDT.',
              text: 'Dether na sygnał radiowy, od razu po sekwencji startowej. Zgodny z\u00a0Aeris RDT i\u00a0MiniNeurone.',
            },
            afa: {
              title: 'AFA.',
              // {minutes}, {warning} z danych.
              text: 'Przycisk startu nie wciśnięty albo trzymany dłużej niż {minutes}? Timer sam uruchomi lot, a\u00a0{warning} wcześniej ostrzeże buzzerem.',
            },
          },
        },
        // Rozdział "Zasilanie" (rozdz. 4, 5, 16).
        power: {
          eyebrow: 'Zasilanie',
          heading: 'Zasilanie w\u00a0zestawie.',
          intro:
            'Zestaw ma *akumulator Li\u2011Pol 1S*, moduł zasilania i\u00a0*ładowarkę USB\u2011C*. Po lądowaniu timer *sam coraz rzadziej miga i\u00a0piszczy*, żeby oszczędzać energię.',
          stats: {
            battery: {
              label: 'Akumulator',
              value: '{n}\u00a0mAh',
              caption: 'Li\u2011Pol 1S w\u00a0zestawie',
            },
            charger: {
              label: 'Ładowanie',
              value: 'USB\u2011C',
              caption: 'Czerwona dioda ładuje, zielona: gotowe',
            },
            saving: { label: 'Godzinę po dether', caption: 'Rzadziej miga LED' },
          },
        },
        // Rozdział "Podłączenia" (rozdz. 3, 6-8).
        connections: {
          eyebrow: 'Podłączenia',
          heading: 'Wszystko w\u00a0jednym złączu.',
          intro:
            'Dwurzędowe *złącze 2\u00a0×\u00a07* zbiera wszystkie przewody. *Moduły buzzera i\u00a0LED* zaprojektowano do szybkiej wymiany, a\u00a0*mechanizm puszczania linek* obsługuje obie linki: flop i\u00a0dether.',
          alt: 'Płytka SkyTimer 1 od przodu: kątowe złącze 2 × 7 ze złoconymi pinami',
          // {pins} = lista numerów pinów z danych.
          pins: 'Piny {pins}',
          items: {
            power: 'Zasilanie',
            servo: 'Serwo',
            start: 'Przycisk startu',
            buzzer: 'Buzzer',
            led: 'LED',
            rdt: 'RDT',
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
              callouts: {
                mcu: { title: 'ATmega328P', text: 'Mikrokontroler' },
                connector: { title: 'Złącze 2\u00a0×\u00a07', text: 'Wszystkie podłączenia' },
                resonator: { title: 'Rezonator 4\u00a0MHz', text: 'Precyzyjne odmierzanie czasu' },
                jumpers: { title: 'Zworki JP1, JP2', text: 'Włączenie funkcji DTA' },
              },
            },
            connector: {
              label: 'Złącze',
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
