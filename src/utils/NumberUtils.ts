type GetInRangeOptions = {
  min?: number;
  max?: number;
};

export class NumberUtils {
  static getInRange(value: number, options?: GetInRangeOptions): number {
    if (!options) return value;

    const { min, max } = options;

    if (typeof min === 'number' && typeof max === 'number') {
      return Math.min(Math.max(value, min), max);
    } else if (typeof min === 'number') {
      return Math.max(value, min);
    } else if (typeof max === 'number') {
      return Math.min(value, max);
    }

    return value;
  }
}
