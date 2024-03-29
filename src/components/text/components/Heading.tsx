import { createElement, memo } from 'react';
import { TextHeadingProps, TextHeadingRoles } from '../Text.types.ts';
import clsx from 'clsx';
import s from './heading.module.scss';
import { useConfiguration } from '../../configuration/AltroneConfiguration.context.ts';

export const Heading = memo(
  ({
    children,
    className,
    level = 1,
    role = TextHeadingRoles.title,
    style,
    ...props
  }: TextHeadingProps) => {
    const { textHeading = {} } = useConfiguration();

    const cls = clsx(
      {
        [s.Title]: role === TextHeadingRoles.title,
        [s.Heading]: role === TextHeadingRoles.heading,
        [s.Subheader]: role === TextHeadingRoles.subheading,
        [s.InnerHeader]: role === TextHeadingRoles.inner,
      },
      textHeading.className,
      className,
    );

    let tagName = level === 0 ? 'div' : `h${level}`;

    const styles = {
      ...textHeading.style,
      ...style,
    };

    return createElement(
      tagName,
      {
        className: cls,
        style: styles,
        ...props,
      },
      children,
    );
  },
);
