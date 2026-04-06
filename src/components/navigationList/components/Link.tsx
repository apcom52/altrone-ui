import React, { memo, useMemo, isValidElement, ReactElement } from 'react';
import clsx from 'clsx';
import s from './link.module.scss';
import { NavigationListLinkProps } from '../NavigationList.types.ts';
import { useConfiguration } from '../../configuration';
import { AltChildren, DOMUtils, useBoolean } from '../../../utils';
import { LinkAction } from './LinkAction.tsx';
import {
  NavigationListLevelContext,
  useNavigationListId,
  useNavigationListLevel,
} from '../NavigationList.context.ts';
import { Badge } from 'components/badge/Badge.tsx';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Slot } from 'utils/components/Slot';

// ─── ItemContent ──────────────────────────────────────────────────────────────

type ItemContentProps = Pick<NavigationListLinkProps, 'icon' | 'label' | 'badge'> & {
  actions: ReactElement[];
  opened: boolean;
};

const ItemContent = ({ icon, badge, label, actions, opened }: ItemContentProps) => (
  <div className={s.Label}>
    {icon ? <div className={s.Icon}>{icon}</div> : null}
    <div className={s.LabelText}>{label}</div>
    {badge ? <Badge className={s.Badge}>{badge}</Badge> : null}
    {actions.length ? <div className={s.Actions}>{actions}</div> : null}
    {opened ? <div className={s.ChildrenIcon}><ChevronDown /></div> : null}
  </div>
);

// ─── LinkInner ────────────────────────────────────────────────────────────────

type LinkInnerProps = Omit<NavigationListLinkProps, 'children'> & {
  actions: ReactElement[];
  nestedLinks: ReactElement[];
  level: number;
  asChildElement: ReactElement | null;
};

const LinkInner = memo(({
  ref,
  icon,
  label,
  actions,
  nestedLinks,
  level,
  selected,
  badge,
  asChild,
  asChildElement,
  className,
  style,
  ...restProps
}: LinkInnerProps) => {
  const navigationListId = useNavigationListId();
  const { value: hovered, enable: hover, disable: unhover } = useBoolean();

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

  const hoverProps = {
    onMouseEnter: !selected ? hover : undefined,
    onMouseLeave: unhover,
  };

  const inner = (
    <>
      {hovered && (
        <motion.div
          layout
          layoutId={`${navigationListId}-nav-link-backdrop-${level}`}
          className={s.Backdrop}
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
      console.error('[NavigationList] Link: when asChild=true, provide a single non-Link, non-action child element');
      return null;
    }
    const childWithContent = React.cloneElement(asChildElement as React.ReactElement, {
      children: inner,
    });
    return (
      <>
        <Slot ref={ref} className={className} style={style} {...hoverProps} {...restProps}>
          {childWithContent}
        </Slot>
        {nested}
      </>
    );
  }

  return (
    <>
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={className}
        style={style}
        {...hoverProps}
        {...restProps}
      >
        {inner}
      </div>
      {nested}
    </>
  );
});

// ─── Link ─────────────────────────────────────────────────────────────────────

export const Link = memo(({
  ref,
  className,
  style,
  asChild,
  children,
  ...restProps
}: NavigationListLinkProps) => {
  const listLevel = useNavigationListLevel();
  const { navigationList: { link: linkConfig } = {} } = useConfiguration();

  const [actions, nestedLinks, asChildElement] = useMemo(() => {
    const actions: ReactElement[] = [];
    const nestedLinks: ReactElement[] = [];
    let asChildElement: ReactElement | null = null;

    new AltChildren(children).filterNodes().toArray().forEach((elem) => {
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
    { [s.Selected]: restProps.selected },
    className,
    linkConfig?.className,
  );

  const styles = {
    ...linkConfig?.style,
    ...style,
  };

  return (
    <LinkInner
      ref={ref}
      className={cls}
      style={styles}
      asChild={asChild}
      asChildElement={asChildElement}
      actions={actions}
      nestedLinks={nestedLinks}
      level={listLevel}
      {...restProps}
    />
  );
});
