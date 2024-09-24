import { DependencyList, useCallback, useEffect, useState } from 'react';
import debounce from 'debounce';

export function useDebouncedMemo<T>(
  callback: () => T,
  dependencies: DependencyList | undefined,
  delay: number,
) {
  const [state, setState] = useState(callback());
  const debouncedSetState = useCallback(debounce(setState, delay), []);

  useEffect(() => {
    debouncedSetState(callback());
  }, dependencies);

  return state;
}
