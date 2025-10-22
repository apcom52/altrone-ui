import { ButtonProps } from './Button.types.ts';
import s from './button.module.scss';
import clsx from 'clsx';
import { useConfiguration } from 'components/configuration';
import { memo } from 'react';
import { GlassSurface } from 'components/glassSurface/GlassSurface.tsx';
import { HTMLMotionProps, motion } from 'motion/react';
import { Loading } from 'components/index.ts';
import { ButtonSuccessIcon } from './inner/Success.tsx';
import { ButtonFailedIcon } from './inner/Failed.tsx';

export const Button = memo((props: ButtonProps) => {
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
    ref,
    ...restProps
  } = props;

  const { button: buttonConfig = {} } = useConfiguration();

  const isSingleIcon = !showLabel && (icon || !additionalIcon);

  const cls = clsx(
    s.Button,
    {
      [s.Primary]: variant === 'submit',
      [s.Text]: variant === 'text',
      [s.Action]: variant === 'action',
      [s.SingleIcon]: isSingleIcon,
      [s.Danger]: danger,
      [s.WithLoading]: state !== 'idle',
      [s.Mini]: size === 'mini',
      [s.Small]: size === 's',
      [s.Large]: size === 'l',
      [s.XLarge]: size === 'xl',
    },
    className,
    buttonConfig.className
  );

  const styles = {
    ...buttonConfig.style,
    ...style,
  };

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
        className={clsx(
          s.Action,
          {
            [s.Disabled]: restProps.disabled,
            [s.WithLoading]: state !== 'idle',
            [s.Mini]: size === 'mini',
            [s.Small]: size === 's',
            [s.Large]: size === 'l',
            [s.XLarge]: size === 'xl',
          },
          className
        )}
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
      ref={ref}
      {...(restProps as HTMLMotionProps<'button'>)}
    >
      {buttonContent}
    </motion.button>
  );
});
