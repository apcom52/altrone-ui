import { BreadcrumbsItemProps } from '../Breadcrumbs.types.ts';
import clsx from 'clsx';
import s from './item.module.scss';
import React from 'react';
import { Slot } from 'utils/components/Slot.tsx';
import { AnyObject } from 'utils/types.ts';
import { cloneWithRef } from 'utils/utils/cloneWithRef.ts';
import { ChevronRight } from 'lucide-react';

const ItemContent = ({
  icon,
  label,
}: Pick<BreadcrumbsItemProps, 'icon' | 'label'>) => {
  return (
    <div className={s.Content}>
      {icon ? <div className={s.Icon}>{icon}</div> : null}
      {label ? <div className={s.Label}>{label}</div> : null}
    </div>
  );
};

export const Item = (props: BreadcrumbsItemProps) => {
  const {
    ref,
    className,
    current,
    asChild,
    children,
    label,
    icon,
    isLast,
    ...restProps
  } = props;

  const cls = clsx(
    s.Item,
    {
      [s.Current]: current,
    },
    className,
  );
  const content = <ItemContent icon={icon} label={label} />;

  if (asChild && !React.isValidElement(children)) {
    console.error('[Breadcrumbs] Item: children must be a valid element');
    return null;
  }

  const childrenWithContent = children
    ? cloneWithRef(children, {
        children: content,
      })
    : null;

  return (
    <li className={s.ListItem}>
      {asChild && childrenWithContent ? (
        <Slot<AnyObject> ref={ref} className={cls}>
          {childrenWithContent}
        </Slot>
      ) : (
        <div ref={ref} className={cls} {...restProps}>
          {content}
        </div>
      )}
      {!isLast && (
        <div className={s.Separator}>
          <ChevronRight />
        </div>
      )}
    </li>
  );
};
