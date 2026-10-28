import { expect, test, describe, vi, afterEach } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import {
  Application,
  Screen,
  setPageTitle,
  resetPageTitle,
  useAltroneTheme,
} from '../src';

describe('Application', () => {
  test('renders a div root by default', () => {
    render(<Application data-testid="app" />);
    expect(screen.getByTestId('app').tagName).toBe('DIV');
  });

  test('asChild merges root attributes onto the passed element', () => {
    render(
      <Application asChild data-testid="app">
        <section>content</section>
      </Application>,
    );
    const root = screen.getByTestId('app');
    expect(root.tagName).toBe('SECTION');
    expect(root).toHaveAttribute('data-altrone-root', 'true');
    expect(root).toHaveTextContent('content');
  });

  test('when dark theme is applied the root gets data-altrone-theme="dark"', () => {
    const { rerender } = render(<Application data-testid="app" />);
    expect(screen.getByTestId('app')).toHaveAttribute(
      'data-altrone-theme',
      'light',
    );

    rerender(<Application theme="dark" data-testid="app" />);
    expect(screen.getByTestId('app')).toHaveAttribute(
      'data-altrone-theme',
      'dark',
    );
  });

  test('check that [data-altrone-root] exists', () => {
    render(<Application data-testid="app" />);
    expect(screen.getByTestId('app')).toHaveAttribute('data-altrone-root');
  });
});

/** A controllable `(prefers-color-scheme: dark)` media query. */
const mockSystemTheme = (initial: 'light' | 'dark') => {
  let matches = initial === 'dark';
  const listeners = new Set<(event: { matches: boolean }) => void>();

  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query) =>
      ({
        get matches() {
          return matches;
        },
        media: query,
        addEventListener: (
          _: string,
          listener: (event: { matches: boolean }) => void,
        ) => listeners.add(listener),
        removeEventListener: (
          _: string,
          listener: (event: { matches: boolean }) => void,
        ) => listeners.delete(listener),
      }) as unknown as MediaQueryList,
  );

  return (next: 'light' | 'dark') =>
    act(() => {
      matches = next === 'dark';
      listeners.forEach((listener) => listener({ matches }));
    });
};

const ThemeButtons = () => {
  const { theme, themePreference, setTheme } = useAltroneTheme();

  return (
    <>
      <span data-testid="theme">{`${themePreference}:${theme}`}</span>
      <button onClick={() => setTheme('auto')}>auto</button>
      <button onClick={() => setTheme('dark')}>dark</button>
    </>
  );
};

describe('Application theme', () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    window.localStorage.clear();
  });

  test('setTheme("auto") resolves to the system theme and keeps following it', () => {
    const setSystemTheme = mockSystemTheme('dark');
    render(
      <Application theme="light" data-testid="app">
        <ThemeButtons />
      </Application>,
    );
    expect(screen.getByTestId('app')).toHaveAttribute(
      'data-altrone-theme',
      'light',
    );

    fireEvent.click(screen.getByText('auto'));
    expect(screen.getByTestId('app')).toHaveAttribute(
      'data-altrone-theme',
      'dark',
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('auto:dark');

    setSystemTheme('light');
    expect(screen.getByTestId('app')).toHaveAttribute(
      'data-altrone-theme',
      'light',
    );
  });

  test('an explicit setTheme survives a system theme change', () => {
    const setSystemTheme = mockSystemTheme('light');
    render(
      <Application data-testid="app">
        <ThemeButtons />
      </Application>,
    );

    fireEvent.click(screen.getByText('dark'));
    setSystemTheme('dark');
    setSystemTheme('light');

    expect(screen.getByTestId('app')).toHaveAttribute(
      'data-altrone-theme',
      'dark',
    );
  });

  test('persistTheme stores "auto" and restores it on the next mount', () => {
    mockSystemTheme('dark');
    const { unmount } = render(
      <Application theme="light" persistTheme>
        <ThemeButtons />
      </Application>,
    );

    fireEvent.click(screen.getByText('auto'));
    expect(window.localStorage.getItem('altrone-theme')).toBe('auto');
    unmount();

    render(
      <Application theme="light" persistTheme data-testid="app">
        <ThemeButtons />
      </Application>,
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('auto:dark');
  });
});

describe('Application document title', () => {
  test('combines Screen.title and applicationName on initial mount', () => {
    render(
      <Application applicationName="Altrone">
        <Screen title="Dashboard" />
      </Application>,
    );
    expect(document.title).toBe('Dashboard - Altrone');
  });

  test('falls back to just applicationName with no Screen.title', () => {
    render(
      <Application applicationName="Altrone">
        <Screen />
      </Application>,
    );
    expect(document.title).toBe('Altrone');
  });

  test('falls back to just the screen title with no applicationName', () => {
    render(
      <Application>
        <Screen title="Dashboard" />
      </Application>,
    );
    expect(document.title).toBe('Dashboard');
  });

  test('updates when Screen.title changes', () => {
    const { rerender } = render(
      <Application applicationName="Altrone">
        <Screen title="Dashboard" />
      </Application>,
    );
    expect(document.title).toBe('Dashboard - Altrone');

    rerender(
      <Application applicationName="Altrone">
        <Screen title="Settings" />
      </Application>,
    );
    expect(document.title).toBe('Settings - Altrone');
  });

  test('manageTitle={false} leaves document.title untouched', () => {
    document.title = 'Untouched';
    render(
      <Application applicationName="Altrone" manageTitle={false}>
        <Screen title="Dashboard" />
      </Application>,
    );
    expect(document.title).toBe('Untouched');
  });

  test('setPageTitle overrides the computed title; resetPageTitle reverts to it', () => {
    render(
      <Application applicationName="Altrone">
        <Screen title="Dashboard" />
      </Application>,
    );
    expect(document.title).toBe('Dashboard - Altrone');

    act(() => setPageTitle('Custom title'));
    expect(document.title).toBe('Custom title');

    act(() => resetPageTitle());
    expect(document.title).toBe('Dashboard - Altrone');
  });

  test('setPageTitle still applies when manageTitle is false', () => {
    render(
      <Application applicationName="Altrone" manageTitle={false}>
        <Screen title="Dashboard" />
      </Application>,
    );

    act(() => setPageTitle('Custom title'));
    expect(document.title).toBe('Custom title');
  });
});
