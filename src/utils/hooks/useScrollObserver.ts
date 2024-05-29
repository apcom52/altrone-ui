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

      console.log('>> observed', observedElementsRef);

      let elementWithMaxRatio = observedElementsRef.current[0];
      observedElementsRef.current.slice(1).forEach((currentRef) => {
        if (currentRef.ratio > elementWithMaxRatio.ratio) {
          elementWithMaxRatio = currentRef;
        }
      });

      console.log('>> max', elementWithMaxRatio);

      setActiveItem(elementWithMaxRatio.selector);
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

  console.log('>> active', activeItem);

  return { activeItem, observeNewSelector };
};
//
// export const useScrollObserver = ({
//   root,
//   rootMargin,
//   threshold,
//   onChangeActiveId,
// }) => {
//   const [activeLink, setActiveLink] = useState(null);
//   const idsRef = useRef([]);
//
//   useEffect(() => {
//     const handleIntersection = (entries) => {
//       entries.forEach((entry) => {
//         const id = entry.target.getAttribute('id');
//         const ref = idsRef.current.find((el) => el.id === id);
//         if (ref) ref.ratio = entry.isIntersecting ? entry.intersectionRatio : 0;
//       });
//
//       const maxRatio = Math.max(...idsRef.current.map((el) => el.ratio), 0.1);
//
//       console.log('>> ratios', [...idsRef.current.map((el) => el.ratio), 0.1]);
//       const entry = idsRef.current.find((el) => el.ratio === maxRatio);
//
//       setActiveLink(entry && entry.id);
//
//       if (
//         entry &&
//         entry.id &&
//         activeLink !== entry.id &&
//         typeof onChangeActiveId === 'function'
//       ) {
//         onChangeActiveId(entry.id, activeLink);
//       }
//     };
//
//     const optionsObserver = { root, rootMargin, threshold };
//     const observer = new IntersectionObserver(
//       handleIntersection,
//       optionsObserver,
//     );
//
//     console.log('>> idsRef', idsRef);
//
//     idsRef.current.forEach(({ id }) => {
//       const content = document.getElementById(id);
//       console.log('>> content', content);
//       content && observer.observe(content);
//     });
//
//     return () => {
//       observer.disconnect();
//     };
//   }, [idsRef, root, rootMargin, threshold]);
//
//   return { idsRef, activeLink };
// };
