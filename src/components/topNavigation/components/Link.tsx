import { forwardRef, Ref } from 'react';
import { TopNavigationLinkProps } from '../TopNavigation.types.ts';
import clsx from 'clsx';
import s from './link.module.scss';

const renderTopNavigationLink = (
  ref: Ref<HTMLAnchorElement>,
  { leftIcon, rightIcon, label, ...restProps }: TopNavigationLinkProps,
) => {
  return (
    <a ref={ref} {...restProps}>
      <div className={s.Icon}>{leftIcon}</div>
      {label}
      <div className={s.Icon}>{rightIcon}</div>
    </a>
  );
};

export const Link = forwardRef<HTMLAnchorElement, TopNavigationLinkProps>(
  (props, ref) => {
    const {
      className,
      renderFunc = renderTopNavigationLink,
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
