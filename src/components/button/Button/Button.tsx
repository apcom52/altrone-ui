import { forwardRef, memo, MouseEventHandler, useCallback, useRef, useState } from 'react';
import {
  ContextMenuType as ContextMenuType,
  Indicator,
  Role,
  Size,
  WithAltroneOffsets,
  WithoutDefaultOffsets
} from '../../../types';
import clsx from 'clsx';
import { Box, FloatingBox, FloatingBoxMobileBehaviour } from '../../containers';
import './button.scss';
import { ContextMenu } from '../../list';

export enum ButtonVariant {
  default = '',
  borders = 'borders',
  transparent = 'transparent',
  text = 'text'
}

export interface ButtonProps
  extends Omit<
      WithoutDefaultOffsets<React.HTMLProps<HTMLButtonElement>>,
      'style' | 'target' | 'size'
    >,
    WithAltroneOffsets {
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

    return (
      <>
        <Box
          tagName={ButtonComponents[href ? 1 : 0] as keyof JSX.IntrinsicElements}
          className={clsx('alt-button', className, {
            [`alt-button--role-${role}`]: role !== Role.default,
            [`alt-button--variant-${variant}`]: variant !== ButtonVariant.default,
            [`alt-button--size-${size}`]: size !== Size.medium,
            'alt-button--fluid': fluid,
            'alt-button--icon': isIcon
          })}
          ref={(node: HTMLButtonElement) => {
            buttonRef.current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          href={href}
          onClick={isDropdownButton ? showDropdown : onClick}
          type={href ? undefined : type}
          {...props}>
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
        </Box>
        {isDropdownVisible ? (
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

export default memo(Button);
