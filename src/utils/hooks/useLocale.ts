import { useMemo } from 'react';
import { GlobalUtils } from '../GlobalUtils.ts';
import { useLocalizationContext } from '../../components/application/useLocalization.tsx';

export interface Locale {
  /**
   * Locale tag used for both `Intl` (number formatting) and `dayjs` (date
   * formatting via `.locale()`) — must match a key registered with
   * `dayjs.locale()`, not just any BCP 47 tag (e.g. `zh-cn`, not `zh-CN`).
   */
  locale: string;
  dateFormat: string;
  monthFormat: string;
  yearFormat: string;
  numberGrouping: string;
  numberDecimal: string;
}

/** `Language` → the exact key its `dayjs/locale/*` file registers itself under. */
const DAYJS_LOCALE_BY_LANGUAGE: Record<string, string> = {
  en: 'en',
  ru: 'ru',
  fr: 'fr',
  de: 'de',
  es: 'es',
  zh: 'zh-cn',
};

const EMPTY_PROPS = {};

export function useLocale(props: Partial<Locale> = EMPTY_PROPS): Locale {
  const { language } = useLocalizationContext();
  const locale =
    props.locale ?? DAYJS_LOCALE_BY_LANGUAGE[language] ?? 'en';
  const { decimal, grouping } = GlobalUtils.getNumberDelimitersByLocale(locale);

  return useMemo<Locale>(
    () => ({
      locale,
      dateFormat: props.dateFormat ?? 'LL',
      monthFormat: props.monthFormat ?? 'MMMM YYYY',
      yearFormat: props.yearFormat ?? 'YYYY',
      numberGrouping: props.numberGrouping ?? grouping,
      numberDecimal: props.numberDecimal ?? decimal,
    }),
    [props, locale, grouping, decimal],
  );
}
