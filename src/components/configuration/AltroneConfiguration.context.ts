import React, { useContext } from 'react';
import { DEFAULT_CONFIGURATION } from './AltroneConfiguration.const.ts';
import { BasicComponentStyleConfig } from '../../types/BaseDisplayComponent.ts';

type ComponentConfiguration<ExtraProps extends object = {}> = Partial<
  BasicComponentStyleConfig & ExtraProps
>;

export type Language = 'en' | 'ru' | string;

export type Locale = {
  dateFormat: string;
  timeFormat: string;
  firstDayOfWeek: 'monday' | 'sunday';
  numberGrouping: '' | ' ' | ',' | '.';
  numberDecimal: '.' | ',';
};

export interface ConsumerConfigurationContext {
  language?: Language;
  locale?: Partial<Locale>;
  text?: ComponentConfiguration;
}

export const ConfigurationContext =
  React.createContext<ConsumerConfigurationContext>(DEFAULT_CONFIGURATION);
export const useConfiguration = () => useContext(ConfigurationContext);
