import React, { useContext } from 'react';
import { DEFAULT_CONFIGURATION } from './AltroneConfiguration.const.ts';
import { BasicComponentStyleConfig } from 'types';

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
  icon?: ComponentConfiguration;
  flex?: ComponentConfiguration;
  message?: ComponentConfiguration;
  textScreenName?: ComponentConfiguration;
  textHeading?: ComponentConfiguration;
  textParagraph?: ComponentConfiguration;
  textInline?: ComponentConfiguration;
  textList?: ComponentConfiguration;
  textListItem?: ComponentConfiguration;
  textCode?: ComponentConfiguration;
  textKeyboard?: ComponentConfiguration;
  textLink?: ComponentConfiguration<{ rel?: string }>;
}

export const ConfigurationContext =
  React.createContext<ConsumerConfigurationContext>(DEFAULT_CONFIGURATION);
export const useConfiguration = () => useContext(ConfigurationContext);
