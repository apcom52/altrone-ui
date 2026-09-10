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
  /**
   * Width of the `Screen.Aside` column when it's a direct grid child (not
   * wrapped in a `Splitter`, which owns its own sizing). Default: `320px`.
   */
  asideWidth?: string;
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
  /**
   * Distance from the screen's leading edge to where the header toolbar
   * starts — the gutter that keeps the bar clear of the overlapping
   * `Screen.Sidebar`. A number is px, a string is used verbatim
   * (`'var(--space-section)'`). Defaults to reserving the inline sidebar's
   * width plus the standard content gutter; pass `0` to run the bar full
   * width regardless of the sidebar.
   */
  insetStart?: number | string;
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
   *
   * Leave it undefined (uncontrolled) and the sidebar is a persistent column
   * inline and simply drops out once the viewport goes overlay — it never
   * covers the screen with no way to close it. To make it summonable on
   * mobile, control it and wire `Toolbar.SidebarToggleAction`.
   */
  collapsed?: boolean;
  /**
   * Called when the user dismisses the overlay sidebar — clicking the scrim
   * or pressing `Escape`. Set your `collapsed` state to `true` here; focus
   * returns to wherever it was before the panel opened. Even without it, the
   * scrim / `Escape` still visually dismiss the overlay (it's never a trap).
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

export interface ScreenAsideProps
  extends HTMLAttributes<HTMLElement>,
    ScreenZoneVisibilityProps {
  ref?: Ref<HTMLElement>;
  /**
   * Controlled, presentational: `true` collapses the column to zero width and
   * `Screen.Content` reclaims the space; the `<aside>` stays mounted as an
   * `inert` anchor. Only meaningful when `Screen.Aside` is a direct grid
   * column — inside a `Splitter`, the panel owns collapse.
   */
  collapsed?: boolean;
}
