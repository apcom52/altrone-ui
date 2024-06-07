import { createContext, memo, useContext, useMemo } from 'react';
import s from './toolbar.module.scss';
import { ToolbarContextType, ToolbarProps } from './Toolbar.types.ts';
import clsx from 'clsx';
import { Action, Group } from './components';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';

const ToolbarContext = createContext<ToolbarContextType>({ compact: false });
export const useToolbarContext = () => useContext(ToolbarContext);

const ToolbarComponent = memo<ToolbarProps>(
  ({ children, align, compact = false, className, style, ...restProps }) => {
    const { toolbar: toolbarConfig = {} } = useConfiguration();

    const cls = clsx(
      s.Toolbar,
      {
        [s.AlignCenter]: align === 'center',
        [s.AlignEnd]: align === 'end',
        [s.AlignBetween]: align === 'between',
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
