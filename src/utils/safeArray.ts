export function getSafeArray(item: unknown | unknown[]) {
  if (Array.isArray(item)) {
    return item;
  }

  return [item];
}
