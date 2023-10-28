import { useCallback, useState } from 'react';

export const useStateInRange = (min = 0, max = 100, defaultValue = 0) => {
  const [value, setValue] = useState(() => {
    // check min
    if (defaultValue >= min && defaultValue <= max) {
      return defaultValue;
    }

    if (defaultValue < min) {
      return min;
    }

    if (defaultValue > max) {
      return max;
    }

    return defaultValue;
  });

  const changeValue = useCallback(
    (value: number) => {
      if (value >= min && value <= max) {
        setValue(value);
        return;
      }

      if (value < min) {
        setValue(min);
        return;
      }

      if (value > max) {
        setValue(max);
        return;
      }
    },
    [min, max]
  );

  return [value, changeValue] as const;
};
