import { Theme } from './AltroneApplication.types.ts';

/**
 * Source for a blocking script that sets `data-altrone-theme` on `<html>`
 * before first paint, so a user with a dark system preference doesn't see
 * a flash of the SSR-default light theme before hydration.
 *
 * Rendered by `AltroneApplication` itself as a best-effort default, but
 * for a guaranteed pre-hydration run in streaming SSR, place it in the
 * document `<head>` yourself:
 *
 * @example
 * <script dangerouslySetInnerHTML={{ __html: getThemeInitScript(theme) }} />
 */
export function getThemeInitScript(initialTheme: Theme = 'auto'): string {
  return `(function(){try{var t=${JSON.stringify(initialTheme)};if(t==='auto'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-altrone-theme',t);}catch(e){}})();`;
}
