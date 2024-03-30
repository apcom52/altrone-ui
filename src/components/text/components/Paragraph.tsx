import { memo } from 'react';
import { TextParagraphProps } from '../Text.types.ts';
import clsx from 'clsx';
import s from './paragraph.module.scss';
import { Size } from '../../../types';
import { useConfiguration } from '../../configuration/AltroneConfiguration.context.ts';

export const Paragraph = memo(
  ({
    children,
    className,
    size = Size.medium,
    style,
    ...props
  }: TextParagraphProps) => {
    const { textParagraph = {} } = useConfiguration();

    const cls = clsx(
      s.Paragraph,
      {
        [s.Paragraph_small]: size === Size.small,
        [s.Paragraph_large]: size === Size.large,
      },
      className,
      textParagraph.className,
    );

    const styles = {
      ...textParagraph.style,
      ...style,
    };

    return (
      <p className={cls} style={styles} {...props}>
        {children}
      </p>
    );
  },
);
