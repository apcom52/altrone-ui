import { MutableRefObject, useCallback, useEffect, useRef } from 'react';

export const useMutationObserver = (
  targetElement: MutableRefObject<HTMLElement>,
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
    observer.current = new MutationObserver(callback);
    observer.current?.observe(targetElement.current, options);

    return stop;
  }, [callback, stop, options, targetElement]);
};
