import { expect, test, describe } from 'vitest';
import { ColorUtils } from '../src/utils';

describe('ColorUtils.getCategoricalColorIndex', () => {
  test('is deterministic for the same input', () => {
    const a = ColorUtils.getCategoricalColorIndex('Ada Lovelace');
    const b = ColorUtils.getCategoricalColorIndex('Ada Lovelace');
    expect(a).toBe(b);
  });

  test('stays within the categorical palette bounds for varied input', () => {
    const seeds = ['', 'A', 'a very long name indeed, longer than most'];
    for (const seed of seeds) {
      const index = ColorUtils.getCategoricalColorIndex(seed);
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(ColorUtils.CATEGORICAL_COLORS_COUNT);
    }
  });
});
