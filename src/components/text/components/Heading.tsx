import { createElement, memo } from 'react';
import { TextHeadingProps } from '../Text.types.ts';
import clsx from 'clsx';
import s from './heading.module.scss';
import { useConfiguration } from 'components/configuration';

export const Heading = memo(
  ({
    children,
    className,
    level = 1,
    role = 'title',
    style,
    ...props
  }: TextHeadingProps) => {
    const { text: { heading: headingConfig = {} } = {} } = useConfiguration();

    const cls = clsx(
      {
        [s.Title]: role === 'title',
        [s.Heading]: role === 'heading',
        [s.Subheader]: role === 'subheading',
        [s.InnerHeader]: role === 'inner',
      },
      headingConfig.className,
      className,
    );

    let tagName = level === 0 ? 'div' : `h${level}`;

    const styles = {
      ...headingConfig.style,
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
