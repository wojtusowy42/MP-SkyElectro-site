# MP SkyElectro: strona-katalog

Katalog produktów MP SkyElectro (elektronika i osprzęt do modeli szybowców, m.in. F1E).
Bez płatności: przeglądanie, konfiguratory i zamówienie mailem.

Stan: **same fundamenty**. Dane, języki, adresy, SEO, logika konfiguratorów.
Wyglądu nie ma wcale: strony to surowy HTML, który tylko pokazuje, że dane działają.

## Uruchomienie

Potrzebny [Node.js](https://nodejs.org) w wersji 22.12 lub nowszej (wersja LTS).

```bash
npm install       # raz, po pobraniu repo (instaluje zależności do node_modules/)
npm run dev       # podgląd na żywo: http://localhost:4321
npm run build     # sprawdza wszystko i buduje gotową stronę do dist/
npm run preview   # podgląd zbudowanej strony z dist/
npm run test      # same testy + lista brakujących danych
npm run format    # porządkuje formatowanie kodu
```

`npm run build` najpierw sprawdza typy (`astro check`), potem odpala testy, a dopiero potem buduje.
Jeśli coś jest zepsute (brak tłumaczenia, zły adres, cena promocyjna wyższa niż regularna),
build się zatrzyma i napisze dokładnie, co poprawić.

## Co jest czym

```
astro.config.mjs        Konfiguracja Astro: adres strony, przekierowanie "/", sitemap
package.json            Zależności i skrypty npm
tsconfig.json           Ustawienia TypeScriptu (tryb najbardziej rygorystyczny)
.prettierrc             Ustawienia formatowania kodu

src/
  config/site.ts        Nazwa firmy, domena, e-mail na zamówienia, waluta, indexable

  data/                 FAKTY o produktach (ceny, opcje, statusy). Zero tekstów.
    types.ts              Opis kształtu danych (co może mieć produkt, opcja, cena)
    products/             Jeden plik na produkt + index.ts z listą wszystkich
    services.ts           Dodatkowe usługi
    accessories.ts        Akcesoria / części zamienne
    catalog.ts            Kolejność pozycji w menu
    validate.ts           Sprawdzanie danych (uruchamiane w testach przy buildzie)

  i18n/                 TEKSTY i języki
    locales.ts            Lista włączonych języków
    dictionaries/pl.ts    Wszystkie teksty po polsku (wzór dla innych języków)
    index.ts              Pobieranie tekstów w danym języku
    routes.ts             Budowanie adresów stron w każdym języku

  lib/                  LOGIKA (bez wyglądu, testowana)
    price.ts              Która cena obowiązuje (promocje) i formatowanie kwot
    configurator.ts       Widoczne kroki, czyszczenie wyborów, MOQ, wycena

  layouts/
    BaseLayout.astro      <head> każdej strony: title, opis, canonical, hreflang, Open Graph

  pages/                PLIKI = ADRESY STRON
    [lang]/index.astro    /pl/          strona główna
    [lang]/[slug].astro   /pl/<slug>/   produkty, akcesoria, usługi, kontakt
    robots.txt.ts         /robots.txt
```

Pliki `*.test.ts` to testy, uruchamiane przez `npm run test`.

### Dlaczego dane i teksty są osobno

- **Cena jest w jednym miejscu** (`src/data/`) i zmienia się we wszystkich językach naraz.
- **Tłumacz dostaje jeden plik na język** (`src/i18n/dictionaries/`) i nie dotyka cen ani logiki.
- **Opcje są łączone po identyfikatorach**: opcja `covered` w `stateczniki.ts` ma etykietę
  `products.stateczniki.steps.covering.options.covered` w słowniku.

## Jak zrobić typowe rzeczy

**Zmienić cenę**: odpowiedni plik w `src/data/products/`. Ceny są w groszach: `35000` = 350,00 zł.

**Przecena**: pole `promo` przy cenie:

```ts
price: {
  regular: 35000,
  promo: { price: 30000, from: '2026-12-01', to: '2026-12-24', lowestPrice30Days: 35000 },
}
```

`from` / `to` to daty włącznie (czas polski), `null` = bez ograniczenia. Strona jest statyczna,
więc promocja z datą włącza się i wyłącza dopiero przy kolejnym buildzie (deployu).
`lowestPrice30Days` to wymóg Omnibusa: najniższa cena z 30 dni przed obniżką.

**Cena nieznana**: `regular: null`. Strona pokaże "Cena do ustalenia", build wypisze ostrzeżenie.

**Krok widoczny tylko po konkretnym wyborze**: `showIf` (patrz wariant płytki w `skytimer-1.ts`).

**Minimalne zamówienie (MOQ)**: `quantity: { min: 2 }` (patrz `stateczniki.ts`).

**Nowy produkt**:

1. plik w `src/data/products/` (wzór: dowolny istniejący),
2. dopisać go w `src/data/products/index.ts` i `src/data/catalog.ts`,
3. teksty (`slug`, `name`, etykiety kroków i opcji) w każdym słowniku w `src/i18n/dictionaries/`.

**Nowy język** (np. angielski):

1. skopiuj `src/i18n/dictionaries/pl.ts` jako `en.ts`, zmień `export const pl = {` na
   `export const en: Dictionary = {` (z importem typu `Dictionary` z `./pl.ts`) i przetłumacz teksty,
   łącznie ze slugami (`stateczniki` → np. `stabilizers`),
2. dopisz `'en'` w `src/i18n/locales.ts` (do `LOCALES` i `HTML_LANG`),
3. dopisz `en` do `DICTIONARIES` w `src/i18n/index.ts`.

Jeśli w nowym słowniku zabraknie choćby jednej etykiety, build się nie uda i wskaże brakujący klucz.

**Brakujące dane**: pole `todo` w pliku produktu. Build wypisuje całą listę przy każdym uruchomieniu.

## Decyzje otwarte (do zmiany w dowolnym momencie)

| Decyzja                                         | Gdzie się zmienia                   |
| ----------------------------------------------- | ----------------------------------- |
| Domena                                          | `src/config/site.ts` → `url`        |
| E-mail na zamówienia                            | `src/config/site.ts` → `orderEmail` |
| Indeksowanie w Google (do startu wyłączone)     | `src/config/site.ts` → `indexable`  |
| Waluta                                          | `src/config/site.ts` → `currency`   |
| Lista języków                                   | `src/i18n/locales.ts`               |
| Co jest pod "/" (teraz: przekierowanie na /pl/) | `astro.config.mjs` → `redirects`    |
| Kolejność w menu                                | `src/data/catalog.ts`               |

## Czego jeszcze nie ma (celowo)

Dochodzi dopiero wtedy, gdy jest potrzebne, żeby nie trzymać nieużywanych zależności:

- **wygląd**: style, fonty, tokeny designu,
- **konfiguratory w przeglądarce** (Svelte): logika już jest w `src/lib/configurator.ts`,
- **animacje** (GSAP): przy pierwszej stronie "dowiedz się więcej",
- **formularz zamówienia** (Cloudflare Worker): wymaga domeny i adresu e-mail,
- **dane strukturalne Product dla Google i og:image**: wymagają renderów,
- **hosting / deploy na Cloudflare**.

Pełne uzasadnienie wyborów technicznych: dokument „decyzje techniczne” w projekcie.

## Pliki 3D i rendery

`.blend`, `.f3d`, `.exr` i surowe rendery **nie trafiają do gita** (blokuje je `.gitignore`), bo są za duże.
Do repo trafiają tylko eksporty pod web (później: `src/assets/`). Źródła trzymaj poza repo.
