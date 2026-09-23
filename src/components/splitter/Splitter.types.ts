import React from 'react';

/** How a collapsed panel's expand button is shown on its divider. */
export type SplitterCollapsedControlsVisibility = 'always' | 'hover' | 'never';

/** Icons unique to `Splitter`, overridable as a group via the `icons` prop. */
export interface SplitterIconSet {
  chevronLeft: React.ReactElement;
  chevronRight: React.ReactElement;
  chevronUp: React.ReactElement;
  chevronDown: React.ReactElement;
}

export interface SplitterHandle {
  /** Collapse a panel by index */
  collapse: (panelIndex: number) => void;
  /** Expand a panel by index */
  expand: (panelIndex: number) => void;
  /** Toggle collapsed state of a panel by index */
  toggle: (panelIndex: number) => void;
  /** Returns the current sizes array (percentages) */
  getSizes: () => number[];
  /** Returns the current collapsed state array */
  getCollapsed: () => boolean[];
}

export interface SplitterPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Forwarded to the panel's root DOM element, alongside the internal drag/collapse ref. */
  ref?: React.Ref<HTMLDivElement>;
  /** Allow this panel to be fully collapsed via the divider toggle button */
  collapsible?: boolean;
  /** Initial size in percent (0–100). Uncontrolled — panels without one share the remaining space equally. */
  defaultSize?: number;
  /** Minimum size in percent (0–100). Default: 0 */
  minSize?: number;
  /** Maximum size in percent (0–100). Default: 100 */
  maxSize?: number;
  /** When false the adjacent divider becomes non-draggable. Default: true */
  resizable?: boolean;
}

export interface SplitterProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  /** Axis along which panels are split. Default: 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Controlled panel sizes (percent, aligned to panel order), pairs with
   * `onSizesChange`. Omit for uncontrolled (each panel's own `defaultSize`).
   */
  sizes?: number[];
  /** Fires whenever sizes settle — end of a drag, or a panel collapse/expand. Pairs with `sizes`. */
  onSizesChange?: (sizes: number[]) => void;
  /** Fired on every pointer-move during drag */
  onResize?: (sizes: number[], event: PointerEvent) => void;
  /** Fired when a drag interaction begins */
  onResizeStart?: (sizes: number[], event: PointerEvent) => void;
  /** Fired when a drag interaction ends */
  onResizeEnd?: (sizes: number[], event: PointerEvent) => void;
  /** Fired when a panel is collapsed or expanded */
  onCollapse?: (panelIndex: number, collapsed: boolean, event?: React.MouseEvent<HTMLButtonElement>) => void;
  /** Show or hide the built-in collapse/expand buttons. Default: true */
  showControls?: boolean;
  /**
   * How the expand button on a collapsed panel's divider is shown.
   * `'always'` (default) — persistently visible while the panel is collapsed.
   * `'hover'` — only on divider hover / button focus, like the other controls.
   * `'never'` — not rendered; expand such a panel via `controlRef`.
   */
  collapsedControlsVisibility?: SplitterCollapsedControlsVisibility;
  /** Ref that exposes imperative collapse/expand/toggle API */
  controlRef?: React.Ref<SplitterHandle>;
  /** Overrides for the four directional chevrons used by the collapse controls. */
  icons?: Partial<SplitterIconSet>;
}
