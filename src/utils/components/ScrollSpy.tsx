import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { useScrollObserver } from '../hooks/useScrollObserver.ts';

type ScrollSpyContext = {
  activeItem: string | null;
  observeNewSelector: (selector: string) => void;
};

const ScrollSpyContext = createContext<ScrollSpyContext>({
  activeItem: null,
  observeNewSelector: () => null,
});
export const useScrollSpy = () => useContext(ScrollSpyContext);

export const ScrollSpy = ({
  root = null,
  rootMargin = '0px',
  threshold = [0, 0.25, 0.5, 0.75, 1],
  children = null,
}: PropsWithChildren<IntersectionObserverInit>) => {
  const { activeItem, observeNewSelector } = useScrollObserver({
    root,
    rootMargin,
    threshold,
  });

  const context = useMemo<ScrollSpyContext>(() => {
    return {
      activeItem,
      observeNewSelector,
    };
  }, [activeItem]);

  return (
    <ScrollSpyContext.Provider value={context}>
      {children}
    </ScrollSpyContext.Provider>
  );
};
