import { ButtonProps } from './Button.types.ts';
import { Flex } from 'components/flex';
import s from './button.module.scss';
import clsx from 'clsx';
import { useConfiguration } from 'components/configuration';
import { useRainbowEffect, useAltroneTheme } from 'components/application';
import { forwardRef, memo } from 'react';
import { RenderFuncProp } from 'types';

const buttonRenderFunc: RenderFuncProp<HTMLButtonElement, ButtonProps> = (
  ref,
  props,
) => {
  return <button ref={ref} {...props} />;
};

export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
      label,
      leftIcon,
      rightIcon,
      transparent,
      role = 'default',
      size = 'm',
      className,
      style,
      rainbowEffect,
      renderFunc = buttonRenderFunc,
    } = props;

    const { button: buttonConfig = {} } = useConfiguration();

    const { theme } = useAltroneTheme();

    const isRainbowPropsActivated =
      typeof rainbowEffect === 'boolean'
        ? rainbowEffect
        : buttonConfig.rainbowEffect || true;

    const isRainbowNeeded = role === 'default';

    const rainbowEffects = useRainbowEffect(
      isRainbowPropsActivated && isRainbowNeeded,
      {
        onMouseEnter: props.onMouseEnter,
        onMouseMove: props.onMouseMove,
        onMouseLeave: props.onMouseLeave,
        opacity: theme === 'dark' ? 0.33 : 1,
        blur: 11,
      },
    );

    const isOnlyIcon = Boolean(!label && (leftIcon || rightIcon));

    const cls = clsx(
      s.Button,
      {
        [s.Button_transparent]: transparent,
        [s.Primary]: role === 'primary',
        [s.Success]: role === 'success',
        [s.Warning]: role === 'warning',
        [s.Danger]: role === 'danger',
        [s.Small]: size === 's',
        [s.Large]: size === 'l',
        [s.OnlyIcon]: isOnlyIcon,
      },
      className,
      buttonConfig.className,
    );

    const styles = {
      ...buttonConfig.style,
      ...style,
    };

    const buttonContent = !isOnlyIcon ? (
      <Flex gap={size === 'l' ? 's' : 'xs'} align="center">
        {leftIcon ? <div className={s.Icon}>{leftIcon}</div> : null}
        <div className={s.Label}>{label}</div>
        {rightIcon ? <div className={s.Icon}>{rightIcon}</div> : null}
      </Flex>
    ) : (
      <div className={s.Icon}>{leftIcon || rightIcon}</div>
    );

    return renderFunc(ref, {
      type: 'button',
      ...props,
      ...rainbowEffects,
      className: cls,
      style: styles,
      children: buttonContent,
    });
  }),
);
