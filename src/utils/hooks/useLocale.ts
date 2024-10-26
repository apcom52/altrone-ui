import {
  Locale,
  useConfiguration,
} from '../../components/configuration/AltroneConfiguration.context.ts';
import { useMemo } from 'react';
import { GlobalUtils } from '../GlobalUtils.ts';

const EMPTY_PROPS = {};

export function useLocale(props: Partial<Locale> = EMPTY_PROPS): Locale {
  const { locale: localeConfig = {} } = useConfiguration();

  const { decimal, grouping } = GlobalUtils.getNumberDelimitersByLocale(
    localeConfig.locale || 'en-US',
  );

  return useMemo<Locale>(
    () => ({
      locale: props.locale ?? localeConfig.locale ?? 'en-US',
      dateFormat: props.dateFormat ?? localeConfig.dateFormat ?? 'LL',
      monthFormat: props.monthFormat ?? localeConfig.monthFormat ?? 'MMMM YYYY',
      yearFormat: props.yearFormat ?? localeConfig.yearFormat ?? 'YYYY',
      numberGrouping:
        props.numberGrouping ?? localeConfig.numberGrouping ?? grouping,
      numberDecimal:
        props.numberDecimal ?? localeConfig.numberDecimal ?? decimal,
    }),
    [props, localeConfig],
  );
}
