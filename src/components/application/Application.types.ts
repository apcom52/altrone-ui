import type { HTMLAttributes, ReactElement, ReactNode, Ref } from 'react';
import type { NotificationPlacement, ToastPlacement } from '../notifications';
import type { Localization } from 'locales';

/**
 * Icon roles shared by multiple components (e.g. `prev`/`next` navigation
 * chevrons used by Calendar, DatePicker and Pagination) — override once via
 * `Application.icons` instead of per component. Icons unique to a single
 * component keep their own local override prop instead of joining this set.
 */
export interface IconSet {
  prev: ReactElement;
  next: ReactElement;
  open: ReactElement;
  close: ReactElement;
  search: ReactElement;
  clear: ReactElement;
  error: ReactElement;
  help: ReactElement;
  info: ReactElement;
  success: ReactElement;
  warning: ReactElement;
  danger: ReactElement;
}

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
export type Language = 'en' | 'ru' | 'fr' | 'de' | 'es' | 'zh' | 'pt' | 'tr';

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
  /** Overrides for the icon roles shared across components — see `IconSet`. */
  icons?: Partial<IconSet>;
  /** Vertical edge of the toast stack (centred horizontally). Defaults to 'bottom'. */
  toastPlacement?: ToastPlacement;
  /** Corner of the notification stack. Defaults to 'bottom-end'. */
  notificationPlacement?: NotificationPlacement;
  /**
   * Radix Slot polymorphism — merges the root's attributes/classes onto the
   * single child instead of rendering a wrapping `<div>` (e.g. a consumer's
   * own `<body>`). The child's own children become the provider tree's content.
   */
  asChild?: boolean;
  children?: ReactNode;
}
