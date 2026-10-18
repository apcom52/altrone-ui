import { autoUpdate } from '@floating-ui/react';

/**
 * iOS Safari doesn't fire `window.resize` when the on-screen keyboard opens,
 * so plain `autoUpdate` keeps a stale `flip` decision — also follow the
 * `visualViewport`, which is what actually shrinks.
 */
export const autoUpdateWithViewport = (
  reference: Parameters<typeof autoUpdate>[0],
  floating: HTMLElement,
  update: () => void,
) => {
  const cleanup = autoUpdate(reference, floating, update);
  const viewport = window.visualViewport;

  viewport?.addEventListener('resize', update);
  viewport?.addEventListener('scroll', update);

  return () => {
    cleanup();
    viewport?.removeEventListener('resize', update);
    viewport?.removeEventListener('scroll', update);
  };
};
