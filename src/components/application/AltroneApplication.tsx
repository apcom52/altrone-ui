import s from './altroneApplication.module.scss';
import { AltroneApplicationProps, Theme } from './AltroneApplication.types.ts';
import { useMediaMatch } from 'utils';
import clsx from 'clsx';
import { Configuration } from 'components/configuration';
import { useEffect, useMemo, useState } from 'react';
import { Toast } from 'components/toasts/Toast.tsx';
import { ThemeContext, ThemeContextType } from './useTheme.ts';
import { Screen } from '../index.ts';

import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import { AltroneLocalization } from './useLocalization.tsx';
import { DialogProvider } from 'components/dialog/DialogProvider.tsx';

function resolveInitialTheme(initialTheme: Theme): Exclude<Theme, 'auto'> {
  if (initialTheme !== 'auto') return initialTheme;
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export const AltroneApplication = ({
  ref,
  children,
  className,
  id,
  style,
  theme: initialTheme = 'auto',
  accent = 'blue',
  config,
  language = 'en',
  customLabels = {},
  sidebar,
  header,
  ...props
}: AltroneApplicationProps) => {
  const [theme, setTheme] = useState<Theme>(() =>
    resolveInitialTheme(initialTheme),
  );

  const mediaScheme = useMediaMatch('(prefers-color-scheme: dark)');

  // Respond to runtime changes: system theme switch or prop change
  useEffect(() => {
    if (initialTheme === 'auto') {
      setTheme(mediaScheme ? 'dark' : 'light');
    } else {
      setTheme(initialTheme);
    }
  }, [mediaScheme, initialTheme]);

  // Applied to <html> so global styles (scrollbar, selection, etc.) pick up the theme
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

  // AltroneDark is also set on this element (in addition to <html>) so that
  // portals rendered inside data-altrone-root inherit dark-mode CSS variables
  const cls = clsx(s.AltroneApp, s.Application, className, {
    AltroneDark: theme === 'dark',
  });

  return (
    <Screen
      ref={ref}
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
