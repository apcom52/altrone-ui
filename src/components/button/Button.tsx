import { ButtonProps } from './Button.types.ts';
import { Flex } from 'components/flex';
import s from './button.module.scss';
import clsx from 'clsx';
import { useConfiguration } from 'components/configuration';
import { useRainbowEffect } from '../application/RainbowEffect.tsx';
import { forwardRef, memo, MouseEventHandler, useCallback } from 'react';

export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(
    (
      {
        label,
        leftIcon,
        rightIcon,
        transparent,
        role = 'default',
        size = 'm',
        className,
        style,
        rainbowEffect,
        ...props
      },
      ref,
    ) => {
      const { button: buttonConfig = {} } = useConfiguration();

      const {
        onMouseEnter: onRainbowMouseEnter,
        onMouseMove: onRainbowMouseMove,
        onMouseLeave: onRainbowMouseLeave,
      } = useRainbowEffect();

      const isOnlyIcon = Boolean(!label && (leftIcon || rightIcon));

      const isRainbowPropsActivated =
        typeof rainbowEffect === 'boolean'
          ? rainbowEffect
          : buttonConfig.rainbowEffect || true;

      const isRainbowEffectActivated =
        role === 'default' && isRainbowPropsActivated;

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

      const onMouseEnter = useCallback<MouseEventHandler<HTMLButtonElement>>(
        (e) => {
          props.onMouseEnter?.(e);
          onRainbowMouseEnter(e);
        },
        [props.onMouseEnter],
      );

      const onMouseMove = useCallback<MouseEventHandler<HTMLButtonElement>>(
        (e) => {
          props.onMouseMove?.(e);
          onRainbowMouseMove(e);
        },
        [props.onMouseEnter],
      );

      const onMouseLeave = useCallback<MouseEventHandler<HTMLButtonElement>>(
        (e) => {
          props.onMouseLeave?.(e);
          onRainbowMouseLeave(e);
        },
        [props.onMouseEnter],
      );

      const buttonContent = !isOnlyIcon ? (
        <Flex
          direction="horizontal"
          gap={size === 'large' ? 'small' : 'xsmall'}
          align="center"
        >
          {leftIcon ? <div className={s.Icon}>{leftIcon}</div> : null}
          <div className={s.Label}>{label}</div>
          {rightIcon ? <div className={s.Icon}>{rightIcon}</div> : null}
        </Flex>
      ) : (
        <div className={s.Icon}>{leftIcon || rightIcon}</div>
      );

      return (
        <button
          className={cls}
          style={styles}
          type="button"
          {...props}
          onMouseEnter={isRainbowEffectActivated ? onMouseEnter : undefined}
          onMouseMove={isRainbowEffectActivated ? onMouseMove : undefined}
          onMouseLeave={isRainbowEffectActivated ? onMouseLeave : undefined}
          ref={ref}
        >
          {buttonContent}
        </button>
      );
    },
  ),
);
