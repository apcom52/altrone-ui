import { GlobalUtils } from '../../src';

describe('GlobalUtils', () => {
  test('uuid', async () => {
    expect(GlobalUtils.uuid().endsWith('0')).toBeTruthy();
    expect(GlobalUtils.uuid().endsWith('1')).toBeTruthy();
    expect(GlobalUtils.uuid().endsWith('2')).toBeTruthy();
  });
});
