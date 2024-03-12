export function getSafeArray<T = unknown>(item: T | T[]) {
  if (Array.isArray(item)) {
    return item;
  }

  return [item];
}
