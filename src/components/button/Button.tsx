import { ButtonProps } from './Button.types.ts';
import { Flex } from 'components/flex';
import s from './button.module.scss';
import clsx from 'clsx';
import { useConfiguration } from 'components/configuration';
import { useRainbowEffect, useAltroneTheme } from 'components/application';
import { forwardRef, memo, useEffect } from 'react';
import { RenderFuncProp } from 'types';
import { GlobalUtils } from '../../utils';
import { Loading } from '../loading';

const buttonRenderFunc: RenderFuncProp<HTMLButtonElement, ButtonProps> = (
  ref,
  props,
) => {
  const { ariaRole, ...restProps } = props;

  return <button ref={ref} role={props.ariaRole} {...restProps} />;
};

export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
      label,
      showLabel,
      leftIcon,
      rightIcon,
      transparent,
      role,
      severity,
      ariaRole = 'button',
      size = 'm',
      className,
      style,
      rainbowEffect,
      loading,
      renderFunc = buttonRenderFunc,
    } = props;

    const { button: buttonConfig = {} } = useConfiguration();

    const buttonSeverity = severity ?? role ?? 'default';

    const { theme } = useAltroneTheme();

    const isRainbowPropsActivated =
      typeof rainbowEffect === 'boolean'
        ? rainbowEffect
        : buttonConfig.rainbowEffect || true;

    const isRainbowNeeded = buttonSeverity === 'default';

    const rainbowEffects = useRainbowEffect(
      isRainbowPropsActivated && isRainbowNeeded,
      {
        onMouseEnter: props.onMouseEnter,
        onMouseMove: props.onMouseMove,
        onMouseLeave: props.onMouseLeave,
        onWheel: props.onWheel,
        onFocus: props.onFocus,
        opacity: theme === 'dark' ? 0.33 : 1,
        blur: 11,
      },
    );

    const isOnlyIcon =
      typeof showLabel === 'boolean'
        ? !showLabel
        : Boolean(!label && (leftIcon || rightIcon));

    const cls = clsx(
      s.Button,
      {
        [s.Button_transparent]: transparent,
        [s.Primary]: buttonSeverity === 'primary',
        [s.Success]: buttonSeverity === 'success',
        [s.Warning]: buttonSeverity === 'warning',
        [s.Danger]: buttonSeverity === 'danger',
        [s.Small]: size === 's',
        [s.Large]: size === 'l',
        [s.OnlyIcon]: isOnlyIcon,
        [s.WithLoading]: loading,
      },
      className,
      buttonConfig.className,
    );

    const styles = {
      ...buttonConfig.style,
      ...style,
    };

    const loadingSize = size === 'l' ? '20px' : size === 's' ? '12px' : '16px';

    const loadingNode = loading ? (
      <div className={s.ButtonLoading}>
        <Loading
          strokeWidth="1.5"
          size={loadingSize}
          color="var(--button-loading-color)"
        />
      </div>
    ) : null;

    const buttonContent = !isOnlyIcon ? (
      <Flex gap={size === 'l' ? 's' : 'xs'} align="center">
        {leftIcon ? <div className={s.Icon}>{leftIcon}</div> : null}
        <div className={s.Label}>{label}</div>
        {rightIcon ? <div className={s.Icon}>{rightIcon}</div> : null}
        {loadingNode}
      </Flex>
    ) : (
      <div className={s.Icon}>
        {leftIcon || rightIcon}
        {loadingNode}
      </div>
    );

    useEffect(() => {
      if (role) {
        GlobalUtils.deprecatedMessage('Button', 'role', 'severity', '4.0');
      }
    }, [role]);

    useEffect(() => {
      if (!label) {
        console.warn(
          GlobalUtils.formatConsoleMessage(
            '[Altrone]: you passed empty [[label]] prop in Button, but it will be required in 4.0. Please fill [[label]] prop now and set [[showLabel]] to [[false]] if necessary',
          ),
        );
      }
    }, [label]);

    return renderFunc(ref, {
      type: 'button',
      ...props,
      ...rainbowEffects,
      ariaRole,
      className: cls,
      style: styles,
      children: buttonContent,
      title: props.title ?? label,
    });
  }),
);
