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
import { ToolbarContext } from './Toolbar.context.ts';
import { GlobalUtils } from 'utils';

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
      <ToolbarContext.Provider
        value={{ edge, orientation, variant, size }}
      >
        <div
          ref={ref}
          className={cls}
          role="toolbar"
          aria-orientation={orientation}
          {...restProps}
        >
          {children}
        </div>
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
