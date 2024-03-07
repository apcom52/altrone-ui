import React, {
  forwardRef,
  memo,
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useRef,
  useState
} from 'react';
import {
  ContextMenuType as ContextMenuType,
  Indicator,
  Role,
  Size,
  Elevation
} from '../../../types';
import clsx from 'clsx';
import { Popover } from '../../containers';
import { ContextMenu } from '../../list';
import { Loading, Progress } from '../../indicators';
import './button.scss';

export enum ButtonVariant {
  default = '',
  borders = 'borders',
  transparent = 'transparent',
  text = 'text'
}

export interface ButtonProps extends PropsWithChildren {
  role?: Role;
  variant?: ButtonVariant;
  href?: string;
  target?: HTMLAnchorElement['target'];
  fluid?: boolean;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  size?: Size;
  isIcon?: boolean;
  indicator?: Indicator;
  loading?: boolean;
  progress?: number;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: HTMLButtonElement['type'];
  elevation?: Elevation;
}

const ButtonComponents = ['button', 'a'];

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      role = Role.default,
      variant = ButtonVariant.default,
      href,
      className,
      fluid = false,
      leftIcon,
      rightIcon,
      size = Size.medium,
      onClick,
      type = 'button',
      isIcon = false,
      indicator = undefined,
      loading = false,
      progress = undefined,
      elevation = Elevation.convex,
      ...props
    },
    ref
  ) => {
    return React.createElement(
      ButtonComponents[href ? 1 : 0],
      {
        className: clsx('alt-button', className, {
          [`alt-button--role-${role}`]: role !== Role.default,
          [`alt-button--variant-${variant}`]: variant !== ButtonVariant.default,
          [`alt-button--size-${size}`]: size !== Size.medium,
          'alt-button--fluid': fluid,
          'alt-button--icon': isIcon,
          'alt-button--loading': loading,
          [`alt-button--elevation-${elevation}`]: elevation !== Elevation.convex
        }),
        ref,
        href,
        type: href ? undefined : type,
        onClick: onClick,
        ...props
      },
      <>
        {leftIcon ? <span className="alt-button__leftIcon">{leftIcon}</span> : null}
        {children}
        {indicator && (
          <div
            className={clsx('alt-button__indicator', {
              'alt-button__indicator--position-corner': indicator.position === 'corner'
            })}>
            {indicator.value}
          </div>
        )}
        {rightIcon ? <span className="alt-button__rightIcon">{rightIcon}</span> : null}
        {loading && (
          <div className="alt-button__loading">
            <Loading size={size} color="currentColor" />
          </div>
        )}
        {!loading && progress !== undefined && (
          <Progress className="alt-button__progress" value={progress} size={Size.small} />
        )}
      </>
    );
  }
);

Button.displayName = 'Button';

export default memo(Button) as typeof Button;
