import type { HTMLAttributes, ReactNode, Ref } from 'react';
import type { Size } from 'types';

export interface ScreenProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  /** Constrains the width of Screen.Content. Default: no constraint. */
  size?: Size;
}

export interface ScreenHeaderProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
}

export interface ScreenSidebarProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
  /**
   * Controlled, presentational only: visually collapses the sidebar's grid
   * column without unmounting it (so its own scroll/internal state
   * survives a toggle). Screen doesn't decide *when* to collapse — wire
   * this to the same boolean you pass to `Toolbar.SidebarToggleAction`'s
   * `collapsed` prop.
   */
  collapsed?: boolean;
}

export interface ScreenContentProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
}

export interface ScreenFooterProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
}

/**
 * Presets: `Screen`, pre-arranged for a common use case. All of them render
 * a full `Screen` internally and accept the same `Screen.Header`/
 * `Screen.Sidebar`/`Screen.Footer` zones as children — presets are layout
 * only, they hold no state and own no behavior (navigation, data, etc.),
 * matching the rest of the library's controlled-component convention.
 */

export interface ScreenListDetailProps extends ScreenProps {
  list: ReactNode;
  detail: ReactNode;
  /** Width of the list pane. Default: 320px. */
  listWidth?: string;
}

export interface ScreenDashboardProps extends ScreenProps {}

export interface ScreenFormProps extends ScreenProps {}

export interface ScreenSettingsProps extends ScreenProps {}

export interface ScreenDataViewProps extends ScreenProps {}

export interface ScreenAuthProps extends ScreenProps {}

export interface ScreenEmptyProps extends ScreenProps {}

export interface ScreenErrorProps extends ScreenProps {}
