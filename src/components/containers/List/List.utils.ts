export const DEFAULT_KEY_EXTRACTOR = <T extends object>(_: T, index: number) => {
  return index;
};
