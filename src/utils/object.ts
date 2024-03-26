export const objectKeysToArray = (sourceEnum: Record<any, any>) => {
  const keys = Object.keys(sourceEnum);
  return keys.map((key) => sourceEnum[key]) as string[];
};
