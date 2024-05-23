import s from './altroneApplication.module.scss';
import { AltroneApplicationProps, Theme } from './AltroneApplication.types.ts';
import { useMediaMatch } from 'utils';
import clsx from 'clsx';
import { AltroneConfiguration } from 'components';
import { createElement, useEffect } from 'react';
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

  useEffect(() => {
    document
      .querySelector('html')
      ?.classList.toggle('AltroneDark', _theme === Theme.dark);
  }, [_theme]);

  return createElement(
    tagName,
    {
      className: clsx(s.AltroneApp, className, {
        AltroneDark: _theme === Theme.dark,
      }),
      'data-altrone-root': 'true',
      id,
      style,
      ...props,
    },
    <AltroneConfiguration theme={_theme} {...config}>
      <RainbowEffect>{children}</RainbowEffect>
    </AltroneConfiguration>,
  );
};
