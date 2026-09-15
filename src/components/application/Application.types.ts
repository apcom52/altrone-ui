import type { HTMLAttributes, ReactNode, Ref } from 'react';
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
export type Language = 'en' | 'ru' | 'fr' | 'de' | 'es' | 'zh';

export interface ApplicationProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  language?: Language;
  theme?: Theme;
  /**
   * Remember the resolved theme (`'light'` / `'dark'`) in `localStorage` and
   * restore it on the next visit — takes priority over `theme`/system
   * preference once a value has been stored (i.e. after the user has
   * actually toggled it once). Default `false`.
   */
  persistTheme?: boolean;
  accent?: Accent;
  customLabels?: Partial<Localization>;
  /** Vertical placement of the toast stack (centred horizontally). Defaults to 'end' (bottom). */
  toastPlacement?: NotificationPlacement;
  /** Horizontal side of the notification stack. Defaults to 'end' (right). */
  notificationSide?: NotificationPlacement;
  /** Vertical placement of the notification stack. Defaults to 'end' (bottom). */
  notificationPlacement?: NotificationPlacement;
  /**
   * Radix Slot polymorphism — merges the root's attributes/classes onto the
   * single child instead of rendering a wrapping `<div>` (e.g. a consumer's
   * own `<body>`). The child's own children become the provider tree's content.
   */
  asChild?: boolean;
  children?: ReactNode;
}
