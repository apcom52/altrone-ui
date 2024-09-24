import { EffectCallback, useEffect, useRef } from 'react';

export const useDidUpdate = (callback: EffectCallback, deps: any[]) => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = false;
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      return callback();
    }

    isMounted.current = false;
  }, [deps]);
};
