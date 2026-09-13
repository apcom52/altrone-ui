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

  /**
   * Concentric radius formula (see rules/radius.md): floors at `floor`,
   * but passes `outerRadius` through unchanged when it's already at/below
   * the floor (e.g. an explicit 0 = "no radius").
   *
   * @example
   * NumberUtils.concentricRadius(24, 8)  // 16
   * NumberUtils.concentricRadius(24, 40) // 2 (floored)
   * NumberUtils.concentricRadius(0, 8)   // 0 (explicit "no radius")
   */
  static concentricRadius(
    outerRadius: number,
    gap: number,
    floor: number = 2,
  ): number {
    if (outerRadius < floor) return outerRadius;
    return Math.max(floor, outerRadius - gap);
  }
}
