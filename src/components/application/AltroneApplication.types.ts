import type { HTMLAttributes, Ref } from 'react';
import { ConsumerConfigurationContext } from '../configuration/AltroneConfiguration.context.ts';
import type { NotificationPlacement } from '../notifications';
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
  /** Vertical placement of the toast stack (centred horizontally). Defaults to 'end' (bottom). */
  toastPlacement?: NotificationPlacement;
  /** Horizontal side of the notification stack. Defaults to 'end' (right). */
  notificationSide?: NotificationPlacement;
  /** Vertical placement of the notification stack. Defaults to 'end' (bottom). */
  notificationPlacement?: NotificationPlacement;
}
