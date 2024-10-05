declare global {
  interface Window {
    __TEST_ENV__: string;
  }
}

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
        GlobalUtils.formatConsoleMessage(
          `[Altrone]: property [[${deprecatedProp}]] in ${component} is deprecated. Use [[${instead}]] instead. Will be removed in version ${removedInVersion}`,
        ),
      );
    }
  }

  public static formatConsoleMessage(message: string) {
    return message.replace(new RegExp(/\[\[(\w*)\]\]/gm), (_, label) => {
      return `\x1B[1m${label}\x1B[m`;
    });
  }

  public static isTestEnvironment() {
    return window.__TEST_ENV__ === 'true';
  }
}
