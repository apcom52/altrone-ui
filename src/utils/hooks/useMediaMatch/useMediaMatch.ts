import { useEffect, useMemo, useState } from 'react';

export function useMediaMatch(query: string) {
  const matchMedia = useMemo<MediaQueryList>(() => {
    if (typeof window === 'undefined') {
      return {
        matches: false,
        addEventListener: () => null,
        removeEventListener: () => null,
        addListener: () => null,
        removeListener: () => null,
        media: '',
        onchange: () => null,
        dispatchEvent: () => false
      } as MediaQueryList;
    }

    return window.matchMedia(query);
  }, [query]);
  const [matches, setMatches] = useState<boolean>(() => matchMedia.matches);

  useEffect(() => {
    setMatches(matchMedia.matches);
    const listener = (event: MediaQueryListEventMap['change']) => setMatches(event.matches);

    if (matchMedia.addEventListener) {
      matchMedia.addEventListener('change', listener);
      return () => matchMedia.removeEventListener('change', listener);
    } else {
      matchMedia.addListener(listener);
      return () => matchMedia.removeListener(listener);
    }
  }, [matchMedia]);

  if (typeof window === 'undefined') {
    console.warn('useMediaMatch cannot function as window is undefined.');

    return false;
  }

  return matches;
}
