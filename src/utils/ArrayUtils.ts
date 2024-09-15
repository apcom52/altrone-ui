export class ArrayUtils {
  static getSafeArray(elements: any) {
    if (Array.isArray(elements)) {
      return elements;
    }

    return [elements];
  }
}
