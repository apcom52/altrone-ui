import { memo } from 'react';
import s from './toolbar.module.scss';
import { ToolbarProps } from './Toolbar.types.ts';
import clsx from 'clsx';
import { Action, Center, Group, Leading, Trailing } from './components';
import { useConfiguration } from 'components/configuration';

const ToolbarComponent = memo<ToolbarProps>(
  ({ children, direction = 'horizontal', className, style, ...restProps }) => {
    const { toolbar: toolbarConfig = {} } = useConfiguration();

    const cls = clsx(
      s.Toolbar,
      {
        [s.Vertical]: direction === 'vertical',
      },
      className,
      toolbarConfig.className
    );

    const styles = {
      ...toolbarConfig.style,
      ...style,
    };

    return (
      <div
        className={cls}
        style={styles}
        role="toolbar"
        aria-orientation={direction}
        {...restProps}
      >
        {children}
      </div>
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
