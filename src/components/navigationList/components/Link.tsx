import { forwardRef } from 'react';
import clsx from 'clsx';
import s from './link.module.scss';
import { NavigationListLinkProps } from '../NavigationList.types.ts';
import { RenderFuncProp } from '../../../types';
import { useConfiguration } from '../../configuration';

const navigationListRenderFunc: RenderFuncProp<
  HTMLAnchorElement,
  NavigationListLinkProps
> = (ref, props) => {
  const { icon, label, ...restProps } = props;

  return (
    <a ref={ref} {...restProps}>
      <div className={s.Label}>
        {icon ? <div className={s.Icon}>{icon}</div> : null}
        {label}
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
    });
  },
);
