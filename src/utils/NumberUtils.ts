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

  static random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static toNumber = (v: any): number | null => {
    if (v === null || v === undefined || v === '') return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };
}
