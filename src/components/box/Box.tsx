import { JSX, ComponentPropsWithoutRef } from 'react';
import { BoxProps } from './Box.types';
import { clsx } from 'clsx';
import s from './box.module.scss';
import {
  HTMLMotionProps,
  motion,
  MotionProps,
  TargetAndTransition,
  VariantLabels,
} from 'motion/react';
import { BOX_LOWER_SHADOW, BOX_UPPER_SHADOW } from './Box.constants';
import { HTMLElements } from 'types/types';

type MotionComponentProps<As extends keyof JSX.IntrinsicElements> =
  ComponentPropsWithoutRef<As> & MotionProps;

export const Box = <Tag extends keyof HTMLElements = 'div'>({
  children,
  ...props
}: BoxProps<Tag>) => {
  const {
    as = 'div' as Tag,
    surface = 'solid',
    interaction = [],
    color = 'none',
    radius = 's',
    offset = 0,
    inset = 0,
    shadow = '1',
    style,
    width,
    height,
    alignX = 'start',
    alignY = 'start',
    className,
    focusable = true,
    contentClassName,
    cursor = 'default',
    ...restProps
  } = props;

  const isInputElement = as === 'input' || as === 'textarea';

  const radiusValue =
    typeof radius === 'number'
      ? `${radius}px`
      : ['none', 'mini', 's', 'm', 'l', 'xl', 'circle'].includes(radius)
      ? `var(--radius-${radius})`
      : undefined;

  const focusInteraction: Record<string, boolean> = {};
  const hoverInteraction: Record<string, boolean> = {};
  const pressInteraction: Record<string, boolean> = {};

  interaction.forEach((item) => {
    const [type, effect] = item.split(':');
    if (type === 'focus') {
      focusInteraction[effect] = true;
    } else if (type === 'hover') {
      hoverInteraction[effect] = true;
    } else if (type === 'press') {
      pressInteraction[effect] = true;
    }
  });

  const whileFocus: VariantLabels | TargetAndTransition = {
    ...(focusInteraction.scale && { scale: 0.99 }),
    ...(focusInteraction.background && {
      background: 'var(--box-focus-background-color)',
    }),
    ...(focusInteraction.shadow && {
      boxShadow: `var(--box-outline-shadow), var(--shadow-${BOX_UPPER_SHADOW[shadow]})`,
    }),
  };
  const whileHover: VariantLabels | TargetAndTransition = {
    ...(hoverInteraction.scale && { scale: 1.02 }),
    ...(hoverInteraction.background && {
      background: 'var(--box-hover-background-color)',
    }),
    ...(hoverInteraction.shadow && {
      boxShadow: `var(--box-outline-shadow), var(--shadow-${BOX_UPPER_SHADOW[shadow]})`,
    }),
  };
  const whilePress: VariantLabels | TargetAndTransition = {
    ...(pressInteraction.scale && { scale: 0.98 }),
    ...(pressInteraction.background && {
      background: 'var(--box-press-background-color)',
    }),
    ...(pressInteraction.shadow && {
      boxShadow: `var(--box-outline-shadow), var(--shadow-${BOX_LOWER_SHADOW[shadow]})`,
    }),
  };

  const cls = clsx(s.Box, className, {
    [s.Outline_focus]: focusInteraction.outline,
    [s.Outline_hover]: hoverInteraction.outline,
    [s.Outline_press]: pressInteraction.outline,
  });

  const styles = {
    ...style,
    borderRadius: radiusValue,
    padding: inset || undefined,
    margin: offset || undefined,
    width: width || undefined,
    height: height || undefined,
    alignItems: alignX || undefined,
    justifyContent: alignY || undefined,
    boxShadow: `var(--box-outline-shadow), var(--shadow-${shadow})`,
    cursor: cursor || undefined,
  };

  const MotionComponent = motion[
    as
  ] as unknown as React.ForwardRefExoticComponent<MotionComponentProps<Tag>>;

  const motionProps = {
    ...restProps,
    onDrag: undefined,
    onDragStart: undefined,
    onDragEnd: undefined,
    onDragEnter: undefined,
    onDragLeave: undefined,
    onDragOver: undefined,
    onDrop: undefined,
  };

  const initialState: TargetAndTransition | VariantLabels | boolean = {
    scale: 1,
    background: 'var(--box-background-color)',
    boxShadow: `var(--box-outline-shadow), var(--shadow-${shadow})`,
  };

  const boxProperties: HTMLMotionProps<Tag> = {
    className: cls,
    style: styles,
    initial: initialState,
    whileFocus,
    whileHover,
    whileTap: whilePress,
    tabIndex:
      focusable === true || focusable === 0 ? 0 : focusable || undefined,
    ...motionProps,
    ...restProps,
  };

  if (!isInputElement) {
    boxProperties.children = children;
  }

  return <MotionComponent {...boxProperties} />;
};
