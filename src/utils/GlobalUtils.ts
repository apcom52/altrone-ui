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

  public static rgbToHex(rgb: string): string {
    const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0');

    const p3Match = rgb.match(
      /color\(display-p3\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)/,
    );
    if (p3Match) {
      const r = parseFloat(p3Match[1]) * 255;
      const g = parseFloat(p3Match[2]) * 255;
      const b = parseFloat(p3Match[3]) * 255;
      const a = p3Match[4] !== undefined ? Math.round(parseFloat(p3Match[4]) * 255) : 255;
      return `#${toHex(r)}${toHex(g)}${toHex(b)}${a < 255 ? toHex(a) : ''}`;
    }

    const rgbMatch = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (!rgbMatch) return '#000000';
    const r = parseInt(rgbMatch[1], 10);
    const g = parseInt(rgbMatch[2], 10);
    const b = parseInt(rgbMatch[3], 10);
    const a = rgbMatch[4] !== undefined ? Math.round(parseFloat(rgbMatch[4]) * 255) : 255;
    return `#${toHex(r)}${toHex(g)}${toHex(b)}${a < 255 ? toHex(a) : ''}`;
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
