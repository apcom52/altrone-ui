import { memo } from 'react';
import { TextParagraphProps } from '../Text.types.ts';
import clsx from 'clsx';
import s from './paragraph.module.scss';
import { useConfiguration } from 'components/configuration';

export const Paragraph = memo(
  ({
    children,
    className,
    size = 'm',
    style,
    ...props
  }: TextParagraphProps) => {
    const { text: { paragraph: textParagraphConfig = {} } = {} } =
      useConfiguration();

    const cls = clsx(
      s.Paragraph,
      {
        [s.Paragraph_small]: size === 's',
        [s.Paragraph_large]: size === 'l',
      },
      className,
      textParagraphConfig.className,
    );

    const styles = {
      ...textParagraphConfig.style,
      ...style,
    };

    return (
      <p className={cls} style={styles} {...props}>
        {children}
      </p>
    );
  },
);
