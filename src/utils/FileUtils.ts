export class FileUtils {
  static getFileSize(fileSize: number) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];

    let size = Math.max(0, fileSize);
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex += 1;
    }

    const value = unitIndex === 0 ? String(Math.round(size)) : size.toFixed(1);
    return `${value} ${units[unitIndex]}`;
  }
}
