import React from 'react';
import { ButtonProps } from 'components/button/Button.types';
import { Justify, Size } from 'types';

export type ToolbarVariant = 'plain' | 'grouped' | 'solid';
export type ToolbarEdge = 'top' | 'bottom' | 'left' | 'right';

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  /**
   * How much surface the toolbar carries, from least to most chrome. All
   * three lay out identically and flow in normal document order — the
   * toolbar never positions itself.
   * - `plain` — no toolbar fill, no group material. Actions are flat text
   *   buttons in a bare row. For a toolbar dropped onto a surface that
   *   already provides its own background.
   * - `grouped` — no toolbar fill, but every `Toolbar.Group` is a raised
   *   liquid-glass pill (blurred fill, specular edge, drop shadow). The
   *   strip itself stays transparent — the pills read as islands on
   *   whatever surface is behind them.
   * - `solid` (default) — an accent-tinted, blurred toolbar fill with a
   *   hairline on its content-facing edge, plus the same glass pills for
   *   groups. A self-sufficient app / frame header.
   */
  variant?: ToolbarVariant;
  edge?: ToolbarEdge;
  /** Drives toolbar height/padding and the default `size` of the actions inside it. */
  size?: Size;
  /** Stick to the `edge` of the nearest scroll container. */
  sticky?: boolean;
  /** Blurred gradient scrim behind the toolbar — lifts `grouped` pills off busy content. */
  showBackdrop?: boolean;
  /** @deprecated use `sticky`. Will be removed in v4. */
  fixed?: boolean;
}

export interface ToolbarActionProps extends Omit<ButtonProps, 'variant'> {
  ref?: React.Ref<HTMLButtonElement>;
  kbd?: string;
}

export interface ToolbarSidebarToggleActionProps
  extends Omit<ToolbarActionProps, 'label' | 'icon' | 'showLabel'> {
  /**
   * Sidebar state. Omit to read/drive `Screen.Sidebar` automatically via
   * `Screen`'s context (works only inside a `Screen` with an uncontrolled
   * `Screen.Sidebar`). Pass it explicitly for full control — the component
   * then holds no state of its own and you own `onClick` too.
   */
  collapsed?: boolean;
  showLabel?: boolean;
}

export interface ToolbarTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  label: string;
  clickable?: boolean;
}

export interface ToolbarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  justify?: Justify;
  /** `flex` value — `weight={1}` makes the group eat the remaining space. */
  weight?: number;
  /**
   * Overrides the toolbar's `variant` for this one group: `plain` drops the
   * glass pill (bare row), `grouped` / `solid` force it on. Defaults to
   * whatever the parent `Toolbar` uses.
   */
  variant?: ToolbarVariant;
}

export interface ToolbarSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  /**
   * - `space` (default) — a flexible gap (`flex: 1`) that pushes what
   *   follows it to the far edge.
   * - `line` — a hairline divider between adjacent groups.
   */
  variant?: 'space' | 'line';
}

export interface ToolbarLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export interface ToolbarLeadingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export interface ToolbarCenterProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export interface ToolbarTrailingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}
