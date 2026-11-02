import { expect, test } from 'vitest';
import { validateCatalog } from './validate.ts';

test('dane katalogu i słowniki są poprawne', () => {
  const { errors, warnings } = validateCatalog();

  if (warnings.length > 0) {
    console.warn(`\nBrakujące dane (${warnings.length}):\n  - ${warnings.join('\n  - ')}\n`);
  }

  // Każdy błąd jest wypisany po nazwie, żeby było widać, co poprawić.
  expect(errors).toEqual([]);
});
