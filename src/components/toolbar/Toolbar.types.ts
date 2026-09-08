import React from 'react';
import { ButtonProps } from 'components/button/Button.types';
import { Align, Size } from 'types';

export type ToolbarVariant = 'plain' | 'floating' | 'glass';
export type ToolbarPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  /**
   * How much surface the toolbar carries, from least to most chrome:
   * - `plain` — no toolbar fill, no group material. Actions are flat text
   *   buttons in a bare row. For a toolbar dropped onto a surface that
   *   already provides its own background (e.g. `Screen.Header`).
   * - `floating` — no toolbar fill, but every `Toolbar.Group` is a raised
   *   liquid-glass pill (blurred fill, specular edge, drop shadow). The
   *   strip pins to its `placement` edge and is click-through except for
   *   those pills — canvas / editor overlays.
   * - `glass` (default) — an accent-tinted, blurred toolbar fill with a
   *   hairline on its content-facing edge, plus the same glass pills for
   *   groups. A self-sufficient app / frame header.
   */
  variant?: ToolbarVariant;
  placement?: ToolbarPlacement;
  /** Drives toolbar height/padding and the default `size` of the actions inside it. */
  size?: Size;
  /** Stick to the `placement` edge of the nearest scroll container. */
  sticky?: boolean;
  /** Blurred gradient scrim under the toolbar — mainly useful with `floating` over content. */
  showBackdrop?: boolean;
  /** @deprecated use `sticky`. Will be removed in v4. */
  fixed?: boolean;
}

export interface ToolbarActionProps extends Omit<ButtonProps, 'variant'> {
  ref?: React.Ref<HTMLButtonElement>;
  kbd?: string;
}

export interface ToolbarBackActionProps
  extends Omit<ToolbarActionProps, 'label' | 'icon' | 'showLabel'> {
  showLabel?: boolean;
}

export interface ToolbarSearchActionProps
  extends Omit<ToolbarActionProps, 'label' | 'icon' | 'showLabel'> {
  showLabel?: boolean;
}

export interface ToolbarSidebarToggleActionProps
  extends Omit<ToolbarActionProps, 'label' | 'icon' | 'showLabel'> {
  /** Current sidebar state — controlled, this component holds no state of its own. */
  collapsed: boolean;
  showLabel?: boolean;
}

export interface ToolbarBackForwardActionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  onBack: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onForward: (event: React.MouseEvent<HTMLButtonElement>) => void;
  backDisabled?: boolean;
  forwardDisabled?: boolean;
}

export interface ToolbarTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  label: string;
  clickable?: boolean;
}

export interface ToolbarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  align?: Align;
  /** `flex` value — `weight={1}` makes the group eat the remaining space. */
  weight?: number;
  /**
   * Overrides the toolbar's `variant` for this one group: `plain` drops the
   * glass pill (bare row), `floating` / `glass` force it on. Defaults to
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
