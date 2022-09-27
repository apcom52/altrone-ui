import {memo} from "react";
import {Size, WithAltroneOffsets, WithoutDefaultOffsets} from "../../../types";
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

interface ButtonProps extends Omit<WithoutDefaultOffsets<React.HTMLProps<HTMLButtonElement>>, 'style' | 'target' | 'size'>, WithAltroneOffsets {
  style?: ButtonStyle
  variant?: ButtonVariant
  href?: string
  target?: HTMLAnchorElement['target'],
  fluid?: boolean
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
  size?: Size
}

const ButtonComponents = [
  'button',
  'a'
]

const Button = ({
  children,
  style = ButtonStyle.default,
  variant = ButtonVariant.default,
  href,
  className,
  fluid = false,
  leftIcon,
  rightIcon,
  size = Size.medium,
  ...props
}: ButtonProps) => {
  return <Box
    tagName={ButtonComponents[href ? 1 : 0] as keyof JSX.IntrinsicElements}
    className={clsx('alt-button', className, {
      [`alt-button--style-${style}`]: style !== ButtonStyle.default,
      [`alt-button--variant-${variant}`]: variant !== ButtonVariant.default,
      [`alt-button--size-${size}`]: size !== Size.medium,
      'alt-button--fluid': fluid,
    })}
    href={href}
    {...props}
  >
    { leftIcon ? <span className='alt-button__leftIcon'>{leftIcon}</span> : null }
    {children}
    { rightIcon ? <span className='alt-button__rightIcon'>{rightIcon}</span> : null }
  </Box>
}

export default memo(Button)