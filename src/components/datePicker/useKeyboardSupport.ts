import { RefObject, useEffect, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

interface UseKeyboardSupportOptions {
  rows: number;
  columns: number;
  index: number;
  minIndex: number;
  maxIndex: number;
}

export const useKeyboardSupport = (
  container: RefObject<HTMLElement>,
  options: UseKeyboardSupportOptions,
) => {
  const currentIndex = useRef<number>(options.index);

  useEffect(() => {
    if (container) {
      const element = container.current?.querySelector(
        `[data-index="${options.index}"]`,
      ) as HTMLButtonElement;
      element?.focus();
    }
  }, [options.index]);

  const { minIndex = 0, maxIndex = options.rows * options.columns } = options;

  const getHorizontalRange = (index: number) => {
    for (let i = 0; i < options.columns * options.rows; i += options.columns) {
      let min = Math.max(i, minIndex);
      let max = Math.min(i + options.columns - 1, maxIndex);

      if (index >= min && index <= max) {
        return [Math.max(min, index - 1), Math.min(max, index + 1)];
      }
    }

    return null;
  };

  const getVerticalRange = (index: number) => {
    const previousIndex = index - options.columns;
    const nextIndex = index + options.columns;
    const startIndex = 0;
    const endIndex = options.rows * options.columns - 1;

    const columnIndex = index % options.columns;
    const minAllowedIndex = columnIndex;
    const maxAllowedIndex = options.columns * (options.rows - 1) + columnIndex;

    return [
      Math.max(startIndex, previousIndex, minIndex, minAllowedIndex),
      Math.min(endIndex, nextIndex, maxIndex, maxAllowedIndex),
    ];
  };

  const focusElement = (index: number) => {
    const element = container.current?.querySelector(
      `[data-index="${index}"]`,
    ) as HTMLButtonElement;

    element?.focus();
    currentIndex.current = index;
  };

  useHotkeys('left', () => {
    const indexes = getHorizontalRange(currentIndex.current);

    if (indexes) {
      focusElement(indexes[0]);
    }
  });
  useHotkeys('right', () => {
    const indexes = getHorizontalRange(currentIndex.current);

    if (indexes) {
      focusElement(indexes[1]);
    }
  });
  useHotkeys('up', () => {
    const indexes = getVerticalRange(currentIndex.current);
    if (indexes) {
      focusElement(indexes[0]);
    }
  });
  useHotkeys('down', () => {
    const indexes = getVerticalRange(currentIndex.current);
    if (indexes) {
      focusElement(indexes[1]);
    }
  });

  return null;
};
