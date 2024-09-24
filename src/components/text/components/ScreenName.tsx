import { memo } from 'react';
import { TextScreenNameProps } from '../Text.types.ts';
import clsx from 'clsx';
import s from './screenName.module.scss';
import { useConfiguration } from 'components/configuration';

export const ScreenName = memo(
  ({ children, className, style, ...props }: TextScreenNameProps) => {
    const { text: { screenName: screenNameConfig = {} } = {} } =
      useConfiguration();

    const cls = clsx(s.ScreenName, className, screenNameConfig.className);
    const styles = {
      ...screenNameConfig.style,
      ...style,
    };

    return (
      <h1 className={cls} style={styles} {...props}>
        {children}
      </h1>
    );
  },
);
