import {forwardRef, memo, Ref} from "react";
import {WithAltroneOffsets, WithoutDefaultOffsets} from "../../../types";
import clsx from "clsx";
import {Box} from "../../containers";
import './button.scss'

export enum ButtonStyle {
  default,
  primary = 'primary',
  success = 'success',
  danger = 'danger',
}

export enum ButtonVariant {
  default,
  borders = 'borders',
  transparent = 'transparent',
  text = 'text'
}

export enum ButtonSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
  xlarge = 'xlarge'
}

interface ButtonProps extends Omit<WithoutDefaultOffsets<React.HTMLProps<HTMLButtonElement>>, 'style' | 'target' | 'size'>, WithAltroneOffsets {
  style?: ButtonStyle
  variant?: ButtonVariant
  href?: string
  target?: HTMLAnchorElement['target'],
  fluid?: boolean
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
  size?: ButtonSize
}

const ButtonComponents = [
  'button',
  'a'
]

const Button = forwardRef(({
  children,
  style = ButtonStyle.default,
  variant = ButtonVariant.default,
  href,
  className,
  fluid = false,
  leftIcon,
  rightIcon,
  size = ButtonSize.medium,
  ...props
}: ButtonProps, ref: Ref<HTMLButtonElement>) => {
  return <Box
    tagName={ButtonComponents[href ? 1 : 0] as keyof JSX.IntrinsicElements}
    className={clsx('alt-button', className, {
      [`alt-button--style-${style}`]: style !== ButtonStyle.default,
      [`alt-button--variant-${variant}`]: variant !== ButtonVariant.default,
      [`alt-button--size-${size}`]: size !== ButtonSize.medium,
      'alt-button--fluid': fluid,
    })}
    ref={ref}
    href={href}
    {...props}
  >
    { leftIcon ? <span className='alt-button__leftIcon'>{leftIcon}</span> : null }
    {children}
    { rightIcon ? <span className='alt-button__rightIcon'>{rightIcon}</span> : null }
  </Box>
})

export default memo(Button)