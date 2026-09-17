import {
  isValidElement,
  memo,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import { BottomNavigationLinkProps } from '../BottomNavigation.types.ts';
import clsx from 'clsx';
import s from './link.module.scss';
import { Text } from 'components/text/Text.tsx';
import { Badge } from 'internal/badge';
import { useBottomNavigationSelect } from '../BottomNavigation.context.tsx';
import { cloneWithRef } from 'utils/utils/cloneWithRef.ts';
import { Slot } from 'utils/components/Slot.tsx';
import { DOMUtils } from '../../../utils';

type LinkContentProps = Pick<
  BottomNavigationLinkProps,
  'icon' | 'label' | 'badge'
>;

const LinkContent = ({ icon, label, badge }: LinkContentProps) => (
  <>
    <div className={s.Icon}>{icon}</div>
    <Text className={s.Label} truncate>
      {label}
    </Text>
    {badge ? (
      <Badge mode="corner" size="m">
        {badge}
      </Badge>
    ) : null}
  </>
);

export const Link = memo(
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
    ...restProps
  }: BottomNavigationLinkProps) => {
    const cls = clsx(s.Link, { [s.Selected]: selected }, className);

    const select = useBottomNavigationSelect();
    const elementRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
      select(elementRef.current, Boolean(selected));
    }, [selected, select]);

    const content = <LinkContent icon={icon} label={label} badge={badge} />;

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
          '[BottomNavigation.Link] asChild requires a valid React element as children',
        );
        return null;
      }
      const childWithContent = cloneWithRef(
        children as ReactElement<{ children?: ReactNode }>,
        { children: content },
      );
      return (
        <Slot ref={composedRef} {...interactionProps}>
          {childWithContent}
        </Slot>
      );
    }

    return (
      <a ref={composedRef} {...interactionProps}>
        {content}
      </a>
    );
  },
);
