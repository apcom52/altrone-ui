import { GlobalUtils } from '../../src';

describe('GlobalUtils', () => {
  test('uuid', async () => {
    expect(GlobalUtils.uuid().endsWith('0')).toBeTruthy();
    expect(GlobalUtils.uuid().endsWith('1')).toBeTruthy();
    expect(GlobalUtils.uuid().endsWith('2')).toBeTruthy();
  });

  test('getColorLuminosity', () => {
    expect(GlobalUtils.getColorLuminance('#000000')).toBe('dark');
    expect(GlobalUtils.getColorLuminance('#ffffff')).toBe('light');
    expect(GlobalUtils.getColorLuminance('#ff0000')).toBe('dark');
    expect(GlobalUtils.getColorLuminance('#333333')).toBe('dark');
    expect(GlobalUtils.getColorLuminance('#fefefe')).toBe('light');
  });
});
