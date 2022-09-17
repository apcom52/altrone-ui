import {memo} from "react";
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

interface ButtonProps extends Omit<WithoutDefaultOffsets<React.HTMLProps<HTMLButtonElement>>, 'style' | 'target'>, WithAltroneOffsets {
  style?: ButtonStyle
  variant?: ButtonVariant
  href?: string
  target?: HTMLAnchorElement['target'],
}

const ButtonComponents = [
  'button',
  'a'
]

const Button = ({ children, style = ButtonStyle.default, variant = ButtonVariant.default, href, className, ...props }: ButtonProps) => {
  return <Box
    tagName={ButtonComponents[href ? 1 : 0] as keyof JSX.IntrinsicElements}
    className={clsx('alt-button', className, {
      [`alt-button--style-${style}`]: style !== ButtonStyle.default,
      [`alt-button--variant-${variant}`]: variant !== ButtonVariant.default,
    })}
    href={href}
    {...props}
  >
    {children}
  </Box>
}

export default memo(Button)