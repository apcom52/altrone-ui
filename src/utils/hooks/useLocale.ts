import { Locale } from '../../components/configuration/AltroneConfiguration.context.ts';
import { useMemo } from 'react';
import { GlobalUtils } from '../GlobalUtils.ts';

const EMPTY_PROPS = {};

export function useLocale(props: Partial<Locale> = EMPTY_PROPS): Locale {
  const { decimal, grouping } =
    GlobalUtils.getNumberDelimitersByLocale('en-US');

  return useMemo<Locale>(
    () => ({
      locale: props.locale ?? 'en-US',
      dateFormat: props.dateFormat ?? 'LL',
      monthFormat: props.monthFormat ?? 'MMMM YYYY',
      yearFormat: props.yearFormat ?? 'YYYY',
      numberGrouping: props.numberGrouping ?? grouping,
      numberDecimal: props.numberDecimal ?? decimal,
    }),
    [props],
  );
}
