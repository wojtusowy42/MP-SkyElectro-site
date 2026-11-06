import { describe, expect, it } from 'vitest';
import { richText } from './rich-text.ts';

describe('richText', () => {
  it('zamienia *frazę* na <strong>', () => {
    expect(richText('Szary *biały* szary.')).toBe('Szary <strong>biały</strong> szary.');
  });

  it('escapuje HTML ze słownika', () => {
    expect(richText('<b>x</b> & "y"')).toBe('&lt;b&gt;x&lt;/b&gt; &amp; &quot;y&quot;');
  });
});
