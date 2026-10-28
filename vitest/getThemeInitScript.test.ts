import { expect, test, describe, vi, afterEach } from 'vitest';
import { getThemeInitScript } from '../src/components/application/getThemeInitScript.ts';

describe('getThemeInitScript', () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    document.documentElement.removeAttribute('data-altrone-theme');
    window.localStorage.clear();
    window.matchMedia = originalMatchMedia;
  });

  test('sets the attribute directly for an explicit theme, ignoring system preference', () => {
    // eslint-disable-next-line no-eval
    eval(getThemeInitScript('light'));
    expect(document.documentElement.getAttribute('data-altrone-theme')).toBe(
      'light',
    );
  });

  test('resolves "auto" from the system color scheme preference', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
    } as MediaQueryList);

    // eslint-disable-next-line no-eval
    eval(getThemeInitScript('auto'));
    expect(document.documentElement.getAttribute('data-altrone-theme')).toBe(
      'dark',
    );
  });

  test('a persisted "auto" overrides an explicit theme and resolves from the system', () => {
    window.localStorage.setItem('altrone-theme', 'auto');
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
    } as MediaQueryList);

    // eslint-disable-next-line no-eval
    eval(getThemeInitScript('light', true));
    expect(document.documentElement.getAttribute('data-altrone-theme')).toBe(
      'dark',
    );
  });
});
