type Listener = (event: MediaQueryListEvent) => void;

const listeners = new Set<Listener>();
let forced = false;

/**
 * Workaround: the toolbar toggle must reach every `MotionConfig reducedMotion="user"`
 * (e.g. inside `Application`'s providers, outside the story tree), and `motion`
 * reads the real `prefers-reduced-motion` media query once. So `matchMedia` is
 * patched to report the toggle's state and notify `motion`'s change listener.
 */
export const setReducedMotionEmulation = (value: boolean) => {
  if (forced === value) {
    return;
  }
  forced = value;
  listeners.forEach((listener) =>
    listener({ matches: value } as MediaQueryListEvent),
  );
};

if (typeof window !== 'undefined' && !(window as any).__sbReducedMotion) {
  (window as any).__sbReducedMotion = true;
  const original = window.matchMedia.bind(window);

  window.matchMedia = (query: string) => {
    const mql = original(query);
    if (!query.includes('prefers-reduced-motion')) {
      return mql;
    }

    const matchesFor = () =>
      query.includes('no-preference')
        ? !forced && mql.matches
        : forced || mql.matches;

    return {
      media: query,
      onchange: null,
      get matches() {
        return matchesFor();
      },
      addEventListener: (_: string, listener: Listener) => {
        listeners.add(listener);
      },
      removeEventListener: (_: string, listener: Listener) => {
        listeners.delete(listener);
      },
      addListener: (listener: Listener) => {
        listeners.add(listener);
      },
      removeListener: (listener: Listener) => {
        listeners.delete(listener);
      },
      dispatchEvent: () => false,
    } as MediaQueryList;
  };
}
