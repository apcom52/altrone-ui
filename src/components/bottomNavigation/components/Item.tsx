import {
  isValidElement,
  memo,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import { BottomNavigationItemProps } from '../BottomNavigation.types.ts';
import clsx from 'clsx';
import s from './item.module.scss';
import { Text } from 'components/text/Text.tsx';
import { Badge } from 'internal/badge';
import { useBottomNavigationSelect } from '../BottomNavigation.context.tsx';
import { cloneWithRef } from 'utils/utils/cloneWithRef.ts';
import { DOMUtils } from '../../../utils';

type ItemContentProps = Pick<BottomNavigationItemProps, 'icon' | 'label' | 'badge'>;

const ItemContent = ({ icon, label, badge }: ItemContentProps) => (
  <>
    <div className={s.Icon}>{icon}</div>
    <Text className={s.Label} truncate>
      {label}
    </Text>
    {badge ? (
      <Badge placement="corner" size="m">
        {badge}
      </Badge>
    ) : null}
  </>
);

export const Item = memo(
  ({
    ref,
    className,
    style,
    icon,
    label,
    badge,
    selected,
    asChild,
    children,
    renderFunc,
    ...restProps
  }: BottomNavigationItemProps) => {
    const cls = clsx(s.Item, { [s.Selected]: selected }, className);

    const select = useBottomNavigationSelect();
    const elementRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
      select(elementRef.current, Boolean(selected));
    }, [selected, select]);

    if (renderFunc) {
      return renderFunc(ref ?? null, {
        ...restProps,
        icon,
        label,
        badge,
        selected,
        className: cls,
        style,
      });
    }

    const content = <ItemContent icon={icon} label={label} badge={badge} />;

    const composedRef = DOMUtils.composeRefs(ref, elementRef);
    const interactionProps = {
      className: cls,
      style,
      'aria-current': selected ? ('page' as const) : undefined,
      ...restProps,
    };

    if (asChild) {
      if (!isValidElement(children)) {
        console.error(
          '[BottomNavigation.Item] asChild requires a valid React element as children',
        );
        return null;
      }
      return cloneWithRef(children as ReactElement<{ children?: ReactNode }>, {
        ...interactionProps,
        ref: composedRef,
        children: content,
      });
    }

    return (
      <a ref={composedRef} {...interactionProps}>
        {content}
      </a>
    );
  },
);
