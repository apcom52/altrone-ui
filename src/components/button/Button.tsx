import { isValidElement, memo, ReactElement, Ref } from 'react';
import { ButtonProps } from './Button.types.ts';
import s from './button.module.scss';
import clsx from 'clsx';
import { HTMLMotionProps, motion, useReducedMotionConfig } from 'motion/react';
import { Box, BoxMaterial } from 'components/box';
import { Loading } from 'components/loading/Loading.tsx';
import { Tooltip } from 'components/tooltip/Tooltip.tsx';
import { ButtonSuccessIcon } from './inner/Success.tsx';
import { ButtonFailedIcon } from './inner/Failed.tsx';
import { cloneWithRef } from 'utils/utils/cloneWithRef.ts';
import { AnyObject } from 'utils/types.ts';
import { Size } from 'types';

type Variant = NonNullable<ButtonProps['variant']>;

const MATERIAL_BY_VARIANT: Record<Variant, BoxMaterial> = {
  submit: 'solid',
  default: 'plate',
  text: 'transparent',
};

/* Horizontal padding only — Button's own hand-tuned scale, not Box's
   control-role matrix (see spacing.md, where it's called out as intentionally
   off-matrix). Vertical padding is 0: the height is set purely by Box's
   `min-height: var(--box-size)` so it stays exactly the size tier regardless
   of content (a taller `badge` no longer inflates it). */
const PADDING_X_BY_SIZE: Record<Size, string> = {
  mini: '6px',
  s: 'var(--gap)',
  m: 'var(--l-gap)',
  l: '16px',
  xl: '20px',
};

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
    kbd,
    asChild,
    children,
    ...restProps
  } = props;

  const isSingleIcon = !showLabel && !!icon && !additionalIcon;
  const isLoading = state === 'loading';

  /* `MotionConfig`'s `reducedMotion` doesn't reliably suppress `layout`
     animations, so gate them explicitly. Follows both the OS setting and a
     `<MotionConfig reducedMotion>` override. */
  const animateLayout = !useReducedMotionConfig();
  const animateLayoutValue = animateLayout ? 'size' : undefined;

  const cls = clsx(
    s.Button,
    {
      [s.Primary]: variant === 'submit',
      [s.Danger]: danger,
      [s.SingleIcon]: isSingleIcon,
      [s.WithLoading]: state !== 'idle',
      [s.Mini]: size === 'mini',
      [s.Small]: size === 's',
      [s.Large]: size === 'l',
      [s.XLarge]: size === 'xl',
      [s.Selected]: selected,
    },
    className,
  );

  const buttonDisabled = disabled || state !== 'idle';
  const tooltipContent = tooltip ?? label;

  const padding = isSingleIcon ? 0 : { x: PADDING_X_BY_SIZE[size], y: 0 };

  const boxTone = danger
    ? 'danger'
    : variant === 'submit'
      ? 'accent'
      : 'neutral';

  /* On a labelled button the badge sits inline at the end of the content row.
     On an icon-only button there's no room for that, so it becomes a `plate`
     chip floating over the top-right corner (rendered outside the content row,
     positioned against the button element). */
  const badgeElement = badge ? (
    <Box
      shape="pill"
      material={isSingleIcon ? 'plate' : 'translucent'}
      tone="neutral"
      size="var(--button-badge-size)"
      width="auto"
      padding={{ x: 'var(--button-badge-padding)', y: 0 }}
      className={clsx(s.ButtonBadge, { [s.ButtonBadgeCorner]: isSingleIcon })}
    >
      {badge}
    </Box>
  ) : null;

  const buttonContent = (
    <>
      <motion.div className={s.ButtonContent} layout={animateLayoutValue}>
        {icon ? (
          <motion.div className={s.ButtonIcon} layout={animateLayoutValue}>
            {icon}
          </motion.div>
        ) : null}
        {showLabel && label ? (
          <motion.span className={s.ButtonLabel} layout={animateLayoutValue}>
            {label}
          </motion.span>
        ) : null}
        {additionalIcon ? (
          <motion.div className={s.ButtonIcon} layout={animateLayoutValue}>
            {additionalIcon}
          </motion.div>
        ) : null}
        {isSingleIcon ? null : badgeElement}
      </motion.div>
      {isSingleIcon ? badgeElement : null}
      {isLoading ? (
        <div className={s.ButtonLoading}>
          <Loading size="16px" strokeWidth="1.5" color="currentColor" />
        </div>
      ) : null}
      {state === 'succeeded' && <ButtonSuccessIcon />}
      {state === 'failed' && <ButtonFailedIcon />}
    </>
  );

  const a11yProps = {
    'aria-label': !showLabel ? label : undefined,
    'aria-pressed': selected ? (true as const) : undefined,
    'aria-busy': isLoading ? (true as const) : undefined,
  };

  const innerProps: AnyObject = {
    disabled: buttonDisabled,
    ...a11yProps,
    ...restProps,
  };

  let inner: ReactElement;

  if (asChild) {
    if (!isValidElement(children)) {
      console.error(
        '[Button] asChild requires a valid React element as children',
      );
      return null;
    }

    inner = cloneWithRef(
      children as ReactElement,
      {
        ...innerProps,
        children: buttonContent,
      } as AnyObject,
    );
  } else {
    inner = (
      <motion.button
        type={type}
        layout={animateLayoutValue}
        transition={{
          layout: { duration: 0.25, ease: 'easeOut' },
          scale: { duration: 0.2, ease: 'linear' },
        }}
        whileTap={{ scale: 0.95 }}
        {...(innerProps as HTMLMotionProps<'button'>)}
      >
        {buttonContent}
      </motion.button>
    );
  }

  const boxElement = (
    <Box
      asChild
      ref={ref as Ref<HTMLElement>}
      shape={isSingleIcon ? 'circle' : 'pill'}
      material={MATERIAL_BY_VARIANT[variant]}
      tone={boxTone}
      size={size}
      padding={padding}
      pressable
      focusable
      className={cls}
      style={style}
    >
      {inner}
    </Box>
  );

  if (!showLabel && tooltipContent) {
    return (
      <Tooltip content={tooltipContent} kbd={kbd} ref={ref}>
        {boxElement}
      </Tooltip>
    );
  }

  return boxElement;
});
