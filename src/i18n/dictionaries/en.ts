/**
 * All site texts in English. Same keys as pl.ts (the source of truth, comments there explain each key).
 * Written as natural English rather than word-for-word: the Polish copy follows the apple.com/pl tone,
 * this one follows apple.com (short sentences, "you", no exclamation marks).
 * F1E terms as used by English-speaking modellers: flop, dether (DT), RDT, chord, span.
 * slug = URL segment in this language (/en/<slug>/).
 */
import type { Dictionary } from './pl.ts';

export const en: Dictionary = {
  site: {
    description: 'MP SkyElectro: electronics and hardware for model gliders, including F1E.',
  },

  common: {
    priceOnRequest: 'Price on request',
    comingSoon: 'Coming soon',
    perPiece: 'each',
    minOrder: 'Minimum order: {n} pcs',
    regularPrice: 'Regular price',
    lowestPrice30Days: 'Lowest price in the 30 days before the discount: {price}',
    availableNow: 'Available now.',
    learnMore: 'Learn more',
    order: 'Order',
    buy: 'Buy',
    close: 'Close',
  },

  nav: {
    label: 'Main menu',
    bag: 'Bag',
    bagCount: 'Bag, {n} items',
  },

  footer: {
    label: 'Footer',
    products: 'Products',
    shop: 'Shop and services',
    copyright: 'Copyright © {year} MP SkyElectro. All rights reserved.',
    language: 'Language',
  },

  pages: {
    home: {
      title: 'MP SkyElectro',
      hero: {
        tagline: 'Every second of the flight under control.',
        imageAlt: 'Red SkyTimer 1 board with a row of DIP switches',
      },
      sections: {
        wieze: {
          tagline: 'Ready for SkyTimer 1. Or for your timer.',
          imageNote: 'Render: pod with SkyTimer 1 fitted, side view',
        },
        'przyciski-pojemnosciowe': {
          tagline: 'Launch with a single touch.',
          imageNote: 'Render: finger above the button pad',
          imageAlt: 'A finger just above the round touch pad of a red capacitive button board',
        },
        stateczniki: {
          tagline: 'Made to fit your model.',
          imageNote: 'Render: stabilizer at an angle, from above',
          imageAlt:
            'Stabilizer half covered in silver Mylar, the other half a bare balsa and carbon frame',
        },
        accessories: {
          tagline: 'Every part sold separately.',
          imageAlt: 'SkyTimer 1 spare parts: screws, printed faceplate, charger and battery',
        },
        'skrzydla-weglowe': {
          tagline: 'Carbon where every gram counts.',
          imageNote: 'Render: whole carbon wing against the light, across the frame',
        },
        'rury-kadlubowe': {
          tagline: 'Stiff, light and straight as an arrow.',
          imageNote: 'Render: fuselage tube close-up, fibre weave visible',
        },
        'elektroniczne-sterowanie': {
          tagline: 'The next step after SkyTimer 1.',
          imageNote: 'Render: steering board next to a servo',
        },
        services: {
          tagline: 'Have an idea for a part? We’ll design it and print it.',
          imageNote: 'Photo: 3D printer mid-print',
        },
      },
    },
    configurator: {
      slug: 'buy',
      title: 'Buy {product}',
      heading: 'Buy {product}',
      priceFrom: 'From {price}',
      summary: 'Summary.',
      summaryHint: 'Your selection.',
      quantity: 'Quantity',
      decrease: 'Fewer',
      increase: 'More',
      total: 'Total',
      chooseFirst: 'Choose the options above first.',
      selectedOption: '{step}: {option}',
      galleryPrev: 'Previous image',
      galleryNext: 'Next image',
      galleryDot: 'Image {n} of {total}',
      addToBag: 'Add to Bag',
      addedToBag: 'Added to your bag.',
      viewBag: 'Review Bag',
      recommended: 'Accessories you might need.',
      recommendedInKit: 'They’re already in your kit, but a spare never hurts.',
      inBag: 'In your bag',
      kitHeading: 'What’s in the kit.',
      kitTimer: 'SkyTimer 1 timer',
      kitTimerColor: '{color} colour',
      kitScrews: 'M2 screw set ({screws}) and self-tapping screws',
      kitIntro: 'Everything you need for one pod. Printed parts in the colour you choose.',
      delivery: {
        heading: 'Delivery and returns.',
        items: [
          {
            title: 'Shipping',
            text: 'We’ll confirm the shipping cost and date when we reply to your order. You only pay once it’s confirmed.',
          },
          {
            title: '14-day returns',
            text: 'You can withdraw from the purchase within 14 days of receiving your parcel, without giving a reason.',
          },
          {
            title: 'Warranty',
            text: 'We’re responsible for the product matching your order for 2 years from delivery. Get in touch and we’ll help.',
          },
        ],
      },
      optionHints: {
        'skytimer-1': {
          variant: {
            v1: 'Power switch and port next to the switches, separate start button.',
            v2: 'Longer, with a built-in start button.',
            v3: 'Power switch and port below the switches, separate start button.',
          },
          screws: {
            zinc: 'Silver, standard zinc-plated steel.',
            blackened: 'Black M2 screws. 2.2 × 9.5 self-tapping screws are always zinc-plated.',
          },
        },
      } as Record<string, Record<string, Record<string, string>>>,
    },
    bag: {
      slug: 'bag',
      title: 'Bag',
      heading: 'Your bag.',
      empty: 'Your bag is empty.',
      continue: 'Continue shopping',
      remove: 'Remove',
      edit: 'Edit',
      total: 'Total',
      totalSelected: 'Total for selected items',
      selectAll: 'Select all',
      selected: 'Selected: {n} of {total}',
      select: 'Select: {name}',
      removeSelected: 'Remove selected',
      clear: 'Empty bag',
      removed: 'Items removed: {n}.',
      undo: 'Undo',
      nothingSelected: 'Select the items you want to order.',
      orderButton: 'Order by email',
      orderNote:
        'Your email app will open with the message ready to send. We’ll reply with a confirmation and payment details.',
      orderSubject: 'MP SkyElectro order',
      orderIntro: 'Hello, I would like to order:',
    },
    accessories: {
      slug: 'accessories',
      name: 'Accessories and spare parts',
      navName: 'Accessories',
      heading: 'Accessories.',
      lead: 'Spare parts and extras for SkyTimer 1 and pods. Every part sold separately.',
      browse: 'Browse by product',
      all: 'All accessories',
      seeAll: 'See all',
      noImage: 'Photo coming soon',
      overview: 'Overview',
      fits: 'Compatible with',
      colors: 'Available in {n} colours',
    },
    services: {
      slug: 'services',
      name: 'Additional services',
      navName: 'Services',
      heading: 'Need something that isn’t in the catalogue?',
      lead: 'We’ll design and print a part for your model. More technologies coming soon.',
      contactLink: 'Contact us',
      items: {
        'druk-3d': 'We print model parts: housings, pods, mounts and custom components.',
        projektowanie: 'Have an idea but no 3D model? We’ll design the part ready for printing.',
        laser: 'Laser cutting and engraving.',
        frezowanie: 'Precision CNC milling.',
      },
    },
    contact: {
      slug: 'contact',
      name: 'Contact',
      heading: 'How can we help?',
      lead: 'Questions about products, orders or an unusual project? Email or call us.',
      emailTitle: 'Email',
      emailText: 'Best for orders and technical questions.',
      noEmail: 'Email address coming soon.',
      phone: 'Phone',
      phoneText: 'When it’s urgent or easier to talk it through.',
      manualTitle: 'SkyTimer 1 user manual',
      manualText: 'Installation, settings and answers to common questions.',
      manualLink: 'Download PDF',
    },
  },

  products: {
    'skytimer-1': {
      slug: 'skytimer-1',
      name: 'SkyTimer 1',
      images: {
        zestaw:
          'SkyTimer 1 kit: board in the chosen variant with its template, LED and buzzer modules, charger, battery, line release mechanism and servo template',
        warianty: 'The three SkyTimer 1 board variants side by side',
        'element-sruby': 'M2 screw set and self-tapping screws',
        wariant: 'SkyTimer 1 in its housing, front view',
        pcb: 'SkyTimer 1 board from the front, with a row of ten DIP switches',
        'pcb-top': 'SkyTimer 1 board seen from above',
        'pcb-back': 'Back of the SkyTimer 1 board with the connector and electronics',
        'pcb-detail-dip': 'Close-up of DIP switches 1 to 10',
      },
      story: {
        tagline: 'Every second of the flight under control.',
        introDescription:
          'Animation: the parts of the SkyTimer 1 board come together in mid-air and assemble into a finished board.',
        units: {
          sec: '{n} s',
          min: '{n} min',
          minSec: '{m} min {s} s',
          plus: '+{value}',
          times: '{n}×',
        },
        overview:
          'SkyTimer 1 is an *electronic timer for F1E gliders.* After launch it counts down and releases the lines at exactly the right moment: *flop* switches the model from launch to glide, and *dether* ends the flight after the time you set.',
        gallery: {
          heading: 'What makes it different.',
          prev: 'Previous highlight',
          next: 'Next highlight',
          dot: 'Highlight {n} of {total}',
          items: {
            dip: {
              text: '*Ten switches.* Set flop and dether times with your finger. No computer needed.',
              alt: 'Close-up of a row of ten DIP switches marked ON',
            },
            connector: {
              text: '*One 2 × 7 connector.* Power, servo, RDT, start, buzzer and LED all in one place.',
              alt: 'SkyTimer 1 board at an angle: right-angle 2 × 7 connector with gold-plated pins',
            },
            playback: {
              text: '*Hear what you set.* Before every flight the timer plays back the dether time.',
              total: '= {time}',
            },
            size: {
              text: '*{weight} g.* A {short} × {long} mm board for a tight F1E pod.',
              alt: 'SkyTimer 1 board seen from above',
            },
          },
        },
        design: {
          eyebrow: 'Design',
          intro:
            'The whole timer fits on a *{short} × {long} mm board weighing {weight} g.* Turn it around and take a closer look.',
        },
        timing: {
          eyebrow: 'Setting the times',
          heading: 'Ten switches. Zero cables.',
          intro:
            'Switches 1‑4 set the flop time and 5‑10 the dether time. *The time is simply the sum.* Try it yourself.',
          sim: {
            label: 'SkyTimer 1 switch simulator',
            switchesLabel: 'Time switches',
            hint: 'Click a switch on the board.',
            imageAlt: 'SkyTimer 1 board from above: a row of ten DIP switches',
            switch: 'Switch {n}, {value}',
            flopGroup: 'Flop',
            detherGroup: 'Dether',
            flop: 'Flop time',
            flopOff: 'Off',
            flopOffNote: 'Switches 1‑4 set to OFF',
            flopNote: 'Sum of switches + {offset}',
            dether: 'Dether time',
            detherNote: 'Sum of switches 5‑10',
            detherOffNote: 'Switches 5‑10 set to OFF',
            total: 'Actual dether time',
            bonus: '{set} + {bonus} bonus',
            noBonus: 'Bonus starts at 2 min',
            playback: 'At power-on you’ll hear',
            noPlayback: 'No playback: all switches 5‑10 OFF means 10 s.',
            signals: 'Signals: {long} × long, {short} × short',
            legend: 'Long = 1 min · Short = 15 s',
            config: 'All ON: the timer enters configuration mode at power-on.',
          },
        },
        safety: {
          eyebrow: 'Safety',
          heading: 'Watching over the flight from power-on to landing.',
          intro:
            'Before you launch, the timer plays back the set time and flags any changed settings. *In the air, RDT and AFA have your back.*',
          items: {
            playback: {
              title: 'Time playback.',
              text: 'At power-on the buzzer and LED signal the dether time: *a long beep is one minute, a short one 15 seconds.*',
            },
            warnings: {
              title: 'Warnings.',
              text: '*Six quick beeps:* invalid settings, the timer has reverted to factory defaults. *A short and a long beep:* the flop time has changed.',
            },
            rdt: {
              title: 'Radio dether (RDT).',
              text: '*Dether on a radio signal,* right after the launch sequence. Compatible with Aeris RDT and MiniNeurone.',
            },
            afa: {
              title: 'Anti Fly Away (AFA).',
              text: 'Start button not pressed, or held for longer than {minutes}? *The timer starts the flight on its own,* and warns you with the buzzer {warning} beforehand.',
            },
          },
        },
        mounting: {
          eyebrow: 'Installation',
          heading: 'Fits your pod.',
          intro: 'Three board variants, *the same timer* in each. Pick the layout that fits your pod.',
          variantsAlt:
            'Three board variants: variant 1 with the power switch next to the switches, longer variant 2 with a start button, and variant 3 with the power switch below the switches',
          variants: {
            v1: {
              name: 'Variant 1',
              text: '*Power switch and charging port next to the switches.* Separate start button.',
            },
            v2: {
              name: 'Variant 2',
              text: '*Longer board with the start button at the top.* Power switch and port below the switches.',
            },
            v3: {
              name: 'Variant 3',
              text: '*Power switch and charging port below the switches.* Separate start button.',
            },
          },
          inCaseHeading: 'Board in a housing.',
          inCaseText:
            'Inside is the same board you can buy on its own. The 3D-printed housing protects it and holds it in the pod.',
          inCaseAlt:
            'Underside of the variant 2 housing with the red SkyTimer 1 board and power module fitted',
        },
        kit: {
          eyebrow: 'In the kit',
          heading: 'Everything for one pod.',
          intro: 'A complete set to install and fly. *The board is also available on its own.*',
          listLabel: 'What’s in the kit',
          items: [
            { name: 'SkyTimer 1 timer on the board variant you choose', note: '' },
            { name: 'Li‑Po 1S {mah} mAh battery', note: '' },
            { name: 'Power module', note: '' },
            { name: 'USB‑C charger', note: 'Red LED: charging, green: done' },
            { name: 'Buzzer module', note: 'Slides out of its base for replacement' },
            { name: 'LED module', note: 'Sits 5 mm above the pod' },
            { name: 'Line release mechanism', note: 'Two lines: flop and dether' },
            { name: 'Start button', note: '12 × 12 mm' },
            { name: 'M2 screw set and self-tapping screws', note: 'Zinc or black' },
            { name: 'Mounting templates', note: 'For every variant and the servo' },
            { name: 'User manual', note: 'Also available as a PDF' },
          ],
        },
        specs: {
          eyebrow: 'Tech specs',
          heading: 'All the numbers.',
          groups: {
            size: 'Size and weight',
            timing: 'Times',
            power: 'Power',
            safety: 'Safety',
            electronics: 'Electronics',
          },
          rows: {
            size: { label: 'Timer board size', value: '{short} × {long} mm' },
            weight: { label: 'Timer board weight', value: '{weight} g' },
            kitWeight: { label: 'Kit weight', value: 'about {weight} g' },
            flop: { label: 'Flop time', value: '{min}–{max} in {step} steps, or off' },
            dether: { label: 'Dether time', value: '{off} or {min}–{max} in {step} steps' },
            bonus: {
              label: 'Dether bonus',
              value: '{mid} from 2 to 5 min, {high} above 5 min',
            },
            battery: { label: 'Battery', value: 'Li‑Po 1S, {mah} mAh' },
            charging: { label: 'Charging', value: 'USB‑C, with the timer switched off only' },
            saving: { label: 'Power saving', value: 'An hour after dether the LED flashes {n}× less often' },
            connector: { label: 'Connector', value: 'Dual-row 2 × 7' },
            rdt: {
              label: 'RDT',
              value: 'Aeris RDT (FF Electronics), MiniNeurone (Flying Neurons)',
            },
            afa: { label: 'AFA', value: 'After {after}, warning {warning} before' },
            buzzer: {
              label: 'Signal',
              value: '4 buzzer tunes, every 2.5 s or 5 s',
            },
            servo: { label: 'Servo', value: 'Adjustable direction and travel' },
            mcu: { label: 'Microcontroller', value: 'ATmega88PA' },
          },
          manual: 'Download the user manual',
          manualMeta: 'PDF, {size} MB',
        },
        cta: {
          heading: 'Ready for launch.',
          text: 'Choose the full kit or just the board, the variant and the colour.',
          alt: 'SkyTimer 1 board from the connector side',
        },
        localLinks: {
          design: 'Design',
          timing: 'Times',
          safety: 'Safety',
          mounting: 'Installation',
          kit: 'Kit',
          specs: 'Tech specs',
        },
        closer: {
          heading: 'Take a closer look.',
          hint: 'Drag to rotate.',
          stageLabel: 'SkyTimer 1 board rotating',
          valueText: 'Rotation {deg}°, view: {view}',
          viewsLabel: 'Board views',
          views: {
            electronics: {
              label: 'Electronics',
              callouts: {
                mcu: { title: 'ATmega88PA', text: 'Microcontroller' },
                connector: { title: '2 × 7 connector', text: 'Every connection' },
                resonator: { title: '4 MHz resonator', text: 'Precise timekeeping' },
                jumpers: { title: 'JP1, JP2 jumpers', text: 'DTA: +15 s dether per pulse' },
              },
            },
            connector: {
              label: 'Connector',
              callouts: {
                pins: { title: 'Right-angle pins', text: 'Wires connect from the side' },
                header: {
                  title: '2 × 7 connector',
                  text: 'Power, servo, RDT, start, buzzer, LED',
                },
              },
            },
            switches: {
              label: 'Switches',
              callouts: {
                on: { title: 'All ON', text: 'Configuration mode' },
                flop: { title: 'Switches 1-4', text: 'Flop time, in 0.2 s steps' },
                dether: {
                  title: 'Switches 5-10',
                  text: 'Dether time, up to 15 min 45 s',
                },
              },
            },
          },
        },
        localNavLabel: 'SkyTimer 1: product navigation',
      },
      steps: {
        type: {
          heading: 'Version.',
          label: 'Full kit or the board only.',
          options: { kit: 'Full kit', pcb: 'Board only (PCB)' },
        },
        variant: {
          heading: 'Variant.',
          label: 'Choose a board variant.',
          options: { v1: 'Variant 1', v2: 'Variant 2', v3: 'Variant 3' },
        },
        color: {
          heading: 'Colour.',
          label: 'Choose a colour for the printed parts.',
          options: {
            blue: 'Morning Mist',
            white: 'Starlight',
            gray: 'Moon',
            orange: 'Cosmic Orange',
            black: 'Midnight',
          },
        },
        screws: {
          heading: 'Screws.',
          label: 'Choose a screw finish.',
          options: { zinc: 'Zinc', blackened: 'Black' },
        },
      },
    },
    wieze: {
      slug: 'printed-pods',
      name: 'Printed pods',
      navName: 'Pods',
      steps: {
        type: {
          label: 'Empty pod or with a SkyTimer 1 timer',
          options: { empty: 'Empty', 'with-timer': 'With SkyTimer 1' },
        },
        timerFor: {
          label: 'For which timer',
          options: { 'skytimer-1': 'For SkyTimer 1', other: 'For another timer' },
        },
      },
    },
    'przyciski-pojemnosciowe': {
      slug: 'capacitive-buttons',
      name: 'Capacitive buttons',
      navName: 'Buttons',
      story: {
        localNavLabel: 'Capacitive buttons: product navigation',
        localLinks: { overview: 'Overview', sizes: 'Sizes' },
        tagline: 'Launch with a single touch.',
        heroAlt:
          'Three red capacitive button boards, 12, 16 and 20 mm, stacked in steps with the round TOUCH pad facing up',
        highlights: {
          heading: 'What makes it different.',
          tiles: {
            hold: {
              text: '*Holds for as long as you touch it.* The button senses your finger, not pressure. It launches only when your finger really leaves the pad.',
              alt: 'A finger touching the TOUCH pad of a capacitive button board',
            },
            flat: {
              text: '*No moving parts.* A flat board with no key or spring to wear out.',
              alt: 'Flat capacitive button board seen low from the side',
            },
            sizes: {
              text: '*12, 16 or 20 mm.* Three pad sizes to suit your finger and your pod.',
              alt: 'Three capacitive button boards: 12, 16 and 20 mm',
            },
            early: {
              text: '*Won’t let go too soon.* During the launch run your finger sometimes eases off a little. A classic button would already trigger. The capacitive one keeps waiting.',
              alt: 'A classic 12 × 12 mm start button next to a 12 mm capacitive board',
            },
            wires: {
              text: '*Three wires.* S, + and − pads on the board: signal, power and ground.',
              alt: 'Three black wires soldered to the S, + and − pads of the board',
            },
            skytimer: {
              text: '*Works with SkyTimer 1.* Connect it through a slightly modified power module.',
              alt: 'Button board with wires routed to the SkyTimer 1 power module',
            },
          },
        },
        sizes: {
          heading: 'Compare sizes.',
          lead: 'Same price each, whatever the size.',
          field: 'Ø {d} mm touch pad',
          alt: 'Capacitive button board with a {d} mm pad',
          items: {
            d12: 'The smallest board. For a tight pod.',
            d16: 'The sweet spot between size and comfort.',
            d20: 'The largest pad. The easiest to find without looking.',
          },
        },
        buy: {
          heading: 'Buy capacitive buttons.',
          text: 'Choose a size and quantity.',
          alt: 'Three capacitive button boards: 12, 16 and 20 mm',
        },
      },
      images: {
        srednice: 'Three capacitive button boards: 12, 16 and 20 mm',
        srednica: 'Capacitive button board',
        dotyk: 'A finger touching the TOUCH pad of a capacitive button board',
        przewody: 'Three wires soldered to the S, + and − pads of the board',
        krawedz: 'Flat capacitive button board seen low from the side',
      },
      steps: {
        diameter: {
          label: 'Size',
          options: { d12: '12 mm', d16: '16 mm', d20: '20 mm' },
        },
      },
    },
    stateczniki: {
      slug: 'stabilizers',
      name: 'Stabilizers',
      images: {
        statecznik: 'Balsa and carbon stabilizer',
        konstrukcja: 'Uncovered stabilizer frame: balsa ribs, carbon tube and tip',
        mylar: 'Close-up of silver Mylar with the ribs showing through',
        mocowanie: 'Leading edge cut-out at the centre of the stabilizer with the steel mounting rod',
        para: 'Two covered stabilizers, one behind the other',
        gora: 'Stabilizer seen from above',
        srodek: 'Close-up of the stabilizer centre section',
        koncowka: 'Close-up of the stabilizer tip',
      },
      story: {
        localNavLabel: 'Stabilizers: product navigation',
        localLinks: { overview: 'Overview', sizes: 'Sizes', mounting: 'Mounting' },
        tagline: 'Made to fit your model.',
        heroAlt: 'Stabilizer covered in silver Mylar, seen from above at an angle',
        highlights: {
          heading: 'What makes it different.',
          tiles: {
            construction: {
              text: '*Balsa and carbon.* Balsa ribs and spars, a carbon tube main spar. A light frame that holds its shape.',
              alt: 'Uncovered stabilizer frame: balsa ribs, carbon tube and tip',
            },
            covering: {
              text: '*Covered or bare.* Ready to fly in silver Mylar, or just the frame for your own covering.',
              alt: 'Stabilizer half covered in silver Mylar, the other half a bare frame',
            },
            mylar: {
              text: '*Silver Mylar.* Film shrunk tight over the ribs and wrapped around the edges and tips.',
              alt: 'Close-up of silver Mylar with the ribs showing through',
            },
            mounting: {
              text: '*Centre mounting.* A steel rod in the leading edge cut-out. We’ll match the details to your model.',
              alt: 'Leading edge cut-out at the centre of a covered stabilizer with the steel mounting rod',
            },
            flop: {
              text: '*Flop stop where you want it.* You set its distance from the leading edge when you order.',
              alt: 'Uncovered stabilizer centre section with the hole behind the carbon tube',
            },
            pair: {
              text: '*Always in pairs.* Minimum order {min} pcs: one for the model, one spare.',
              alt: 'Two covered stabilizers, one behind the other',
            },
          },
        },
        sizes: {
          heading: 'Compare sizes.',
          lead: '130 or 150 mm chord, 530, 600, 670 or 750 mm span: one pair of rib bays at a time. All eight drawn to the same scale: 130 mm chord on the left, 150 mm on the right, narrowest at the top.',
          alt: 'Eight uncovered stabilizers from above, to the same scale: 130 and 150 mm chord, 530, 600, 670 and 750 mm span',
        },
        mounting: {
          heading: 'Mounting and flop stop.',
          flop: 'Let us know how far from the leading edge you want the flop stop, too.',
          contact: 'Contact us',
        },
        buy: {
          heading: 'Buy stabilizers.',
          text: 'Uncovered {uncovered}, covered in silver Mylar {covered}. Minimum order {min} pcs.',
          alt: 'Two covered stabilizers, one behind the other',
        },
      },
      steps: {
        chord: {
          label: 'Chord',
          options: { c130: '130 mm', c150: '150 mm' },
        },
        width: {
          label: 'Span',
          options: { w530: '530 mm', w600: '600 mm', w670: '670 mm', w750: '750 mm' },
        },
        covering: {
          label: 'Covering',
          options: { uncovered: 'Uncovered', covered: 'Silver Mylar' },
        },
      },
      mountingNote: 'For mounting, please get in touch: we’ll need a drawing.',
    },
    'rury-kadlubowe': {
      slug: 'fuselage-tubes',
      name: 'Fuselage tubes',
    },
    'elektroniczne-sterowanie': {
      slug: 'electronic-steering',
      name: 'Electronic steering',
    },
    'skrzydla-weglowe': {
      slug: 'carbon-wings',
      name: 'Carbon wings',
    },
  },

  services: {
    'druk-3d': '3D printing',
    projektowanie: 'Design',
    laser: 'Laser',
    frezowanie: 'CNC milling',
  },

  accessories: {
    categories: {
      'skytimer-1': {
        slug: 'skytimer-1',
        name: 'SkyTimer 1',
        heading: 'SkyTimer 1 accessories.',
      },
      wieze: { slug: 'pods', name: 'Pods', heading: 'Pod accessories.' },
    } as Record<string, { slug: string; name: string; heading: string }>,
    items: {
      'plytka-drukowana': {
        slug: 'timer-faceplate',
        name: 'Timer faceplate',
        overview:
          'Printed faceplate with a time chart next to the DIP switches. One for each SkyTimer 1 board variant, in the same colour as the other parts.',
      },
      'modul-zasilania': {
        slug: 'power-module',
        name: 'Power module',
        overview:
          'Power switch with leads that connects the battery to the timer. Printed housing in the colour you choose.',
      },
      akumulator: {
        slug: 'battery',
        name: 'Battery',
        overview: 'Li‑Po 1S battery, the same as in the SkyTimer 1 kit. As a spare or for a second model.',
      },
      'przycisk-startu': {
        slug: 'start-button',
        name: 'Start button',
        overview: 'Classic 12 × 12 mm start button, the same as in the kit.',
      },
      flasher: {
        slug: 'flasher',
        name: 'LED flasher',
        overview: 'LED module that sits 5 mm above the pod. Makes the model easier to find after the flight.',
      },
      buzzer: {
        slug: 'buzzer',
        name: 'Buzzer',
        overview:
          'Buzzer module with a housing in the colour you choose. It slides out of its base, so swapping it takes seconds.',
      },
      'zwalniacz-linek': {
        slug: 'line-release',
        name: 'Line release',
        overview: 'Line release mechanism for two lines: flop and dether. Printed parts in the colour you choose.',
      },
      ladowarka: {
        slug: 'charger',
        name: 'Charger',
        overview: 'USB‑C charger for the SkyTimer 1 battery. Red LED: charging, green: done.',
      },
      'zestaw-srubek': {
        slug: 'screw-set',
        name: 'Screw set',
        overview:
          'M2 screws and self-tapping screws to assemble the timer. Zinc-plated or black screws; the 2.2 × 9.5 self-tapping screws are always zinc-plated.',
      },
      szablony: {
        slug: 'templates',
        name: 'Templates',
        overview: 'Mounting templates for every board variant and the servo.',
      },
      podrecznik: {
        slug: 'printed-manual',
        name: 'User manual (printed)',
        overview:
          'Printed SkyTimer 1 manual: installation, setting the times and safety. The PDF version is free on the product page.',
      },
      'zestaw-gps': {
        slug: 'gps-kit',
        name: 'GPS kit for pods',
        overview:
          'Kit for fitting a GPS in a printed pod that has a compartment for the GPS switch and battery. We’ll confirm the details when you order.',
      },
    } as Record<string, { slug: string; name: string; overview: string }>,
  },
};
