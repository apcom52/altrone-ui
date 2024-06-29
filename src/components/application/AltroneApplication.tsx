import s from './altroneApplication.module.scss';
import { AltroneApplicationProps, Theme } from './AltroneApplication.types.ts';
import { useMediaMatch } from 'utils';
import clsx from 'clsx';
import { Configuration } from 'components/configuration';
import { createElement, useEffect, useMemo, useState } from 'react';
import { RainbowEffect } from './RainbowEffect.tsx';
import { Toast } from 'components/toasts/Toast.tsx';
import { ThemeContext, ThemeContextType } from './useTheme.ts';

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/600.css';
import { AltroneLocalization } from './useLocalization.tsx';

export const AltroneApplication = ({
  children,
  className,
  id,
  style,
  tagName = 'div',
  theme: initialTheme = 'auto',
  config,
  language = 'en',
  customLabels = {},
  ...props
}: AltroneApplicationProps) => {
  const [theme, setTheme] = useState<Theme>('auto');

  const mediaScheme = useMediaMatch('(prefers-color-scheme: dark)');

  useEffect(() => {
    if (initialTheme === 'auto') {
      setTheme(mediaScheme ? 'dark' : 'light');
    } else {
      setTheme(initialTheme);
    }
  }, [mediaScheme, initialTheme]);

  useEffect(() => {
    document
      .querySelector('html')
      ?.classList.toggle('AltroneDark', theme === 'dark');
  }, [theme]);

  const themeContext = useMemo<ThemeContextType>(
    () => ({
      theme: theme,
      setTheme,
    }),
    [theme, setTheme],
  );

  const _customLabels = useMemo(() => {
    const langLabels = language in customLabels ? customLabels[language] : {};

    return {
      ...langLabels,
      ...customLabels.customLabels,
    };
  }, [language, customLabels]);

  return createElement(
    tagName,
    {
      className: clsx(s.AltroneApp, className, {
        AltroneDark: theme === 'dark',
      }),
      'data-altrone-root': 'true',
      id,
      style,
      ...props,
    },
    <ThemeContext.Provider value={themeContext}>
      <AltroneLocalization language={language} customLabels={_customLabels}>
        <Configuration {...config}>
          <RainbowEffect>
            <Toast>{children}</Toast>
          </RainbowEffect>
        </Configuration>
      </AltroneLocalization>
    </ThemeContext.Provider>,
  );
};
