// Główna konfiguracja Astro. Dokumentacja: https://docs.astro.build/en/reference/configuration-reference/
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import { SITE } from './src/config/site.ts';
import { LOCALES, DEFAULT_LOCALE, HTML_LANG } from './src/i18n/locales.ts';

export default defineConfig({
  // Adres docelowy: potrzebny do linków kanonicznych i sitemapy.
  site: SITE.url,

  // Każdy adres kończy się ukośnikiem: /pl/stateczniki/ (jedna wersja adresu = lepsze SEO).
  trailingSlash: 'always',

  // Strona główna "/" przekierowuje na język domyślny.
  // Decyzja otwarta (może być strona wyboru języka), zmiana tylko tutaj.
  redirects: {
    '/': `/${DEFAULT_LOCALE}/`,
  },

  integrations: [
    // Interaktywne "wyspy" (konfiguratory). Reszta strony to czysty HTML bez JS.
    svelte(),

    // Generuje sitemap-index.xml z wersjami językowymi każdej strony (hreflang).
    sitemap({
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: Object.fromEntries(LOCALES.map((l) => [l, HTML_LANG[l]])),
      },
    }),
  ],
});
