import { isValidElement, memo } from 'react';
import { TagsItemProps } from '../Tags.types.ts';
import s from './item.module.scss';
import clsx from 'clsx';
import { Slot } from 'utils/components/Slot.tsx';

export const Item = memo(
  ({
    ref,
    className,
    label,
    asChild,
    children,
    ...restProps
  }: TagsItemProps) => {
    const cls = clsx(s.Item, className);

    if (asChild) {
      if (!isValidElement(children)) {
        console.error(
          '[Tags.Item] asChild requires a valid React element as children',
        );
        return null;
      }
      return (
        <Slot ref={ref} className={cls} {...restProps}>
          {children}
        </Slot>
      );
    }

    return (
      <a ref={ref} tabIndex={0} className={cls} {...restProps}>
        {label}
      </a>
    );
  },
);
