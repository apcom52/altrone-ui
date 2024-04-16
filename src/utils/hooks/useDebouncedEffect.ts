import { DependencyList, useEffect, useRef } from 'react';

export function useDebouncedEffect(
  callback: () => void,
  deps: DependencyList = [],
  timeout: number = 300,
  skipInitialEffect = false,
) {
  const data = useRef<{
    firstTime: boolean;
    clearFunction?: (() => void) | void;
  }>({ firstTime: true, clearFunction: undefined });

  useEffect(() => {
    const { firstTime, clearFunction } = data.current;

    if (firstTime && skipInitialEffect) {
      data.current.firstTime = false;
      return;
    }

    const handler = setTimeout(() => {
      if (clearFunction && typeof clearFunction === 'function') {
        clearFunction();
      }
      data.current.clearFunction = callback();
    }, timeout);

    return () => {
      clearTimeout(handler);
    };
  }, [timeout, ...deps]);
}
