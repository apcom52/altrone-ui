import { FileUtils } from '../../src';

describe('FileUtils', () => {
  test('getFileSize keeps bytes as an integer', () => {
    expect(FileUtils.getFileSize(0)).toBe('0 B');
    expect(FileUtils.getFileSize(1)).toBe('1 B');
    expect(FileUtils.getFileSize(1000)).toBe('1000 B');
  });

  test('getFileSize steps up a unit at 1024', () => {
    expect(FileUtils.getFileSize(1024)).toBe('1.0 KB');
    expect(FileUtils.getFileSize(500_000)).toBe('488.3 KB');
    expect(FileUtils.getFileSize(1024 * 1024)).toBe('1.0 MB');
    expect(FileUtils.getFileSize(20_000_000)).toBe('19.1 MB');
  });

  test('getFileSize rolls MB over into GB and TB', () => {
    // ~1239 MB — previously stayed "1239.1 MB"
    expect(FileUtils.getFileSize(1_299_235_635)).toBe('1.2 GB');
    expect(FileUtils.getFileSize(5 * 1024 ** 3)).toBe('5.0 GB');
    expect(FileUtils.getFileSize(3 * 1024 ** 4)).toBe('3.0 TB');
  });
});
