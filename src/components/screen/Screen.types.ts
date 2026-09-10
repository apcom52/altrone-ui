import type { HTMLAttributes, Ref } from 'react';
import type { Size } from 'types';
import type { BreakpointName } from 'utils';

export type ScreenMobileBreakpoint = 'sm' | 'md' | 'lg';

/**
 * Viewport breakpoint token for a zone's `visibleFrom` / `hiddenFrom` —
 * mirrors the `--breakpoint-*` custom properties (`useBreakpoint`).
 */
export type ScreenBreakpoint = BreakpointName;

export interface ScreenProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  /** Constrains the width of `Screen.Content`. Default: no constraint. */
  size?: Size;
  /**
   * Accessible name for the screen's root region (`aria-label` +
   * `role="region"`). Label-only — nothing is rendered visibly.
   */
  title?: string;
  /**
   * Centers `Screen.Content` in both axes (with `size`, a narrow centered
   * column) — for sign-in / onboarding forms and full-page `Result` states.
   * Default: `'start'`.
   */
  contentAlign?: 'start' | 'center';
  /**
   * Viewport width below which `Screen.Sidebar` switches from an inline grid
   * column to an off-canvas overlay panel with a scrim. Independent of the
   * zone's own `visibleFrom` / `hiddenFrom` (which control whether it renders
   * at all). Default: `'md'`.
   */
  mobileBreakpoint?: ScreenMobileBreakpoint;
  /** Width of the inline sidebar column. Default: `300px`. */
  sidebarWidth?: string;
}

/**
 * Breakpoint-gated visibility, shared by the zones that adapt per device
 * (`Screen.Sidebar`, `Screen.BottomNavigation`). Set neither to keep the zone
 * always mounted (its mode still adapts — e.g. the sidebar goes overlay below
 * `mobileBreakpoint`). Set one, or both to bound the zone to a band. When out
 * of range the zone renders nothing, so it reserves no layout space.
 */
interface ScreenZoneVisibilityProps {
  /** Render this zone only at viewport widths `>=` the breakpoint. */
  visibleFrom?: ScreenBreakpoint;
  /** Render this zone only at viewport widths `<` the breakpoint. */
  hiddenFrom?: ScreenBreakpoint;
}

export interface ScreenHeaderProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
}

export interface ScreenSidebarProps
  extends HTMLAttributes<HTMLElement>,
    ScreenZoneVisibilityProps {
  ref?: Ref<HTMLElement>;
  /**
   * Controlled, presentational: `true` removes the sidebar from the layout.
   * In both modes the panel animates out `Drawer`-style and unmounts; the
   * `<aside>` anchor stays in the DOM (`inert`) and, inline, `Screen` reflows
   * its content by animating a start inset (no overflow clipping). Wire this
   * to the same boolean you pass to `Toolbar.SidebarToggleAction`'s
   * `collapsed` prop.
   */
  collapsed?: boolean;
  /**
   * Called in overlay mode when the user dismisses the sidebar — clicking the
   * scrim or pressing `Escape`. Set your `collapsed` state to `true` here;
   * focus returns to wherever it was before the panel opened.
   */
  onClose?: () => void;
}

export interface ScreenContentProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
}

export interface ScreenFooterProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
}

export interface ScreenBottomNavigationProps
  extends HTMLAttributes<HTMLElement>,
    ScreenZoneVisibilityProps {
  ref?: Ref<HTMLElement>;
}
