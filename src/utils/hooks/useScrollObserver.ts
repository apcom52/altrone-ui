/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from 'react';

export type ObservedElementsRef = {
  selector: string;
  ratio: number;
};

export const useScrollObserver = ({
  root,
  rootMargin,
  threshold,
}: IntersectionObserverInit) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const observedElementsRef = useRef<ObservedElementsRef[]>([]);

  const handleIntersection = useCallback<IntersectionObserverCallback>(
    (entries) => {
      entries.forEach((entry) => {
        const currentRef = observedElementsRef.current.find(
          (ref) => ref.selector === '#' + entry.target.id,
        );

        if (currentRef) {
          currentRef.ratio = entry.isIntersecting ? entry.intersectionRatio : 0;
        }
      });

      let elementWithMaxRatio = observedElementsRef.current[0];
      observedElementsRef.current.slice(1).forEach((currentRef) => {
        if (currentRef.ratio > elementWithMaxRatio.ratio) {
          elementWithMaxRatio = currentRef;
        }
      });

      if (elementWithMaxRatio.ratio > 0) {
        setActiveItem(elementWithMaxRatio.selector);
      }
    },
    [],
  );

  const observeNewSelector = useCallback((selector: string) => {
    if (
      !observedElementsRef.current.find((item) => item.selector === selector)
    ) {
      observedElementsRef.current = [
        ...observedElementsRef.current,
        {
          selector,
          ratio: 0,
        },
      ];
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root,
      rootMargin,
      threshold,
    });

    observedElementsRef.current.forEach((observedElementItem) => {
      const observedElement = document.querySelector(
        observedElementItem.selector,
      );
      if (observedElement) {
        observer.observe(observedElement);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [
    observedElementsRef.current,
    handleIntersection,
    root,
    rootMargin,
    threshold,
  ]);

  return { activeItem, observeNewSelector };
};
