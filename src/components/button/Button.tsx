import { ButtonProps } from './Button.types.ts';
import s from './button.module.scss';
import clsx from 'clsx';
import { useConfiguration } from 'components/configuration';
import { useAltroneTheme } from 'components/application';
import { forwardRef, memo } from 'react';
import { GlassSurface } from 'components/glassSurface/GlassSurface.tsx';
import { HTMLMotionProps, motion } from 'motion/react';
import { Loading } from 'components/index.ts';
import { ButtonSuccessIcon } from './inner/Success.tsx';
import { ButtonFailedIcon } from './inner/Failed.tsx';

export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
      label,
      icon,
      additionalIcon,
      variant = 'default',
      type = 'button',
      showLabel = true,
      danger,
      size = 'm',
      className,
      style,
      state = 'idle',
      badge,
      ...restProps
    } = props;

    const { button: buttonConfig = {} } = useConfiguration();

    const isSingleIcon = !showLabel && (icon || !additionalIcon);

    const { theme } = useAltroneTheme();

    const cls = clsx(
      s.Button,
      {
        [s.Primary]: variant === 'submit',
        [s.Text]: variant === 'text',
        [s.Action]: variant === 'action',
        [s.SingleIcon]: isSingleIcon,
        [s.Danger]: danger,
        [s.WithLoading]: state !== 'idle',
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

    const buttonContent = (
      <>
        <div className={s.ButtonContent}>
          {icon ? <div className={s.ButtonIcon}>{icon}</div> : null}
          {showLabel && label ? (
            <span className={s.ButtonLabel}>{label}</span>
          ) : null}
          {additionalIcon ? (
            <div className={s.ButtonIcon}>{additionalIcon}</div>
          ) : null}
          {badge ? <div className={s.ButtonBadge}>{badge}</div> : null}
        </div>
        {state === 'loading' ? (
          <div className={s.ButtonLoading}>
            <Loading
              size="16px"
              strokeWidth="1.5"
              color="var(--button-text-color)"
            />
          </div>
        ) : null}
        {state === 'successed' && <ButtonSuccessIcon />}
        {state === 'failed' && <ButtonFailedIcon />}
      </>
    );

    if (variant === 'action') {
      return (
        <GlassSurface
          as="button"
          glow={!restProps.disabled}
          className={clsx(s.Action, {
            [s.Disabled]: restProps.disabled,
            [s.WithLoading]: state !== 'idle',
          })}
          contentClassName={clsx(s.ActionContent, {
            [s.Disabled]: restProps.disabled,
          })}
          childrenClassName={clsx(s.ActionChildren, {
            [s.SingleIcon]: isSingleIcon,
            [s.Danger]: danger,
            [s.Disabled]: restProps.disabled,
          })}
          {...(restProps as HTMLMotionProps<'div'>)}
        >
          {buttonContent}
        </GlassSurface>
      );
    }

    return (
      <motion.button
        type={type}
        className={cls}
        style={styles}
        title={label}
        {...(restProps as HTMLMotionProps<'button'>)}
      >
        {buttonContent}
      </motion.button>
    );
  })
);
