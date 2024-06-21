import { memo, useMemo } from 'react';
import s from './toolbar.module.scss';
import { ToolbarProps } from './Toolbar.types.ts';
import clsx from 'clsx';
import { Action, Group } from './components';
import { useConfiguration } from 'components/configuration';
import { ToolbarContext } from './Toolbar.context.ts';

const ToolbarComponent = memo<ToolbarProps>(
  ({ children, compact = false, className, style, ...restProps }) => {
    const { toolbar: toolbarConfig = {} } = useConfiguration();

    const cls = clsx(
      s.Toolbar,
      {
        [s.Compact]: compact,
      },
      className,
      toolbarConfig.className,
    );

    const styles = {
      ...toolbarConfig.style,
      ...style,
    };

    const contextValue = useMemo(() => {
      return {
        compact,
      };
    }, [compact]);

    return (
      <ToolbarContext.Provider value={contextValue}>
        <div className={cls} style={styles} {...restProps}>
          {children}
        </div>
      </ToolbarContext.Provider>
    );
  },
);

const ToolbarNamespace = Object.assign(ToolbarComponent, {
  Action,
  Group,
});

export { ToolbarNamespace as Toolbar };
