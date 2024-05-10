export function getFileSize(fileSize: number) {
  const units = ['B', 'KB', 'MB', 'GB'];

  let currentSize = fileSize;

  let unitIndex = 0;
  while (unitIndex < units.length) {
    const currentUnit = units[unitIndex];
    if (currentSize < 1024 * unitIndex) {
      return `${currentSize.toFixed(1)} ${currentUnit}`;
    }
    currentSize = currentSize / 1024;
    unitIndex++;
  }
}
