import { ConsumerConfigurationContext } from './AltroneConfiguration.context.ts';

export const DEFAULT_CONFIGURATION: ConsumerConfigurationContext = {
  language: 'en',
  locale: {
    dateFormat: 'DD.MM.YYYY',
    timeFormat: '24h',
    firstDayOfWeek: 'monday',
    numberGrouping: ' ',
    numberDecimal: '.',
  },
};