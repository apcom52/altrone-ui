import { JSX } from 'react';
import { ConsumerConfigurationContext } from '../configuration/AltroneConfiguration.context.ts';

export type Theme = 'auto' | 'light' | 'dark';
export type Language = 'en' | 'ru';

export interface AltroneApplicationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  language?: Language;
  theme?: Theme;
  tagName?: keyof JSX.IntrinsicElements;
  config?: Partial<ConsumerConfigurationContext>;
  customLabels?: Record<string, any>;
}
