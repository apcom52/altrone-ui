import s from './altroneApplication.module.scss';
import { AltroneApplicationProps } from './AltroneApplication.types.ts';
import { useMediaMatch } from 'utils';
import clsx from 'clsx';
import { AltroneConfiguration } from 'components/configuration';
import { createElement, useEffect } from 'react';
import { RainbowEffect } from './RainbowEffect.tsx';
import { Toast } from 'components/toasts/Toast.tsx';

export const AltroneApplication = ({
  children,
  className,
  id,
  style,
  tagName = 'div',
  theme = 'auto',
  config,
  ...props
}: AltroneApplicationProps) => {
  let _theme = theme;
  const mediaScheme = useMediaMatch('(prefers-color-scheme: dark)');

  if (theme === 'auto') {
    _theme = mediaScheme ? 'dark' : 'light';
  }

  useEffect(() => {
    document
      .querySelector('html')
      ?.classList.toggle('AltroneDark', _theme === 'dark');
  }, [_theme]);

  return createElement(
    tagName,
    {
      className: clsx(s.AltroneApp, className, {
        AltroneDark: _theme === 'dark',
      }),
      'data-altrone-root': 'true',
      id,
      style,
      ...props,
    },
    <AltroneConfiguration {...config}>
      <RainbowEffect>
        <Toast>{children}</Toast>
      </RainbowEffect>
    </AltroneConfiguration>,
  );
};
