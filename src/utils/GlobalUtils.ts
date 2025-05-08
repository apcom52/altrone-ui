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

  public static getNumberDelimitersByLocale(locale: string = 'en-US') {
    let decimal = '';
    let grouping = '.';

    const parts = Intl.NumberFormat(locale).formatToParts(10000.1);

    parts.forEach((item) => {
      if (item.type === 'group') {
        grouping = item.value;
      } else if (item.type === 'decimal') {
        decimal = item.value;
      }
    });

    return {
      decimal,
      grouping,
    };
  }

  public static getColorLuminance(color: string) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const a = hex.length === 8 ? parseInt(hex.substring(6, 8), 16) / 255 : 1;
    const brightness = (0.2126 * r + 0.7152 * g + 0.0722 * b) * a;
    return brightness < 128 ? 'dark' : 'light';
  }
}
