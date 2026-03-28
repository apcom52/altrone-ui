import { isValidElement, memo, ReactElement } from 'react';
import { ButtonProps } from './Button.types.ts';
import s from './button.module.scss';
import clsx from 'clsx';
import { useConfiguration } from 'components/configuration';
import { HTMLMotionProps, motion } from 'motion/react';
import { Loading, Tooltip } from 'components/index.ts';
import { ButtonSuccessIcon } from './inner/Success.tsx';
import { ButtonFailedIcon } from './inner/Failed.tsx';
import { Slot } from 'utils/components/Slot.tsx';
import { cloneWithRef } from 'utils/utils/cloneWithRef.ts';
import { AnyObject } from 'utils/types.ts';

const MotionSlot = motion.create(Slot);

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
    selected = false,
    disabled,
    tooltip,
    asChild,
    children,
    ...restProps
  } = props;

  const { button: buttonConfig = {} } = useConfiguration();

  const isSingleIcon = !showLabel && !!icon && !additionalIcon;
  const isLoading = state === 'loading';

  const cls = clsx(
    s.Button,
    {
      [s.Primary]: variant === 'submit',
      [s.Text]: variant === 'text',
      [s.SingleIcon]: isSingleIcon,
      [s.Danger]: danger,
      [s.WithLoading]: state !== 'idle',
      [s.Mini]: size === 'mini',
      [s.Small]: size === 's',
      [s.Large]: size === 'l',
      [s.XLarge]: size === 'xl',
      [s.Selected]: selected,
    },
    className,
    buttonConfig.className,
  );

  const styles = {
    ...buttonConfig.style,
    ...style,
  };

  const buttonDisabled = disabled || state !== 'idle';
  const tooltipContent = tooltip ?? label;

  const a11yProps = {
    'aria-label': !showLabel ? label : undefined,
    'aria-pressed': selected ? (true as const) : undefined,
    'aria-busy': isLoading ? (true as const) : undefined,
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
      {isLoading ? (
        <div className={s.ButtonLoading}>
          <Loading
            size="16px"
            strokeWidth="1.5"
            color="var(--button-text-color)"
          />
        </div>
      ) : null}
      {state === 'succeeded' && <ButtonSuccessIcon />}
      {state === 'failed' && <ButtonFailedIcon />}
    </>
  );

  let buttonElement: ReactElement;

  if (asChild) {
    if (!isValidElement(children)) {
      console.error('[Button] asChild requires a valid React element as children');
      return null;
    }

    const childWithContent = cloneWithRef(children as ReactElement, {
      children: buttonContent,
    });

    buttonElement = (
      <MotionSlot
        ref={ref}
        className={cls}
        style={styles}
        disabled={buttonDisabled}
        transition={{ duration: 0.2, ease: 'linear' }}
        whileTap={{ scale: 0.95 }}
        {...a11yProps}
        {...(restProps as AnyObject)}
      >
        {childWithContent}
      </MotionSlot>
    );
  } else {
    buttonElement = (
      <motion.button
        type={type}
        className={cls}
        transition={{
          duration: 0.2,
          ease: 'linear',
        }}
        style={styles}
        ref={ref}
        disabled={buttonDisabled}
        whileTap={{
          scale: 0.95,
        }}
        {...a11yProps}
        {...(restProps as HTMLMotionProps<'button'>)}
      >
        {buttonContent}
      </motion.button>
    );
  }

  if (!showLabel) {
    return <Tooltip content={tooltipContent}>{buttonElement}</Tooltip>;
  }

  return buttonElement;
});
