import { createContext, memo, useContext, useMemo } from 'react';
import s from './toolbar.module.scss';
import { ToolbarContextType, ToolbarProps } from './Toolbar.types.ts';
import clsx from 'clsx';
import { Align } from 'types';
import { Action, Group } from './components';

const ToolbarContext = createContext<ToolbarContextType>({ compact: false });
export const useToolbarContext = () => useContext(ToolbarContext);

const ToolbarComponent = memo<ToolbarProps>(
  ({ children, align, compact = false, ...restProps }) => {
    const cls = clsx(s.Toolbar, {
      [s.AlignCenter]: align === Align.center,
      [s.AlignEnd]: align === Align.end,
      [s.AlignBetween]: align === Align.between,
      [s.Compact]: compact,
    });

    const contextValue = useMemo(() => {
      return {
        compact,
      };
    }, [compact]);

    return (
      <ToolbarContext.Provider value={contextValue}>
        <div className={cls}>{children}</div>
      </ToolbarContext.Provider>
    );
  },
);

const ToolbarNamespace = Object.assign(ToolbarComponent, {
  Action,
  Group,
});

export { ToolbarNamespace as Toolbar };
