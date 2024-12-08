import { forwardRef, ReactElement, useMemo } from 'react';
import clsx from 'clsx';
import s from './link.module.scss';
import {
  NavigationListLinkProps,
  NavigationListLinkPropsWithActions,
} from '../NavigationList.types.ts';
import { RenderFuncProp } from '../../../types';
import { useConfiguration } from '../../configuration';
import { AltChildren, DOMUtils } from '../../../utils';
import { LinkAction } from './LinkAction.tsx';

const navigationListRenderFunc: RenderFuncProp<
  HTMLAnchorElement,
  NavigationListLinkPropsWithActions
> = (ref, props) => {
  const { icon, label, actions, ...restProps } = props;

  return (
    <a ref={ref} {...restProps}>
      <div className={s.Label}>
        {icon ? <div className={s.Icon}>{icon}</div> : null}
        {label}
        {actions ? <div className={s.Actions}>{actions}</div> : null}
      </div>
    </a>
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

    const { navigationList: { link: linkConfig } = {} } = useConfiguration();

    const actions = useMemo(() => {
      const elements = new AltChildren(props.children);

      const actions: ReactElement[] = [];

      elements
        .filterNodes()
        .toArray()
        .forEach((elem) => {
          const element = elem as ReactElement;

          if (DOMUtils.containsElementType(element, [LinkAction])) {
            actions.push(element);
          }
        });

      return actions;
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
    });
  },
);
