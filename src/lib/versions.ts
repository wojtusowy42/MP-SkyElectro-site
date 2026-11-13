/**
 * Zdjęcia w wersjach (strona Kup): ten sam slajd albo kafelek w kilku wersjach, np. w każdym kolorze.
 * Wersja opisuje, co pokazuje: 'krok=opcja' po spacji, np. 'variant=v1 color=blue'.
 */
import type { Selection } from './configurator.ts';

/**
 * Która wersja pasuje do wyborów: zgodna (nie przeczy żadnemu wyborowi) i z największą liczbą trafień.
 * Remis: pierwsza (np. "trzy warianty", dopóki nie wybrano wariantu). -1 = żadna nie pasuje.
 */
export function pickVersion(matches: string[], selection: Selection): number {
  let best = -1;
  let bestScore = -1;
  matches.forEach((match, i) => {
    const pairs = match
      .split(' ')
      .filter(Boolean)
      .map((p) => p.split('=') as [string, string]);
    if (pairs.some(([step, opt]) => selection[step] !== undefined && selection[step] !== opt))
      return;
    const score = pairs.filter(([step, opt]) => selection[step] === opt).length;
    if (score > bestScore) [best, bestScore] = [i, score];
  });
  return best;
}

/**
 * Czy slajd galerii jest schowany. only: 'krok=opcja' po spacji (schowany, gdy klient wybrał coś innego);
 * complete: 'true' = slajd dopiero po wybraniu wszystkich kroków (steps), 'false' = tylko do tego momentu.
 */
export function slideHidden(
  only: string | undefined,
  complete: string | undefined,
  selection: Selection,
  steps: string[],
): boolean {
  const conflict = (only ?? '')
    .split(' ')
    .filter(Boolean)
    .some((pair) => {
      const [step, opt] = pair.split('=') as [string, string];
      return selection[step] !== undefined && selection[step] !== opt;
    });
  const done = steps.length > 0 && steps.every((id) => selection[id] !== undefined);
  return conflict || (complete !== undefined && (complete === 'true') !== done);
}

/** W każdej grupie [data-versions] na stronie zostawia widoczną wersję pasującą do wyborów. */
export function showVersions(selection: Selection): void {
  for (const group of document.querySelectorAll<HTMLElement>('[data-versions]')) {
    const versions = [...group.querySelectorAll<HTMLElement>('[data-match]')];
    const best = pickVersion(
      versions.map((v) => v.dataset.match ?? ''),
      selection,
    );
    if (best !== -1) versions.forEach((v, i) => (v.hidden = i !== best));
  }
}
