/**
 * Zdjęcia akcesorium w wersjach: renders/<produkt>/{kup,akcesoria}/element-<image>[-<id opcji>...].jpg.
 * Wersja ma 'krok=opcja ...' (jak zdjęcia na stronie Kup), pickVersion wybiera pasującą do wyborów.
 * Np. element-buzzer-blue.jpg → 'color=blue', element-akumulator.jpg → '' (jedno zdjęcie).
 */
import type { ImageMetadata } from 'astro';
import type { Accessory } from '../data/accessories.ts';

const FILES = import.meta.glob<ImageMetadata>(
  '../assets/renders/*/{kup,akcesoria}/element-*.jpg',
  { eager: true, import: 'default' },
);

export function accessoryImages(accessory: Accessory): { src: ImageMetadata; match: string }[] {
  if (!accessory.image) return [];
  const stepOf = new Map(
    accessory.configurator.steps.flatMap((s) => s.options.map((o) => [o.id, s.id] as const)),
  );
  const prefix = `element-${accessory.image}`;
  return Object.entries(FILES).flatMap(([path, src]) => {
    const name = path.split('/').at(-1)!.replace(/\.jpg$/, '');
    if (name !== prefix && !name.startsWith(`${prefix}-`)) return [];
    const options = name === prefix ? [] : name.slice(prefix.length + 1).split('-');
    // inna nazwa elementu z tym samym początkiem albo opcja, której akcesorium nie ma
    if (options.some((o) => !stepOf.has(o))) return [];
    return [{ src, match: options.map((o) => `${stepOf.get(o)}=${o}`).join(' ') }];
  });
}
