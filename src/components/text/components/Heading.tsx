import { createElement, memo, useEffect } from 'react';
import { TextHeadingProps } from '../Text.types.ts';
import clsx from 'clsx';
import s from './heading.module.scss';
import { useConfiguration } from 'components/configuration';
import { GlobalUtils } from '../../../utils';

export const Heading = memo(
  ({
    children,
    className,
    level = 1,
    role,
    variant,
    style,
    ariaRole,
    ...props
  }: TextHeadingProps) => {
    const { text: { heading: headingConfig = {} } = {} } = useConfiguration();

    const headingRole = variant ?? role ?? 'title';

    const cls = clsx(
      {
        [s.Title]: headingRole === 'title',
        [s.Heading]: headingRole === 'heading',
        [s.Subheader]: headingRole === 'subheading',
        [s.InnerHeader]: headingRole === 'inner',
      },
      headingConfig.className,
      className,
    );

    let tagName = level === 0 ? 'div' : `h${level}`;

    const styles = {
      ...headingConfig.style,
      ...style,
    };

    useEffect(() => {
      if (role) {
        GlobalUtils.deprecatedMessage('Heading', 'role', 'variant', '4.0');
      }
    }, [role]);

    return createElement(
      tagName,
      {
        className: cls,
        style: styles,
        role: ariaRole,
        ...props,
      },
      children,
    );
  },
);
