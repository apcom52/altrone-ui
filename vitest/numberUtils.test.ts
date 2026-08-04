import { expect, test, describe } from 'vitest';
import { NumberUtils } from '../src/utils';

describe('NumberUtils.concentricRadius', () => {
  test('subtracts the gap from the outer radius when there is room', () => {
    expect(NumberUtils.concentricRadius(24, 8)).toBe(16);
  });

  test('floors at the given floor instead of going lower', () => {
    expect(NumberUtils.concentricRadius(24, 40)).toBe(2);
  });

  test('passes an explicit "no radius" (0) through unchanged, ignoring the floor', () => {
    expect(NumberUtils.concentricRadius(0, 8)).toBe(0);
  });

  test('passes any outer radius already below the floor through unchanged', () => {
    expect(NumberUtils.concentricRadius(1, 0)).toBe(1);
  });

  test('respects a custom floor', () => {
    expect(NumberUtils.concentricRadius(10, 100, 4)).toBe(4);
  });
});
