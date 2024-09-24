import { memo } from 'react';
import { TextLinkProps } from '../Text.types.ts';
import clsx from 'clsx';
import s from './link.module.scss';
import { useConfiguration } from 'components/configuration';

export const Link = memo(
  ({ children, className, bold, italic, style, ...props }: TextLinkProps) => {
    const { text: { link: linkConfig = {} } = {} } = useConfiguration();

    const cls = clsx(s.Link, className, linkConfig.className, {
      [s.Bold]: bold,
      [s.Italic]: italic,
    });

    const styles = {
      ...linkConfig.style,
      ...style,
    };

    return (
      <a className={cls} style={styles} {...props}>
        {children}
      </a>
    );
  },
);
