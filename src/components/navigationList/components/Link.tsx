import { forwardRef } from 'react';
import clsx from 'clsx';
import s from './link.module.scss';
import { NavigationListLinkProps } from '../NavigationList.types.ts';
import { RenderFuncProp } from '../../../types';

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
      ...restProps
    } = props;

    const cls = clsx(
      s.Link,
      {
        [s.Selected]: props.selected,
      },
      className,
    );

    return renderFunc(ref, {
      ...restProps,
      className: cls,
    });
  },
);
