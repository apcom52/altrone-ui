import s from './altroneApplication.module.scss';
import { ApplicationProps, Theme } from './Application.types.ts';
import { useMediaMatch } from 'utils';
import clsx from 'clsx';
import {
  cloneElement,
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
import { getThemeInitScript } from './getThemeInitScript.ts';
import { AnyObject } from 'utils/types.ts';

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

export const Application = ({
  ref,
  children,
  className,
  id,
  style,
  theme: initialTheme = 'auto',
  accent = 'blue',
  language = 'en',
  customLabels = {},
  toastPlacement,
  notificationSide,
  notificationPlacement,
  asChild = false,
  ...props
}: ApplicationProps) => {
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
      theme: theme,
      setTheme,
    }),
    [theme, setTheme],
  );

  const cls = clsx(s.AltroneApp, className);

  const providerTree = (content: ReactNode) => (
    <ThemeContext.Provider value={themeContext}>
      <AltroneLocalization language={language} customLabels={customLabels}>
        <DialogProvider>
          <Notifications
            toastPlacement={toastPlacement}
            notificationSide={notificationSide}
            notificationPlacement={notificationPlacement}
          >
            {content}
          </Notifications>
        </DialogProvider>
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
      root = cloneElement(child, rootProps, providerTree(child.props.children));
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
        dangerouslySetInnerHTML={{ __html: getThemeInitScript(initialTheme) }}
      />
      <MotionConfig reducedMotion="user">{root}</MotionConfig>
    </>
  );
};
