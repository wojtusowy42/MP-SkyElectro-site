/**
 * Tekst z wyróżnieniami jako bezpieczny HTML (do set:html): *fraza* → <strong>fraza</strong>.
 * Wzór: akapity na stronach Apple, szare z białymi frazami. Reszta HTML jest escapowana,
 * więc słownik nie może wstrzyknąć znaczników.
 */
export function richText(text: string): string {
  const escaped = text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
  return escaped.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
}
