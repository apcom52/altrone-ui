import { memo } from 'react';
import s from './toolbar.module.scss';
import { ToolbarProps } from './Toolbar.types.ts';
import clsx from 'clsx';
import {
  Action,
  BackAction,
  BackForwardAction,
  Center,
  Group,
  Leading,
  SearchAction,
  SidebarToggleAction,
  Title,
  Trailing,
} from './components';
import { ToolbarPlacementContext } from './Toolbar.context.ts';

const ToolbarComponent = memo(
  ({
    ref,
    children,
    placement = 'top',
    fixed = false,
    showBackdrop = false,
    className,
    style,
    ...restProps
  }: ToolbarProps) => {
    const cls = clsx(
      s.ToolbarWrapper,
      {
        [s.Absolute]: fixed,
        [s.Top]: placement === 'top',
        [s.Left]: placement === 'left',
        [s.Right]: placement === 'right',
        [s.Bottom]: placement === 'bottom',
        [s.Backdrop]: showBackdrop,
      },
      className,
    );

    const styles = {
      ...style,
    };

    return (
      <ToolbarPlacementContext.Provider value={placement}>
        <div
          ref={ref}
          className={cls}
          style={styles}
          role="toolbar"
          aria-orientation={
            placement === 'left' || placement === 'right'
              ? 'vertical'
              : 'horizontal'
          }
          {...restProps}
        >
          <div className={s.Toolbar}>{children}</div>
        </div>
      </ToolbarPlacementContext.Provider>
    );
  },
);

const ToolbarNamespace = Object.assign(ToolbarComponent, {
  Action,
  Group,
  Leading,
  Center,
  Trailing,
  Title,
  BackAction,
  SearchAction,
  SidebarToggleAction,
  BackForwardAction,
});

export { ToolbarNamespace as Toolbar };
