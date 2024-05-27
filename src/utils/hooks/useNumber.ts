import { useCallback, useEffect, useState } from 'react';
import { warning } from 'rc-util';

export const useNumber = (initialValue: number, min?: number, max?: number) => {
  const [value, setValue] = useState(() => {
    if (typeof min === 'number' && initialValue < min) {
      return min;
    }

    if (typeof max === 'number' && initialValue > max) {
      return max;
    }

    return initialValue;
  });

  useEffect(() => {
    if (typeof min === 'number' && typeof max === 'number') {
      warning(min < max, '[useNumber]: min has to be less than max!');
    }
  }, [min, max]);

  const increment = useCallback(() => {
    setValue((oldValue) => {
      if (typeof max === 'number' && value < max) {
        return oldValue + 1;
      }

      return oldValue;
    });
  }, [max]);

  const decrement = useCallback(() => {
    setValue((oldValue) => {
      if (typeof min === 'number' && oldValue > min) {
        return oldValue - 1;
      }

      return oldValue;
    });
  }, [min]);

  return {
    value,
    setValue,
    increment,
    decrement,
  };
};
