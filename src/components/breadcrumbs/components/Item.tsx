import { forwardRef } from 'react';
import { BreadcrumbsItemProps } from '../Breadcrumbs.types.ts';
import clsx from 'clsx';
import s from './item.module.scss';
import { RenderFuncProp } from '../../../types';

const renderItem: RenderFuncProp<HTMLAnchorElement, BreadcrumbsItemProps> = (
  ref,
  props,
) => {
  const { icon, label, ...restProps } = props;

  return (
    <a ref={ref} {...restProps}>
      {icon ? <div className={s.Icon}>{icon}</div> : null}
      <div className={s.Label}>{label}</div>
    </a>
  );
};

export const Item = forwardRef<HTMLAnchorElement, BreadcrumbsItemProps>(
  (props, ref) => {
    const { className, current, renderFunc = renderItem, ...restProps } = props;

    const cls = clsx(
      s.Item,
      {
        [s.Current]: current,
      },
      className,
    );

    return renderFunc(ref, {
      ...restProps,
      current,
      className: cls,
    });
  },
);
