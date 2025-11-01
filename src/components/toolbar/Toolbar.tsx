import { memo } from 'react';
import s from './toolbar.module.scss';
import { ToolbarProps } from './Toolbar.types.ts';
import clsx from 'clsx';
import { Action, Center, Group, Leading, Trailing } from './components';
import { useConfiguration } from 'components/configuration';
import { ToolbarPlacementContext } from './Toolbar.context.ts';

const ToolbarComponent = memo<ToolbarProps>(
  ({
    children,
    placement = 'top',
    fixed = false,
    showBackdrop = false,
    className,
    style,
    ...restProps
  }) => {
    const { toolbar: toolbarConfig = {} } = useConfiguration();

    const cls = clsx(
      s.ToolbarWrapper,
      {
        [s.Fixed]: fixed,
        [s.Top]: placement === 'top',
        [s.Left]: placement === 'left',
        [s.Right]: placement === 'right',
        [s.Bottom]: placement === 'bottom',
        [s.Backdrop]: showBackdrop,
      },
      className,
      toolbarConfig.className
    );

    const styles = {
      ...toolbarConfig.style,
      ...style,
    };

    return (
      <ToolbarPlacementContext.Provider value={placement}>
        <div
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
  }
);

const ToolbarNamespace = Object.assign(ToolbarComponent, {
  Action,
  Group,
  Leading,
  Center,
  Trailing,
});

export { ToolbarNamespace as Toolbar };
