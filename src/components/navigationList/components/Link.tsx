import React, { forwardRef, ReactElement, useMemo } from 'react';
import clsx from 'clsx';
import s from './link.module.scss';
import {
  NavigationListLinkProps,
  NavigationListLinkPropsWithActions,
} from '../NavigationList.types.ts';
import { RenderFuncProp } from '../../../types';
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
import { cloneWithRef } from 'utils/utils/cloneWithRef.ts';

const ItemContent = ({
  icon,
  badge,
  label,
  actions,
  opened,
}: Pick<NavigationListLinkProps, 'icon' | 'label' | 'badge' | 'children'> & {
  actions: ReactElement[];
  opened: boolean;
}) => {
  return (
    <div className={s.Label}>
      {icon ? <div className={s.Icon}>{icon}</div> : null}
      <div className={s.LabelText}>{label}</div>
      {badge ? <Badge className={s.Badge}>{badge}</Badge> : null}
      {actions?.length ? <div className={s.Actions}>{actions}</div> : null}
      {opened ? (
        <div className={s.ChildrenIcon}>
          <ChevronDown />
        </div>
      ) : null}
    </div>
  );
};

const navigationListRenderFunc: RenderFuncProp<
  HTMLAnchorElement,
  NavigationListLinkPropsWithActions
> = (ref, props) => {
  const {
    icon,
    label,
    actions = undefined,
    level = 0,
    children,
    selected,
    badge,
    asChild,
    ...restProps
  } = props;

  const { navigationList: { link: linkConfig = {} } = {} } = useConfiguration();
  const navigationListId = useNavigationListId();
  const { value: hovered, enable: hover, disable: unhover } = useBoolean();

  const hasChildren = React.Children.count(children) > 0;
  const showChildren = Boolean(hasChildren && selected);
  const showIcon = icon && level < 2;

  const content = (
    <ItemContent
      icon={icon}
      label={label}
      badge={badge}
      opened={showChildren}
      actions={children || []}
    />
  );

  if (asChild && !React.isValidElement(children)) {
    console.error('[NavigationList] Link: children must be a valid element');
    return null;
  }

  const childrenWithContent = children
    ? cloneWithRef(children, {
        children: content,
      })
    : null;

  const listCls = clsx({
    [s.SecondLevelList]: level === 0,
    [s.ThirdLevelList]: level > 0,
  });

  return (
    <>
      <div
        ref={ref}
        onMouseEnter={!selected ? hover : undefined}
        onMouseLeave={unhover}
        {...restProps}
      >
        {hovered && (
          <motion.div
            layout
            layoutId={`${navigationListId}-navigation-list-link-backdrop-${level}`}
            className={s.Backdrop}
          />
        )}
        {content}
      </div>

      {/*{showChildren ? (
        <div className={listCls}>
          <NavigationListLevelContext.Provider value={level + 1}>
            {children}
          </NavigationListLevelContext.Provider>
        </div>
      ) : null}*/}
    </>
  );
};

export const Link = forwardRef<HTMLAnchorElement, NavigationListLinkProps>(
  (props, ref) => {
    const {
      renderFunc = navigationListRenderFunc,
      className,
      style,
      ...restProps
    } = props;

    const listLevel = useNavigationListLevel();

    const { navigationList: { link: linkConfig } = {} } = useConfiguration();

    const [actions, childItems] = useMemo(() => {
      const elements = new AltChildren(props.children);

      const actions: ReactElement[] = [];
      const childItems: ReactElement[] = [];

      elements
        .filterNodes()
        .toArray()
        .forEach((elem) => {
          const element = elem as ReactElement;

          if (DOMUtils.containsElementType(element, [LinkAction])) {
            actions.push(element);
          } else if (DOMUtils.containsElementType(element, [Link])) {
            childItems.push(element);
          }
        });

      return [actions, childItems];
    }, [props.children]);

    const cls = clsx(
      s.Link,
      {
        [s.Selected]: props.selected,
      },
      className,
      linkConfig?.className,
    );

    const styles = {
      ...linkConfig?.style,
      ...style,
    };

    return renderFunc(ref, {
      ...restProps,
      className: cls,
      style: styles,
      actions,
      level: listLevel,
      children: childItems,
    });
  },
);
