import { useEffect, useRef } from 'react';

export const useConstructor = (callback: () => void) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      callback();
    }
  }, []);
};
