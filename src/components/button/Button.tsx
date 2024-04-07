import { ButtonProps } from './Button.types.ts';
import { Flex } from 'components';
import s from './button.module.scss';
import clsx from 'clsx';
import { Align, Direction, Gap, Role, Size } from 'types';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';
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
        role = Role.default,
        size = Size.medium,
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
        role === Role.default && isRainbowPropsActivated;

      const cls = clsx(
        s.Button,
        {
          [s.Button_transparent]: transparent,
          [s.Primary]: role === Role.primary,
          [s.Success]: role === Role.success,
          [s.Warning]: role === Role.warning,
          [s.Danger]: role === Role.danger,
          [s.Small]: size === Size.small,
          [s.Large]: size === Size.large,
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
          direction={Direction.horizontal}
          gap={size === Size.large ? Gap.small : Gap.xsmall}
          align={Align.center}
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
