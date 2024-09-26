export class GlobalUtils {
  private static seed = 0;

  public static uuid() {
    return `${Date.now().toString(32)}${(GlobalUtils.seed++).toString(32)}`;
  }

  public static deprecatedMessage(
    component: string,
    deprecatedProp: string,
    instead: string,
    removedInVersion: string,
  ) {
    if (typeof window !== 'undefined') {
      console.warn(
        '[Altrone]: property \x1B[1m%s\x1B[m in %s is deprecated. Use \x1B[1m%s\x1B[m instead. Will be removed in version %s',
        deprecatedProp,
        component,
        instead,
        removedInVersion,
      );
    }
  }
}
