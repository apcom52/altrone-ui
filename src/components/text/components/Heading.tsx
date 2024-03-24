import { createElement, memo } from 'react';
import { TextHeadingProps, TextHeadingRoles } from '../Text.types.ts';
import clsx from 'clsx';
import s from './heading.module.scss';

export const Heading = memo(
  ({
    children,
    className,
    level = 1,
    role = TextHeadingRoles.title,
    ...props
  }: TextHeadingProps) => {
    const cls = clsx(
      {
        [s.Title]: role === TextHeadingRoles.title,
        [s.Heading]: role === TextHeadingRoles.heading,
        [s.Subheader]: role === TextHeadingRoles.subheading,
        [s.InnerHeader]: role === TextHeadingRoles.inner,
      },
      className,
    );

    let tagName = level === 0 ? 'div' : `h${level}`;

    return createElement(
      tagName,
      {
        className: cls,
        ...props,
      },
      children,
    );
  },
);
