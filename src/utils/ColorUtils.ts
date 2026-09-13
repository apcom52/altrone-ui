export class ColorUtils {
  static readonly CATEGORICAL_COLORS_COUNT = 10;

  /**
   * Deterministically maps an identity string (a person's name, a tag
   * label) to one of the 10 categorical colors — the same input always
   * resolves to the same index, so an identity keeps a stable color
   * across renders without the caller tracking an assignment.
   *
   * @example
   * ColorUtils.getCategoricalColorIndex('Ada Lovelace') // 7
   * `var(--category-${ColorUtils.getCategoricalColorIndex(name) + 1})`
   */
  static getCategoricalColorIndex(seed: string): number {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) | 0;
    }
    return Math.abs(hash) % ColorUtils.CATEGORICAL_COLORS_COUNT;
  }
}
