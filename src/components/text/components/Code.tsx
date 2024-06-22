import { memo } from 'react';
import { TextCodeProps } from '../Text.types.ts';
import clsx from 'clsx';
import s from './code.module.scss';
import { useConfiguration } from 'components/configuration';

export const Code = memo(
  ({ children, className, bold, italic, style, ...props }: TextCodeProps) => {
    const { text: { code: codeConfig = {} } = {} } = useConfiguration();

    const cls = clsx(s.Code, className, codeConfig.className, {
      [s.Bold]: bold,
      [s.Italic]: italic,
    });

    const styles = {
      ...codeConfig.style,
      ...style,
    };

    return (
      <code className={cls} style={styles} {...props}>
        {children}
      </code>
    );
  },
);
