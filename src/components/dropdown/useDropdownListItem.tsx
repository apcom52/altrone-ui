import { useEffect } from 'react';
import { useListItem } from '@floating-ui/react';
import { usePopoverCurrentIndex } from 'components/popover/Popover';
import { useDropdownItemHover } from './useDropdownItemHover';

export const useDropdownListItem = () => {
  const currentIndex = usePopoverCurrentIndex();
  const { ref, index } = useListItem();

  const isFocused = currentIndex === index;

  const { itemBackgroundElement, onMouseEnter, onMouseLeave } =
    useDropdownItemHover();

  useEffect(() => {
    if (isFocused) {
      onMouseEnter();
    } else {
      onMouseLeave();
    }
  }, [isFocused]);

  return {
    ref,
    index,
    isFocused,
    itemBackgroundElement,
    onMouseEnter,
    onMouseLeave,
  };
};
