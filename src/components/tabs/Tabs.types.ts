import React, { ReactElement } from 'react';
import { RenderFuncProp } from '../../types';

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export interface TabsItemProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  label: string;
  icon?: ReactElement;
  selected?: boolean;
  /** Hide the text label — icon-only tab. `label` still supplies the accessible name. */
  showLabel?: boolean;
  /** Disables the tab: not focusable, ignores activation. */
  disabled?: boolean;
  badge?: string | number | ReactElement;
  /**
   * Merge the tab's styling/ref/props onto a single child element (e.g. a
   * router `<Link>`) instead of rendering a `<button>`/`<a>`.
   */
  asChild?: boolean;
  children?: ReactElement;
  ref?: React.Ref<HTMLElement>;
  /** @deprecated Prefer `asChild`. Custom render function `(ref, props) => ReactElement`. */
  renderFunc?: RenderFuncProp<HTMLAnchorElement, TabsItemProps>;
}
