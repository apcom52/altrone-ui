import type { CSSProperties } from 'react';
import clsx from 'clsx';
import s from '../screen.module.scss';
import { ScreenContentProps } from '../Screen.types.ts';

export const Content = ({
  ref,
  children,
  className,
  style,
  maxWidth,
  ...restProps
}: ScreenContentProps) => {
  const rootStyle =
    maxWidth === undefined
      ? style
      : ({
          ...style,
          '--screen-content-max-width':
            typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
        } as CSSProperties);

  return (
    <main
      ref={ref}
      className={clsx(s.Content, className)}
      style={rootStyle}
      {...restProps}
    >
      {children}
    </main>
  );
};
