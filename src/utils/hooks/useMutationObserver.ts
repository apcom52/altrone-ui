import { MutableRefObject, useCallback, useEffect, useRef } from 'react';

export const useMutationObserver = (
  targetElement:
    | HTMLElement
    | MutableRefObject<HTMLElement | null | undefined>
    | null
    | undefined,
  callback: MutationCallback,
  options: MutationObserverInit = {},
) => {
  const observer = useRef<MutationObserver | null>(null);

  const stop = useCallback(() => {
    if (!observer.current) {
      return;
    }

    observer.current?.disconnect();
    observer.current = null;
  }, []);

  useEffect(() => {
    const element =
      targetElement && 'current' in targetElement
        ? targetElement.current
        : targetElement;

    if (!element) {
      return;
    }

    observer.current = new MutationObserver(callback);
    observer.current?.observe(element, options);

    return stop;
  }, [callback, stop, options, targetElement]);

  return {
    stop,
  };
};
