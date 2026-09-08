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
import { Box } from 'components/box';
import { Text } from 'components/text/Text.tsx';
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
      <Box
        className={s.Badge}
        shape="pill"
        material="plate"
        tone="neutral"
        size="var(--bottom-navigation-badge-size)"
        width="auto"
        padding={{ x: 'var(--bottom-navigation-badge-padding)', y: 0 }}
      >
        {typeof badge === 'string' || typeof badge === 'number' ? (
          <Text size={2} weight="bold">
            {badge}
          </Text>
        ) : (
          badge
        )}
      </Box>
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
