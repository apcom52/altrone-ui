import { isValidElement, KeyboardEvent, ReactElement, Ref } from 'react';
import clsx from 'clsx';
import { Slot } from 'utils/components/Slot.tsx';
import { AnyObject } from 'utils/types.ts';
import { TagsItemProps } from '../Tags.types.ts';
import s from './item.module.scss';

export const Item = ({
  ref,
  className,
  label,
  asChild,
  children,
  onClick,
  href,
  ...restProps
}: TagsItemProps) => {
  const interactive = asChild || href != null || onClick != null;
  const cls = clsx(s.Item, { [s.Interactive]: interactive }, className);

  /* Forward href/onClick only when set — passing `undefined` through Slot
     would clobber the same prop on the consumer's child element. */
  const interaction = {
    ...(href != null && { href }),
    ...(onClick && { onClick }),
  };

  if (asChild) {
    if (!isValidElement(children)) {
      console.error(
        '[Tags.Item] asChild requires a valid React element as children',
      );
      return null;
    }
    return (
      <Slot ref={ref} className={cls} {...interaction} {...restProps}>
        {children as ReactElement<AnyObject>}
      </Slot>
    );
  }

  if (href != null) {
    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        className={cls}
        href={href}
        onClick={onClick}
        {...restProps}
      >
        {label}
      </a>
    );
  }

  /* No href: a plain label, or a button-like control when `onClick` is set. */
  const onKeyDown = onClick
    ? (event: KeyboardEvent<HTMLSpanElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          event.currentTarget.click();
        }
      }
    : undefined;

  return (
    <span
      ref={ref as Ref<HTMLSpanElement>}
      className={cls}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onKeyDown}
      {...restProps}
    >
      {label}
    </span>
  );
};
