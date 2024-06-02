import { useCallback, useState } from 'react';

export const useBoolean = (defaultValue: boolean) => {
  const [state, setState] = useState<boolean>(defaultValue);

  const enable = useCallback(() => {
    setState(true);
  }, []);

  const disable = useCallback(() => {
    setState(false);
  }, []);

  const toggle = useCallback(() => {
    setState((old) => !old);
  }, []);

  return {
    value: state,
    setValue: setState,
    enable,
    disable,
    toggle,
  };
};
