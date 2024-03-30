import { memo } from 'react';
import { TextLinkProps } from '../Text.types.ts';
import clsx from 'clsx';
import s from './link.module.scss';
import { useConfiguration } from '../../configuration/AltroneConfiguration.context.ts';

export const Link = memo(
  ({
    children,
    className,
    bold,
    italic,
    style,
    rel,
    ...props
  }: TextLinkProps) => {
    const { textLink = {} } = useConfiguration();

    const cls = clsx(s.Link, className, textLink.className, {
      [s.Bold]: bold,
      [s.Italic]: italic,
    });

    const styles = {
      ...textLink.style,
      ...style,
    };

    return (
      <a className={cls} style={styles} rel={rel || textLink.rel} {...props}>
        {children}
      </a>
    );
  },
);
