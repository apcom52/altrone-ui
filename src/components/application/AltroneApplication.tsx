import s from './altroneApplication.module.scss';
import { AltroneApplicationProps, Theme } from './AltroneApplication.types.ts';
import { useMediaMatch } from 'utils';
import clsx from 'clsx';
import { Configuration } from 'components/configuration';
import { useEffect, useMemo, useState } from 'react';
import { Toast } from 'components/toasts/Toast.tsx';
import { ThemeContext, ThemeContextType } from './useTheme.ts';
import { motion } from 'motion/react';
import { Screen } from '../index.ts';

import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import { AltroneLocalization } from './useLocalization.tsx';
import { DialogProvider } from 'components/dialog/DialogProvider.tsx';

export const AltroneApplication = ({
  children,
  className,
  id,
  style,
  tagName = 'div',
  theme: initialTheme = 'auto',
  accent = 'blue',
  config,
  language = 'en',
  customLabels = {},
  sidebar,
  header,
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

  useEffect(() => {
    if (!config?.locale?.locale) {
      console.warn(
        "[AltroneApplication]: you haven't set locale of your application. By default locale is en-US",
      );
    }
  }, [config?.locale?.locale]);

  const cls = clsx(s.AltroneApp, s.Application, className, {
    AltroneDark: theme === 'dark',
  });

  return (
    <Screen
      className={cls}
      data-altrone-root="true"
      data-altrone-accent={accent}
      data-altrone-theme={theme}
      id={id}
      style={style}
      sidebar={sidebar}
      header={header}
      {...props}
    >
      <ThemeContext.Provider value={themeContext}>
        <AltroneLocalization language={language} customLabels={customLabels}>
          <Configuration {...config}>
            <DialogProvider>
              <Toast>{children}</Toast>
            </DialogProvider>
          </Configuration>
        </AltroneLocalization>
      </ThemeContext.Provider>
    </Screen>
  );
};
