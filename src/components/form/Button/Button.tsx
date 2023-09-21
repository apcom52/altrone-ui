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
import { FloatingBox, FloatingBoxMobileBehaviour } from '../../containers';
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
  dropdown?: ContextMenuType;
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
      dropdown = [],
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
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const isDropdownButton = !!dropdown.length;

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const showDropdown = useCallback<MouseEventHandler>(() => {
      setIsDropdownVisible(true);
    }, []);

    const hideDropdown = useCallback(() => {
      setIsDropdownVisible(false);
    }, []);

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
        ref: (node: HTMLButtonElement) => {
          buttonRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        },
        href,
        type: href ? undefined : type,
        onClick: isDropdownButton ? showDropdown : onClick,
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
            <Loading size={size} />
          </div>
        )}
        {!loading && progress !== undefined && (
          <Progress className="alt-button__progress" value={progress} size={Size.small} />
        )}
        {!loading && isDropdownVisible ? (
          <FloatingBox
            targetElement={buttonRef.current}
            onClose={hideDropdown}
            placement="bottom"
            mobileBehaviour={FloatingBoxMobileBehaviour.modal}
            useRootContainer={true}
            closeOnAnotherFloatingBoxClick>
            <ContextMenu onClose={hideDropdown} menu={dropdown} />
          </FloatingBox>
        ) : null}
      </>
    );
  }
);

Button.displayName = 'Button';

export default memo(Button) as typeof Button;
