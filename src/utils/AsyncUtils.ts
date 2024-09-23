export class AsyncUtils {
  static async timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
