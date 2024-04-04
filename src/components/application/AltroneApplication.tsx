import s from './altroneApplication.module.scss';
import { AltroneApplicationProps, Theme } from './AltroneApplication.types.ts';
import { useMediaMatch } from 'utils';
import clsx from 'clsx';
import { AltroneConfiguration } from 'components';
import { createElement } from 'react';
import { RainbowEffect } from './RainbowEffect.tsx';

export const AltroneApplication = ({
  children,
  className,
  id,
  style,
  tagName = 'div',
  theme = Theme.auto,
  config,
  ...props
}: AltroneApplicationProps) => {
  let _theme = theme;
  const mediaScheme = useMediaMatch('(prefers-color-scheme: dark)');

  if (theme === Theme.auto) {
    _theme = mediaScheme ? Theme.dark : Theme.light;
  }

  return createElement(
    tagName,
    {
      className: clsx(s.AltroneApp, className, {
        [s.AltroneDark]: _theme === Theme.dark,
      }),
      id,
      style,
      ...props,
    },
    <AltroneConfiguration {...config}>
      <RainbowEffect>{children}</RainbowEffect>
    </AltroneConfiguration>,
  );
};
