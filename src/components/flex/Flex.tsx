import { isValidElement, ReactElement, Ref } from 'react';
import { FlexProps } from './Flex.types.ts';
import clsx from 'clsx';
import s from './flex.module.scss';
import { Gap } from 'types';
import { Slot } from 'utils/components/Slot';
import { AnyObject } from 'utils/types';

const gapVars: Record<Gap, string> = {
  none: '0px',
  xxs: 'var(--narrow-gap)',
  xs: 'var(--xs-gap)',
  s: 'var(--s-gap)',
  m: 'var(--gap)',
  l: 'var(--l-gap)',
  xl: 'var(--xl-gap)',
  xxl: 'var(--xxl-gap)',
};

export const Flex = ({
  ref,
  asChild = false,
  children,
  className,
  align,
  justify,
  gap = 'none',
  orientation = 'horizontal',
  style,
  disableInnerMargins = true,
  wrap = false,
  ...restProps
}: FlexProps) => {
  const cls = clsx(
    s.Flex,
    {
      [s.Flex_horizontal]: orientation === 'horizontal',
      [s.Flex_alignStart]: align === 'start',
      [s.Flex_alignCenter]: align === 'center',
      [s.Flex_alignEnd]: align === 'end',
      [s.Flex_justifyStart]: justify === 'start',
      [s.Flex_justifyCenter]: justify === 'center',
      [s.Flex_justifyEnd]: justify === 'end',
      [s.Flex_justifyBetween]: justify === 'between',
      [s.Flex_disableInnerMargins]: disableInnerMargins,
      [s.Flex_wrap]: wrap,
    },
    className,
  );

  const styles = {
    ...style,
    gap: gapVars[gap],
  };

  if (asChild) {
    if (!isValidElement(children)) {
      console.error(
        '[Flex] asChild requires a single valid React element as children',
      );
      return null;
    }
    return (
      <Slot ref={ref} className={cls} style={styles} {...restProps}>
        {children as ReactElement<AnyObject>}
      </Slot>
    );
  }

  return (
    <div ref={ref as Ref<HTMLDivElement>} className={cls} style={styles} {...restProps}>
      {children}
    </div>
  );
};
