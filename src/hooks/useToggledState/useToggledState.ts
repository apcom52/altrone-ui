import { useCallback, useState } from 'react';

export const useToggledState = (defaultValue: boolean) => {
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
    setValue,
    enable,
    disable,
    toggle
  };
};
