import React, { ReactElement, ReactNode } from 'react';
import { RenderFuncProp } from '../../types';

export interface BottomNavigationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  floating?: boolean;
}

export interface BottomNavigationItemProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  ref?: React.Ref<HTMLAnchorElement>;
  icon: ReactElement;
  label: string;
  selected?: boolean;
  badge?: string | number | ReactElement;
  /**
   * Merge the item's styling, ref and interaction props onto a single child
   * element (Slot pattern) instead of rendering an `<a>` — use to wrap a
   * router `<Link>`. The icon, label, badge and backdrop still come from props.
   */
  asChild?: boolean;
  children?: ReactNode;
  /** @deprecated Prefer `asChild`. Custom render function `(ref, props) => ReactElement`. */
  renderFunc?: RenderFuncProp<HTMLAnchorElement, BottomNavigationItemProps>;
}
