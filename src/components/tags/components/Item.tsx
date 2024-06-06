import { forwardRef } from 'react';
import { TagsItemProps } from '../Tags.types.ts';
import s from './item.module.scss';

export const Item = forwardRef<HTMLAnchorElement, TagsItemProps>(
  ({ label, ...restProps }, ref) => {
    return (
      <a className={s.Item} ref={ref} {...restProps}>
        {label}
      </a>
    );
  },
);
