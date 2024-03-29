import { memo } from 'react';
import { TextScreenNameProps } from '../Text.types.ts';
import clsx from 'clsx';
import s from './screenName.module.scss';
import { useConfiguration } from '../../configuration/AltroneConfiguration.context.ts';

export const ScreenName = memo(
  ({ children, className, style, ...props }: TextScreenNameProps) => {
    const { textScreenName = {} } = useConfiguration();

    const cls = clsx(s.ScreenName, className, textScreenName.className);
    const styles = {
      ...textScreenName.style,
      ...style,
    };

    return (
      <h1 className={cls} style={styles} {...props}>
        {children}
      </h1>
    );
  },
);
