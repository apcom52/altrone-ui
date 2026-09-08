import { memo, useEffect } from 'react';
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
  Logo,
  SearchAction,
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
  floating: s.Floating,
  glass: s.Glass,
} as const;

const PLACEMENT_CLASS = {
  top: s.Top,
  bottom: s.Bottom,
  left: s.Left,
  right: s.Right,
} as const;

const ToolbarComponent = memo(
  ({
    ref,
    children,
    variant = 'glass',
    placement = 'top',
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
      placement === 'left' || placement === 'right' ? 'vertical' : 'horizontal';

    const cls = clsx(
      s.Toolbar,
      VARIANT_CLASS[variant],
      PLACEMENT_CLASS[placement],
      SIZE_CLASS[size],
      {
        [s.Sticky]: isSticky,
        [s.Backdrop]: showBackdrop,
      },
      className,
    );

    return (
      <ToolbarContext.Provider
        value={{ placement, orientation, variant, size }}
      >
        <div
          ref={ref}
          className={cls}
          role="toolbar"
          aria-orientation={orientation}
          {...restProps}
        >
          {variant === 'floating' ? (
            <div className={s.FloatingInner}>{children}</div>
          ) : (
            children
          )}
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
  BackAction,
  SearchAction,
  SidebarToggleAction,
  BackForwardAction,
});

export { ToolbarNamespace as Toolbar };
