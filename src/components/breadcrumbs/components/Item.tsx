import { isValidElement, memo, ReactElement, Ref } from 'react';
import { BreadcrumbsItemProps } from '../Breadcrumbs.types.ts';
import clsx from 'clsx';
import s from './item.module.scss';
import { Text } from 'components/text/Text.tsx';
import { Slot } from 'utils/components/Slot.tsx';
import { AnyObject } from 'utils/types.ts';
import { cloneWithRef } from 'utils/utils/cloneWithRef.ts';
import { ChevronRight } from 'lucide-react';

const ItemContent = ({
  icon,
  label,
}: Pick<BreadcrumbsItemProps, 'icon' | 'label'>) => (
  <div className={s.Content}>
    {icon ? <div className={s.Icon}>{icon}</div> : null}
    {label ? (
      <Text className={s.Label} truncate>
        {label}
      </Text>
    ) : null}
  </div>
);

export const Item = memo(
  ({
    ref,
    className,
    current,
    asChild,
    children,
    label,
    icon,
    ...restProps
  }: BreadcrumbsItemProps) => {
    const cls = clsx(s.Item, { [s.Current]: current }, className);
    const content = <ItemContent icon={icon} label={label} />;

    const shared: Record<string, unknown> = {
      className: cls,
      'aria-current': current ? 'page' : undefined,
      ...restProps,
    };

    if (asChild && !isValidElement(children)) {
      console.error('[Breadcrumbs] Item: children must be a valid element');
      return null;
    }

    return (
      <li className={s.ListItem}>
        {asChild ? (
          <Slot<AnyObject> ref={ref} {...shared}>
            {cloneWithRef(children as ReactElement<AnyObject>, {
              children: content,
            })}
          </Slot>
        ) : (
          <div ref={ref as Ref<HTMLDivElement>} {...shared}>
            {content}
          </div>
        )}
        {/* Hidden on the last item via CSS (`:last-child`). */}
        <div className={s.Separator} aria-hidden="true">
          <ChevronRight />
        </div>
      </li>
    );
  },
);
