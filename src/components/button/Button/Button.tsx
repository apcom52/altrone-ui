import {forwardRef, memo, Ref, useCallback, useRef, useState} from "react";
import {ContextMenu as ContextMenuType, Role, Size, WithAltroneOffsets, WithoutDefaultOffsets} from "../../../types";
import clsx from "clsx";
import {Box, FloatingBox} from "../../containers";
import './button.scss'
import {ContextMenu} from "../../list";
import {FloatingBoxMobileBehaviour} from "../../containers/FloatingBox/FloatingBox";

export enum ButtonVariant {
  default,
  borders = 'borders',
  transparent = 'transparent',
  text = 'text'
}

export interface ButtonProps extends Omit<WithoutDefaultOffsets<React.HTMLProps<HTMLButtonElement>>, 'style' | 'target' | 'size'>, WithAltroneOffsets {
  role?: Role
  variant?: ButtonVariant
  href?: string
  target?: HTMLAnchorElement['target'],
  fluid?: boolean
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
  size?: Size
  dropdown?: ContextMenuType
  isIcon?: boolean
}

const ButtonComponents = [
  'button',
  'a'
]

const Button = forwardRef(({
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
  ...props
}: ButtonProps, ref: Ref<HTMLButtonElement>) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const isDropdownButton = !!dropdown.length

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const showDropdown = useCallback(() => {
    setIsDropdownVisible(true)
  }, [])

  const hideDropdown = useCallback(() => {
    setIsDropdownVisible(false)
  }, [])

  return <>
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
        buttonRef.current = node
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      }}
      href={href}
      onClick={isDropdownButton ? showDropdown : onClick}
      type={type}
      {...props}
    >
      { leftIcon ? <span className='alt-button__leftIcon'>{leftIcon}</span> : null }
      {children}
      { rightIcon ? <span className='alt-button__rightIcon'>{rightIcon}</span> : null }
    </Box>
    {isDropdownVisible ? <FloatingBox targetRef={buttonRef.current} onClose={hideDropdown} placement='bottom' mobileBehaviour={FloatingBoxMobileBehaviour.modal}>
      <ContextMenu menu={dropdown} />
    </FloatingBox> : null}
  </>
})

export default memo(Button)