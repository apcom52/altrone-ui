import type { HTMLAttributes, Ref } from 'react';
import { ConsumerConfigurationContext } from '../configuration/AltroneConfiguration.context.ts';
import type { Localization } from 'locales';

export type Theme = 'auto' | 'light' | 'dark';
export type Accent =
  | 'red'
  | 'orange'
  | 'amber'
  | 'green'
  | 'teal'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'pink'
  | 'brown';
export type Language = 'en' | 'ru' | 'fr' | 'ge' | 'sp';

export interface AltroneApplicationProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  language?: Language;
  theme?: Theme;
  accent?: Accent;
  config?: Partial<ConsumerConfigurationContext>;
  customLabels?: Partial<Localization>;
}
