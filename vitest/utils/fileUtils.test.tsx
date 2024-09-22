import { FileUtils } from '../../src';

describe('FileUtils', () => {
  test('getFileSize', async () => {
    expect(FileUtils.getFileSize(1)).toBe('0.0 KB');
    expect(FileUtils.getFileSize(100)).toBe('0.1 KB');
    expect(FileUtils.getFileSize(1000)).toBe('1.0 KB');
    expect(FileUtils.getFileSize(500_000)).toBe('488.3 KB');
    expect(FileUtils.getFileSize(1_000_000)).toBe('976.6 KB');
    expect(FileUtils.getFileSize(20_000_000)).toBe('19.1 MB');
  });
});
