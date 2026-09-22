import { memo, useEffect } from 'react';
import s from './toolbar.module.scss';
import { ToolbarProps } from './Toolbar.types.ts';
import clsx from 'clsx';
import {
  Action,
  Center,
  Group,
  Leading,
  Logo,
  Separator,
  SidebarToggleAction,
  Title,
  Trailing,
} from './components';
import { ToolbarBalanceContext, ToolbarContext } from './Toolbar.context.ts';
import { GlobalUtils, mergeRefs } from 'utils';
import { useToolbarOverflow } from './useToolbarOverflow.tsx';
import { useToolbarRegionBalance } from './useToolbarRegionBalance.ts';

const SIZE_CLASS = {
  mini: s.SizeMini,
  s: s.SizeS,
  m: s.SizeM,
  l: s.SizeL,
  xl: s.SizeXl,
} as const;

const VARIANT_CLASS = {
  plain: s.Plain,
  grouped: s.Grouped,
  solid: s.Solid,
} as const;

const EDGE_CLASS = {
  top: s.Top,
  bottom: s.Bottom,
  left: s.Left,
  right: s.Right,
} as const;

const ToolbarComponent = memo(
  ({
    ref,
    children,
    variant = 'solid',
    edge = 'top',
    size = 'm',
    sticky = false,
    fixed,
    showBackdrop = false,
    className,
    ...restProps
  }: ToolbarProps) => {
    useEffect(() => {
      if (fixed !== undefined) {
        GlobalUtils.deprecatedMessage('Toolbar', 'fixed', 'sticky', 'v4');
      }
    }, [fixed]);

    const isSticky = sticky || fixed === true;
    const orientation =
      edge === 'left' || edge === 'right' ? 'vertical' : 'horizontal';

    const { containerRef, content } = useToolbarOverflow(children, orientation);
    const balance = useToolbarRegionBalance(containerRef, orientation);

    const cls = clsx(
      s.Toolbar,
      VARIANT_CLASS[variant],
      EDGE_CLASS[edge],
      SIZE_CLASS[size],
      {
        [s.Sticky]: isSticky,
        [s.Backdrop]: showBackdrop,
      },
      className,
    );

    return (
      <ToolbarContext.Provider value={{ edge, orientation, variant, size }}>
        <ToolbarBalanceContext.Provider value={balance}>
          <div
            ref={mergeRefs(ref, containerRef)}
            className={cls}
            role="toolbar"
            aria-orientation={orientation}
            {...restProps}
          >
            {content}
          </div>
        </ToolbarBalanceContext.Provider>
      </ToolbarContext.Provider>
    );
  },
);

const ToolbarNamespace = Object.assign(ToolbarComponent, {
  Action,
  Group,
  Separator,
  Logo,
  Leading,
  Center,
  Trailing,
  Title,
  SidebarToggleAction,
});

export { ToolbarNamespace as Toolbar };
