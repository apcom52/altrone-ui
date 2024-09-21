import { ArrayUtils } from '../../src';

describe('ArrayUtils', () => {
  test('getSafeArray', async () => {
    expect(ArrayUtils.getSafeArray('test')).toStrictEqual(['test']);
    expect(ArrayUtils.getSafeArray(['foo', 'bar'])).toStrictEqual([
      'foo',
      'bar',
    ]);
    expect(ArrayUtils.getSafeArray('')).toStrictEqual(['']);
    expect(ArrayUtils.getSafeArray(undefined)).toStrictEqual([undefined]);
    expect(ArrayUtils.getSafeArray({ foo: 'bar' })).toStrictEqual([
      { foo: 'bar' },
    ]);
  });
});
