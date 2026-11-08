import { describe, expect, it } from 'vitest';
import { addLine, bagCount } from './bag.ts';

describe('torba', () => {
  const kit = {
    productId: 'skytimer-1',
    selection: { type: 'kit', variant: 'v1', color: 'blue' },
    quantity: 1,
  };

  it('ten sam produkt z tymi samymi wyborami zwiększa ilość', () => {
    const lines = addLine(addLine([], kit), {
      ...kit,
      selection: { color: 'blue', variant: 'v1', type: 'kit' },
      quantity: 2,
    });
    expect(lines).toHaveLength(1);
    expect(lines[0]!.quantity).toBe(3);
  });

  it('inne wybory to osobna linia', () => {
    const lines = addLine(addLine([], kit), { ...kit, selection: { type: 'pcb' } });
    expect(lines).toHaveLength(2);
    expect(bagCount(lines)).toBe(2);
  });
});
