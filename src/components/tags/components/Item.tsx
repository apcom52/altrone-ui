import { forwardRef } from 'react';
import { TagsItemProps } from '../Tags.types.ts';
import s from './item.module.scss';
import { RenderFuncProp } from '../../../types';
import clsx from 'clsx';

const tagsItemRenderFunc: RenderFuncProp<HTMLAnchorElement, TagsItemProps> = (
  ref,
  { label, ...restProps },
) => {
  return (
    <a ref={ref} {...restProps}>
      {label}
    </a>
  );
};

export const Item = forwardRef<HTMLAnchorElement, TagsItemProps>(
  (props, ref) => {
    const { className, renderFunc = tagsItemRenderFunc, ...restProps } = props;

    const cls = clsx(s.Item, className);

    return renderFunc(ref, {
      ...restProps,
      className: cls,
    });
  },
);
