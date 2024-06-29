import { JSX } from 'react';
import { ConsumerConfigurationContext } from '../configuration/AltroneConfiguration.context.ts';
import { Localization } from '../../locales';

export type Theme = 'auto' | 'light' | 'dark';
export type Language = 'en' | 'ru';

export interface AltroneApplicationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  language?: Language;
  theme?: Theme;
  tagName?: keyof JSX.IntrinsicElements;
  config?: Partial<ConsumerConfigurationContext>;
  customLabels?: {
    en?: Partial<Localization>;
    ru?: Partial<Localization>;
    customLabels?: Record<string, any>;
  };
}
