import { isValidElement, ReactElement, Ref } from 'react';
import { GridColumnProps } from '../Grid.types.ts';
import clsx from 'clsx';
import s from './column.module.scss';
import { Slot } from 'utils/components/Slot';
import { AnyObject } from 'utils/types';

export const Column = ({
  ref,
  asChild = false,
  size = 'auto',
  offset = 0,
  className,
  style,
  children,
  ...restProps
}: GridColumnProps) => {
  const cls = clsx(
    s.Column,
    {
      [s.AutoSize]: size === 'auto',
      [s.Offset]: offset > 0,
    },
    className,
  );
  const styles = {
    ...style,
    '--grid-column-size': size === 'auto' ? undefined : size,
    ...(offset > 0 && { '--grid-column-offset': offset }),
  };

  if (asChild) {
    if (!isValidElement(children)) {
      console.error(
        '[Grid.Column] asChild requires a single valid React element as children',
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
