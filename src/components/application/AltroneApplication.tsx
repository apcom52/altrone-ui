import s from './altroneApplication.module.scss';
import { AltroneApplicationProps, Theme } from './AltroneApplication.types.ts';
import { useMediaMatch } from 'utils';
import clsx from 'clsx';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Toast } from 'components/toasts/Toast.tsx';
import { ThemeContext, ThemeContextType } from './useTheme.ts';
import { getThemeInitScript } from './getThemeInitScript.ts';

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
  toastPlacement,
  notificationSide,
  notificationPlacement,
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

  // Applied to <html> (in addition to data-altrone-theme on the root below)
  // so global, non-scoped styles (scrollbar, ::selection, etc.) and portals
  // outside data-altrone-root still pick up the theme. useLayoutEffect
  // instead of useEffect so this runs before paint, not after.
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-altrone-theme', theme);
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

  const cls = clsx(s.AltroneApp, className);

  return (
    <>
      {/* Best-effort FOUC prevention: runs as the browser parses this HTML,
          before hydration. For a guarantee in streaming SSR, render
          getThemeInitScript() in the document <head> yourself instead. */}
      <script
        dangerouslySetInnerHTML={{ __html: getThemeInitScript(initialTheme) }}
      />
      <MotionConfig reducedMotion="user">
        <div
          ref={ref}
          className={cls}
          data-altrone-root="true"
          data-altrone-accent={accent}
          data-altrone-theme={theme}
          id={id}
          style={style}
          {...props}
        >
          <ThemeContext.Provider value={themeContext}>
            <AltroneLocalization language={language} customLabels={customLabels}>
              <DialogProvider>
                <Toast
                  toastPlacement={toastPlacement}
                  notificationSide={notificationSide}
                  notificationPlacement={notificationPlacement}
                >
                  {children}
                </Toast>
              </DialogProvider>
            </AltroneLocalization>
          </ThemeContext.Provider>
        </div>
      </MotionConfig>
    </>
  );
};
