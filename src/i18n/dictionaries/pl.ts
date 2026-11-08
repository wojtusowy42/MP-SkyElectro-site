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
    buy: 'Kup',
  },

  // Górny pasek menu (pozycje: src/lib/navigation.ts, krótkie nazwy: navName).
  nav: {
    label: 'Menu główne',
    bag: 'Torba',
    bagCount: 'Torba, liczba produktów: {n}',
  },

  pages: {
    home: {
      title: 'MP SkyElectro',
      hero: {
        tagline: 'Każda sekunda lotu pod kontrolą.',
        imageAlt: 'Czerwona płytka SkyTimer 1 z rzędem przełączników DIP',
      },
    },
    configurator: {
      // /pl/<produkt>/kup/
      slug: 'kup',
      title: 'Kup {product}',
      heading: 'Kup {product}',
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
      addToBag: 'Włóż do torby',
      addedToBag: 'Dodano do torby.',
      viewBag: 'Zobacz torbę',
      // Sekcja pod konfiguratorem (zdjęcia: src/assets/renders/skytimer-1/kup/element-*).
      kitHeading: 'Co jest w\u00a0zestawie.',
      // Podpisy kafelków po wyborze (zamiast ogólnych "wybranego wariantu", "cynk lub czernione").
      kitTimer: 'Timer SkyTimer\u00a01',
      kitTimerColor: 'kolor {color}',
      kitScrews: 'Komplet śrub M2 ({screws}) i\u00a0wkrętów',
      kitIntro:
        'Wszystko, czego potrzebujesz do jednej wieżyczki. Części drukowane w\u00a0wybranym kolorze.',
      // Na dole strony Kup. Roboczy: do sprawdzenia z regulaminem sklepu (koszt i czas wysyłki nieustalone).
      delivery: {
        heading: 'Dostawa i zwroty.',
        items: [
          {
            title: 'Wysyłka',
            text: 'Koszt i termin wysyłki potwierdzimy w odpowiedzi na zamówienie. Płacisz dopiero po potwierdzeniu.',
          },
          {
            title: 'Zwrot w 14 dni',
            text: 'Możesz odstąpić od umowy w ciągu 14 dni od otrzymania paczki, bez podawania przyczyny.',
          },
          {
            title: 'Reklamacje',
            text: 'Odpowiadamy za zgodność produktu z umową przez 2 lata od dostawy. Napisz do nas, a pomożemy.',
          },
        ],
      },
      // Krótkie opisy pod nazwą opcji: produkt → krok → opcja.
      optionHints: {
        'skytimer-1': {
          variant: {
            v1: 'Włącznik i\u00a0port obok przełączników, przycisk startu osobno.',
            v2: 'Dłuższa, z\u00a0wbudowanym przyciskiem startu.',
            v3: 'Włącznik i\u00a0port pod przełącznikami, przycisk startu osobno.',
          },
          screws: {
            zinc: 'Srebrne, zwykła stal ocynkowana.',
            blackened: 'Czarne śruby M2. Wkręty 2,2\u00a0×\u00a09,5 zawsze ocynkowane.',
          },
        },
      } as Record<string, Record<string, Record<string, string>>>,
    },
    // Torba: /pl/torba/ (bez płatności: z torby wychodzi zamówienie mailem).
    bag: {
      slug: 'torba',
      title: 'Torba',
      heading: 'Twoja torba.',
      empty: 'Twoja torba jest pusta.',
      continue: 'Kontynuuj zakupy',
      remove: 'Usuń',
      edit: 'Zmień',
      total: 'Razem',
      orderButton: 'Zamów mailem',
      orderNote:
        'Otworzy się Twoja poczta z gotową wiadomością. Odpiszemy z potwierdzeniem i danymi do płatności.', // roboczy
      orderSubject: 'Zamówienie MP SkyElectro',
      orderIntro: 'Dzień dobry, chcę zamówić:',
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
      phone: 'Telefon',
    },
  },

  products: {
    'skytimer-1': {
      slug: 'skytimer-1',
      name: 'SkyTimer 1',
      // Opisy zdjęć w konfiguratorze (dla czytników ekranu i Google). Klucz = nazwa pliku.
      images: {
        zestaw:
          'Zestaw SkyTimer 1: płytka wybranego wariantu z szablonem, moduły LED i buzzera, ładowarka, akumulator, mechanizm puszczania linek i szablon serwa',
        warianty: 'Trzy warianty płytki SkyTimer 1 obok siebie',
        'element-sruby': 'Komplet śrub M2 i\u00a0wkrętów',
        wariant: 'SkyTimer 1 w obudowie, widok z przodu',
        pcb: 'Płytka SkyTimer 1 z przodu, z rzędem dziesięciu przełączników DIP',
        'pcb-top': 'Płytka SkyTimer 1 widziana z góry',
        'pcb-back': 'Tył płytki SkyTimer 1 ze złączem i elektroniką',
        'pcb-detail-dip': 'Zbliżenie na przełączniki DIP od 1 do 10',
      },
      // Strona "Dowiedz się więcej"
      story: {
        tagline: 'Każda sekunda lotu pod kontrolą.',
        introDescription:
          'Animacja: elementy płytki SkyTimer 1 zjeżdżają się w powietrzu i składają w gotową płytkę.',
        // Strona w układzie rozdziałów jak "MacBook Pro z wyświetlaczem PROLED XDR" na apple.com.
        // Fakty z podręcznika użytkownika V3 (numer rozdziału w komentarzu), liczby z danych
        // (src/data/skytimer-1-spec.ts, physical w skytimer-1.ts). Nagłówki zatwierdzone (2026-11-08).
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
              text: '*{weight}\u00a0g.* Płytka {short}\u00a0×\u00a0{long}\u00a0mm do ciasnej wieżyczki F1E.',
              alt: 'Płytka SkyTimer 1 widziana z góry',
            },
          },
        },
        // Rozdział "Konstrukcja": nagłówek nad obrotem 360° (teksty obrotu niżej, w closer).
        design: {
          eyebrow: 'Konstrukcja',
          // Rozdz. 1.
          intro:
            'SkyTimer 1 to *elektroniczny timer do szybowców F1E*. Steruje flopem i\u00a0detherem, a\u00a0mieści się na płytce {short}\u00a0×\u00a0{long}\u00a0mm o\u00a0masie {weight}\u00a0g.',
        },
        // Rozdział "Ustawianie czasów" (rozdz. 12-15) z symulatorem przełączników.
        timing: {
          eyebrow: 'Ustawianie czasów',
          heading: 'Dziesięć przełączników. Zero kabli.',
          intro:
            'Przełączniki 1\u20114 ustawiają czas flop, a\u00a05\u201110 czas dether. *Czas to po prostu suma.* Spróbuj sam.',
          sim: {
            label: 'Symulator przełączników SkyTimer 1',
            switchesLabel: 'Przełączniki czasów',
            hint: 'Kliknij przełącznik na płytce.',
            imageAlt: 'Płytka SkyTimer 1 z góry: rząd dziesięciu przełączników DIP',
            // Czytnik ekranu: "Przełącznik 5, 15 s".
            switch: 'Przełącznik {n}, {value}',
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
          heading: 'Pilnuje lotu od włączenia do lądowania.',
          intro:
            'Zanim wypuścisz model, timer zagra ustawiony czas i\u00a0zgłosi zmienione ustawienia. *W\u00a0powietrzu pilnują go RDT i\u00a0AFA.*',
          items: {
            playback: {
              title: 'Odtwarzanie czasu.',
              text: 'Po włączeniu buzzer i\u00a0LED podają czas dether: długi sygnał to minuta, krótki 15\u00a0sekund.',
            },
            warnings: {
              title: 'Ostrzeżenia.',
              text: 'Sześć szybkich sygnałów: zapisane ustawienia są nieprawidłowe, więc timer wczytał fabryczne. Krótki z\u00a0długim: zmienił się czas flop.',
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
        // Rozdział "Montaż" (rozdz. 2, 18-23): czy zmieszczę go w swojej wieżyczce.
        mounting: {
          eyebrow: 'Montaż',
          heading: 'Pasuje do Twojej wieżyczki.',
          intro: 'Trzy warianty płytki, w\u00a0każdym *ten sam timer*. Wybierasz układ, który pasuje do Twojej wieżyczki.',
          variantsAlt:
            'Trzy warianty płytki: wariant 1 z włącznikiem obok przełączników, wydłużony wariant 2 z przyciskiem startu i wariant 3 z włącznikiem pod przełącznikami',
          variants: {
            v1: {
              name: 'Wariant 1',
              text: 'Włącznik i\u00a0port ładowania obok przełączników. Przycisk startu osobno.',
            },
            v2: {
              name: 'Wariant 2',
              text: 'Dłuższa płytka z\u00a0przyciskiem startu u\u00a0góry. Włącznik i\u00a0port pod przełącznikami.',
            },
            v3: {
              name: 'Wariant 3',
              text: 'Włącznik i\u00a0port ładowania pod przełącznikami. Przycisk startu osobno.',
            },
          },
          inCaseHeading: 'Płytka w\u00a0obudowie.',
          inCaseText:
            'W\u00a0środku ta sama płytka, którą możesz kupić osobno. Obudowa z\u00a0druku 3D ją osłania i\u00a0mocuje w\u00a0wieżyczce.',
          inCaseAlt:
            'Spód obudowy wariantu 2 z\u00a0zamontowaną czerwoną płytką SkyTimer 1 i\u00a0modułem zasilania',
        },
        // Rozdział "W zestawie" (rozdz. 2, 4-8, 18-25): nazwa i jedno krótkie zdanie (note).
        // Nazwy (name) pokazuje też strona Kup (kafelki zestawu), notes tylko ta strona.
        // Kolejność = kafelki zestawu na stronie Kup (KIT_TILES w [configurator].astro).
        kit: {
          eyebrow: 'W\u00a0zestawie',
          heading: 'Wszystko do jednej wieżyczki.',
          intro: 'Komplet do zamontowania i\u00a0latania. *Sama płytka też jest dostępna.*',
          alt: 'Elementy zestawu SkyTimer 1 rozłożone obok siebie na czarnym tle',
          listLabel: 'Co jest w\u00a0zestawie',
          // {mah} z danych.
          items: [
            { name: 'Timer SkyTimer\u00a01 na płytce wybranego wariantu', note: '' },
            { name: 'Akumulator Li\u2011Pol 1S {mah}\u00a0mAh', note: '' },
            { name: 'Moduł zasilania', note: '' },
            { name: 'Ładowarka USB\u2011C', note: 'Czerwona dioda ładuje, zielona: gotowe' },
            { name: 'Moduł buzzera', note: 'Wysuwasz go z\u00a0bazy do wymiany' },
            { name: 'Moduł LED', note: 'Wystaje 5\u00a0mm ponad wieżyczkę' },
            { name: 'Mechanizm puszczania linek', note: 'Dwie linki: flop i\u00a0dether' },
            { name: 'Przycisk startu', note: '12\u00a0×\u00a012\u00a0mm' },
            { name: 'Komplet śrub M2 i\u00a0wkrętów', note: 'Cynk lub czernione' },
            { name: 'Szablony montażowe', note: 'Na każdy wariant i\u00a0na serwo' },
            { name: 'Podręcznik użytkownika', note: 'Także do pobrania jako PDF' },
          ],
        },
        // Rozdział "Dane techniczne". Wartości liczone z danych, stałe fakty z podręcznika V3.
        specs: {
          eyebrow: 'Dane techniczne',
          heading: 'Wszystko w\u00a0liczbach.',
          groups: {
            size: 'Wymiary i\u00a0masa',
            timing: 'Czasy',
            power: 'Zasilanie',
            safety: 'Bezpieczeństwo',
            electronics: 'Elektronika',
          },
          rows: {
            size: { label: 'Wymiary płytki timera', value: '{short}\u00a0×\u00a0{long}\u00a0mm' },
            weight: { label: 'Masa płytki timera', value: '{weight}\u00a0g' },
            kitWeight: { label: 'Masa zestawu', value: 'około {weight}\u00a0g' },
            flop: { label: 'Czas flop', value: '{min}\u2013{max}, co {step}, lub wyłączony' },
            dether: { label: 'Czas dether', value: '{off} lub {min}\u2013{max}, co {step}' },
            bonus: {
              label: 'Bonus dether',
              value: '{mid} od 2 do 5\u00a0min, {high} powyżej 5\u00a0min',
            },
            battery: { label: 'Akumulator', value: 'Li\u2011Pol 1S, {mah}\u00a0mAh' },
            charging: { label: 'Ładowanie', value: 'USB\u2011C, tylko przy wyłączonym timerze' },
            saving: { label: 'Oszczędzanie energii', value: 'Godzinę po dether LED miga {n}× rzadziej' },
            connector: { label: 'Złącze', value: 'Dwurzędowe 2\u00a0×\u00a07' },
            rdt: {
              label: 'RDT',
              value: 'Aeris RDT (FF Electronics), MiniNeurone (Flying Neurons)',
            },
            afa: { label: 'AFA', value: 'Po {after}, ostrzeżenie {warning} wcześniej' },
            buzzer: {
              label: 'Sygnał',
              value: '4\u00a0melodie buzzera, co 2,5\u00a0s lub 5\u00a0s',
            },
            servo: { label: 'Serwo', value: 'Konfigurowalny kierunek i\u00a0wychylenie' },
            mcu: { label: 'Mikrokontroler', value: 'ATmega328P' },
          },
          manual: 'Pobierz podręcznik użytkownika',
          manualMeta: 'PDF, {size} MB',
        },
        // Zakończenie strony. Bez cen: ceny są tylko na stronie Kup.
        cta: {
          heading: 'Gotowy do startu.',
          text: 'Wybierz zestaw albo samą płytkę, wariant i\u00a0kolor.',
          alt: 'Płytka SkyTimer 1 od strony złącza',
        },
        // Linki w pasku produktu.
        localLinks: {
          design: 'Konstrukcja',
          timing: 'Czasy',
          safety: 'Bezpieczeństwo',
          mounting: 'Montaż',
          kit: 'Zestaw',
          specs: 'Dane techniczne',
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
          label: 'Wybierz kolor części drukowanych.',
          options: {
            // Nazwy od właściciela (2026-11-08), pierwsza z dwóch propozycji; druga w komentarzu.
            blue: 'Poranna Mgła', // PETG Basic Misty Blue; alt. Błękit Zefiru
            white: 'Gwiezdny Blask', // PETG Matte White; alt. Polarna Biel
            gray: 'Księżyc', // PETG Matte Gray (+ Basic Gray: Grafit / Srebro); alt. Łupek
            orange: 'Kosmiczny Pomarańcz', // PETG Basic Pomarańczowy; alt. Słoneczny
            black: 'Północ', // PETG Basic Black; alt. Obsydian
          },
        },
        screws: {
          heading: 'Śruby.',
          label: 'Wybierz wykończenie śrub.',
          options: { zinc: 'Cynk', blackened: 'Czernione' },
        },
      },
    },
    wieze: {
      slug: 'wieze-drukowane',
      name: 'Wieżyczki drukowane',
      navName: 'Wieżyczki', // roboczy; "wieżyczka" jak w podręczniku
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
      navName: 'Przyciski', // roboczy
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
