import { ButtonProps } from './Button.types.ts';
import { Flex } from 'components/flex';
import s from './button.module.scss';
import clsx from 'clsx';
import { useConfiguration } from 'components/configuration';
import { useAltroneTheme } from 'components/application';
import { forwardRef, memo } from 'react';
import { Loading } from '../loading';
import { Badge } from 'components/badge/Badge.tsx';
import { Box } from 'components/box/Box.tsx';

export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
      label,
      icon,
      additionalIcon,
      type = 'secondary',
      htmlType = 'button',
      showLabel = true,
      danger,
      size = 'm',
      className,
      style,
      loading,
      badge,
      ...restProps
    } = props;

    const { button: buttonConfig = {} } = useConfiguration();

    const { theme } = useAltroneTheme();

    const cls = clsx(
      s.Button,
      {
        [s.Primary]: type === 'primary',
        [s.Default]: type === 'default',
        [s.Transparent]: type === 'transparent',
        [s.Small]: size === 's',
        [s.Large]: size === 'l',
        [s.WithLoading]: loading,
      },
      className,
      buttonConfig.className
    );

    const styles = {
      ...buttonConfig.style,
      ...style,
    };

    // const loadingSize = size === 'l' ? '20px' : size === 's' ? '12px' : '16px';

    // const loadingNode = loading ? (
    //   <div className={s.ButtonLoading}>
    //     <Loading
    //       strokeWidth="1.5"
    //       size={loadingSize}
    //       color="var(--button-loading-color)"
    //     />
    //   </div>
    // ) : null;

    // const badgeCls = clsx(s.Badge, buttonConfig.badgeClassName);

    // const buttonContent = !isOnlyIcon ? (
    //   <Flex gap={size === 'l' ? 's' : 'xs'} align="center">
    //     {leftIcon ? <div className={s.Icon}>{leftIcon}</div> : null}
    //     <div className={s.Label}>{label}</div>
    //     {rightIcon ? <div className={s.Icon}>{rightIcon}</div> : null}
    //     {badge && <Badge className={badgeCls}>{badge}</Badge>}
    //     {loadingNode}
    //   </Flex>
    // ) : (
    //   <div className={s.Icon}>
    //     {leftIcon || rightIcon}
    //     {badge && <Badge className={badgeCls}>{badge}</Badge>}
    //     {loadingNode}
    //   </div>
    // );

    return (
      <button
        ref={ref}
        className={cls}
        style={styles}
        title={label}
        {...restProps}
      >
        {/* {icon ? <div className={s.ButtonIcon}>{icon}</div> : null} */}
        {showLabel && label ? (
          <span className={s.ButtonLabel}>{label}</span>
        ) : null}
        {/* {additionalIcon ? (
          <div className={s.ButtonIcon}>{additionalIcon}</div>
        ) : null} */}
      </button>
    );
  })
);
