import React, {
  memo,
  useEffect,
  useMemo,
  isValidElement,
  ReactElement,
  ReactNode,
  KeyboardEvent,
  MouseEvent,
} from 'react';
import clsx from 'clsx';
import s from './link.module.scss';
import { NavigationListLinkProps } from '../NavigationList.types.ts';
import { AltChildren, DOMUtils } from '../../../utils';
import { LinkAction } from './LinkAction.tsx';
import {
  NAV_LINK_ATTR,
  NavigationListLevelContext,
  useNavigationListHideHover,
  useNavigationListId,
  useNavigationListLevel,
} from '../NavigationList.context.ts';
import { Text } from 'components/text/Text.tsx';
import { Badge } from 'internal/badge';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Slot } from 'utils/components/Slot';

/** Near-critically damped — the selected highlight slides between items
    without overshoot. */
const SELECTED_TRANSITION = {
  type: 'spring',
  stiffness: 420,
  damping: 40,
  mass: 0.9,
} as const;

// ─── ItemContent ──────────────────────────────────────────────────────────────

type ItemContentProps = Pick<
  NavigationListLinkProps,
  'icon' | 'label' | 'badge'
> & {
  actions: ReactElement[];
  opened: boolean;
};

const ItemContent = ({
  icon,
  badge,
  label,
  actions,
  opened,
}: ItemContentProps) => (
  <div className={s.Label}>
    {icon ? <div className={s.Icon}>{icon}</div> : null}
    <Text className={s.LabelText} truncate>
      {label}
    </Text>
    {badge ? <Badge size="m">{badge}</Badge> : null}
    {actions.length ? <div className={s.Actions}>{actions}</div> : null}
    {opened ? (
      <div className={s.ChildrenIcon} aria-hidden>
        <ChevronDown />
      </div>
    ) : null}
  </div>
);

// ─── LinkInner ────────────────────────────────────────────────────────────────

type LinkInnerProps = Omit<NavigationListLinkProps, 'children'> & {
  actions: ReactElement[];
  nestedLinks: ReactElement[];
  level: number;
  asChildElement: ReactElement | null;
};

const LinkInner = memo(
  ({
    ref,
    icon,
    label,
    actions,
    nestedLinks,
    level,
    selected,
    disabled,
    badge,
    asChild,
    asChildElement,
    className,
    style,
    href,
    onClick,
    onKeyDown,
    ...restProps
  }: LinkInnerProps) => {
    const navigationListId = useNavigationListId();
    const hideHover = useNavigationListHideHover();

    /* Clicking an item while hovering it leaves the shared hover backdrop
       sitting on top of what's now the selected item, and no pointer event
       fires to re-evaluate — hide it. */
    useEffect(() => {
      if (selected) {
        hideHover();
      }
    }, [selected, hideHover]);

    const showNestedLinks = nestedLinks.length > 0 && selected;

    const content = (
      <ItemContent
        icon={icon}
        label={label}
        badge={badge}
        opened={Boolean(showNestedLinks)}
        actions={actions}
      />
    );

    const listCls = clsx({
      [s.SecondLevelList]: level === 0,
      [s.ThirdLevelList]: level > 0,
    });

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    /* An `<a>` without `href` isn't keyboard-activatable on its own, so relay
       Enter/Space to the click handler when the item acts as a button. */
    const handleKeyDown = (event: KeyboardEvent<HTMLAnchorElement>) => {
      onKeyDown?.(event);
      if (disabled || href || event.defaultPrevented) {
        return;
      }
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick?.(event as unknown as MouseEvent<HTMLAnchorElement>);
      }
    };

    const resolvedHref = disabled ? undefined : href;

    /* Only the keys we actually want to set — spreading `href: undefined` onto
       an `asChild` element would wipe the href the consumer put on it. */
    const interactionProps: Record<string, unknown> = {
      [NAV_LINK_ATTR]: '',
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      tabIndex: disabled ? -1 : resolvedHref ? undefined : 0,
      'aria-current': selected ? 'page' : undefined,
      'aria-disabled': disabled || undefined,
    };
    if (resolvedHref !== undefined) {
      interactionProps.href = resolvedHref;
    }

    const inner = (
      <>
        {selected && !disabled && (
          <motion.div
            layout
            layoutId={`${navigationListId}-nav-link-selected-${level}`}
            className={s.SelectedBackdrop}
            transition={SELECTED_TRANSITION}
          />
        )}
        {content}
      </>
    );

    const nested = showNestedLinks ? (
      <div className={listCls}>
        <NavigationListLevelContext.Provider value={level + 1}>
          {nestedLinks}
        </NavigationListLevelContext.Provider>
      </div>
    ) : null;

    if (asChild) {
      if (!isValidElement(asChildElement)) {
        console.error(
          '[NavigationList] Link: when asChild=true, provide a single non-Link, non-action child element',
        );
        return null;
      }
      const childWithContent = React.cloneElement(
        asChildElement as ReactElement<{ children?: ReactNode }>,
        { children: inner },
      );
      return (
        <>
          <Slot
            ref={ref}
            className={className}
            style={style}
            {...interactionProps}
            {...restProps}
          >
            {childWithContent}
          </Slot>
          {nested}
        </>
      );
    }

    return (
      <>
        <a
          ref={ref}
          className={className}
          style={style}
          {...interactionProps}
          {...restProps}
        >
          {inner}
        </a>
        {nested}
      </>
    );
  },
);

// ─── Link ─────────────────────────────────────────────────────────────────────

export const Link = memo(
  ({
    ref,
    className,
    style,
    asChild,
    selected,
    disabled,
    children,
    ...restProps
  }: NavigationListLinkProps) => {
    const listLevel = useNavigationListLevel();

    const [actions, nestedLinks, asChildElement] = useMemo(() => {
      const actions: ReactElement[] = [];
      const nestedLinks: ReactElement[] = [];
      let asChildElement: ReactElement | null = null;

      new AltChildren(children)
        .filterNodes()
        .toArray()
        .forEach((elem) => {
          const element = elem as ReactElement;
          if (DOMUtils.containsElementType(element, [LinkAction])) {
            actions.push(element);
          } else if (DOMUtils.containsElementType(element, [Link])) {
            nestedLinks.push(element);
          } else if (!asChildElement) {
            asChildElement = element;
          }
        });

      return [actions, nestedLinks, asChildElement];
    }, [children]);

    const cls = clsx(
      s.Link,
      { [s.Selected]: selected, [s.Disabled]: disabled },
      className,
    );

    return (
      <LinkInner
        ref={ref}
        className={cls}
        style={style}
        asChild={asChild}
        asChildElement={asChildElement}
        selected={selected}
        disabled={disabled}
        actions={actions}
        nestedLinks={nestedLinks}
        level={listLevel}
        {...restProps}
      />
    );
  },
);
