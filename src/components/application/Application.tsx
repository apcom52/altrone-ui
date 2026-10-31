import s from './altroneApplication.module.scss';
import { ApplicationProps, ResolvedTheme, Theme } from './Application.types.ts';
import clsx from 'clsx';
import {
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { MotionConfig } from 'motion/react';
import { Notifications } from 'components/notifications/Notifications.tsx';
import { ThemeContext, ThemeContextType } from './useTheme.ts';
import { getThemeInitScript, THEME_STORAGE_KEY } from './getThemeInitScript.ts';
import { AnyObject } from 'utils/types.ts';
import { Slot } from 'utils/components/Slot.tsx';
import { cloneWithRef } from 'utils/utils/cloneWithRef.ts';

import '@fontsource-variable/inter';
import '@fontsource-variable/inter/wght-italic.css';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource-variable/jetbrains-mono/wght-italic.css';
import { AltroneLocalization } from './useLocalization.tsx';
import { AltroneIcons } from './useIcons.tsx';
import { DialogProvider } from 'components/dialog/DialogProvider.tsx';
import { useDocumentTitle } from './useDocumentTitle.ts';

const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)';

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia(DARK_SCHEME_QUERY).matches ? 'dark' : 'light';
}

function isTheme(value: string | null): value is Theme {
  return value === 'auto' || value === 'light' || value === 'dark';
}

export const Application = ({
  ref,
  children,
  className,
  id,
  style,
  theme: initialTheme = 'auto',
  persistTheme = false,
  accent = 'blue',
  applicationName,
  manageTitle = true,
  language = 'en',
  customLabels = {},
  icons = {},
  toastPlacement,
  notificationPlacement,
  asChild = false,
  ...props
}: ApplicationProps) => {
  const [themePreference, setThemePreference] = useState<Theme>(initialTheme);
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme);

  const theme: ResolvedTheme =
    themePreference === 'auto' ? systemTheme : themePreference;

  useDocumentTitle(applicationName, manageTitle);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(DARK_SCHEME_QUERY);
    const sync = () =>
      setSystemTheme(mediaQueryList.matches ? 'dark' : 'light');

    sync();
    mediaQueryList.addEventListener('change', sync);
    return () => mediaQueryList.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const stored = persistTheme
      ? window.localStorage.getItem(THEME_STORAGE_KEY)
      : null;
    setThemePreference(isTheme(stored) ? stored : initialTheme);
  }, [initialTheme, persistTheme]);

  const persistingSetTheme = useCallback(
    (next: Theme) => {
      setThemePreference(next);
      if (persistTheme) {
        window.localStorage.setItem(THEME_STORAGE_KEY, next);
      }
    },
    [persistTheme],
  );

  // Applied to <html> (in addition to data-altrone-theme on the root below)
  // so global, non-scoped styles (scrollbar, ::selection, etc.) and portals
  // outside data-altrone-root still pick up the theme. useLayoutEffect
  // instead of useEffect so this runs before paint, not after.
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-altrone-theme', theme);
  }, [theme]);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const setRootRef = useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as { current: HTMLDivElement | null }).current = node;
      }
    },
    [ref],
  );

  /**
   * Safari paints the *document* background (not the scrolled element's) in the
   * overscroll / rubber-band area. The color tokens live on the app root, not
   * on `<html>`, so mirror the resolved app background onto `<body>`/`<html>` —
   * else that area flashes white on scroll.
   */
  useLayoutEffect(() => {
    const node = rootRef.current;
    if (!node) {
      return;
    }

    const background = getComputedStyle(node).backgroundColor;
    if (
      !background ||
      background === 'transparent' ||
      background === 'rgba(0, 0, 0, 0)'
    ) {
      return;
    }

    const { body, documentElement } = document;
    const prevBody = body.style.backgroundColor;
    const prevRoot = documentElement.style.backgroundColor;
    body.style.backgroundColor = background;
    documentElement.style.backgroundColor = background;

    return () => {
      body.style.backgroundColor = prevBody;
      documentElement.style.backgroundColor = prevRoot;
    };
  }, [theme]);

  const themeContext = useMemo<ThemeContextType>(
    () => ({
      theme,
      themePreference,
      setTheme: persistingSetTheme,
    }),
    [theme, themePreference, persistingSetTheme],
  );

  const cls = clsx(s.AltroneApp, className);

  const providerTree = (content: ReactNode) => (
    <ThemeContext.Provider value={themeContext}>
      <AltroneLocalization language={language} customLabels={customLabels}>
        <AltroneIcons icons={icons}>
          <DialogProvider>
            <Notifications
              toastPlacement={toastPlacement}
              notificationPlacement={notificationPlacement}
            >
              {content}
            </Notifications>
          </DialogProvider>
        </AltroneIcons>
      </AltroneLocalization>
    </ThemeContext.Provider>
  );

  const rootProps = {
    ref: setRootRef,
    className: cls,
    'data-altrone-root': 'true',
    'data-altrone-accent': accent,
    'data-altrone-theme': theme,
    id,
    style,
    ...props,
  };

  let root: ReactElement;
  if (asChild) {
    if (!isValidElement(children)) {
      console.error(
        '[Application] asChild requires a single valid React element child',
      );
      root = <div {...rootProps} />;
    } else {
      const child = children as ReactElement<AnyObject>;
      const childWithProviders = cloneWithRef(child, {
        children: providerTree(child.props.children),
      });
      const { ref: slotRef, ...restRootProps } = rootProps;
      root = (
        <Slot ref={slotRef} {...restRootProps}>
          {childWithProviders}
        </Slot>
      );
    }
  } else {
    root = <div {...rootProps}>{providerTree(children)}</div>;
  }

  return (
    <>
      {/* Best-effort FOUC prevention: runs as the browser parses this HTML,
          before hydration. For a guarantee in streaming SSR, render
          getThemeInitScript() in the document <head> yourself instead. */}
      <script
        dangerouslySetInnerHTML={{
          __html: getThemeInitScript(initialTheme, persistTheme),
        }}
      />
      <MotionConfig reducedMotion="user">{root}</MotionConfig>
    </>
  );
};
