import { MouseEvent, ReactNode, useEffect } from 'react';
import { useListItem } from '@floating-ui/react';
import clsx from 'clsx';
import { useOverlayItemBackground } from 'utils';
import { usePopoverCurrentId, usePopoverCurrentIndex } from 'components/popover/Popover';
import s from './autocompleteSuggestion.module.scss';

interface AutocompleteSuggestionProps {
  children: ReactNode;
  onSelect: (event: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Row wrapper for a single suggestion. Owns list-item registration, the
 * sliding hover/focus highlight and the click target, so `renderSuggestion`
 * only has to return the row's content.
 */
export const AutocompleteSuggestion = ({
  children,
  onSelect,
}: AutocompleteSuggestionProps) => {
  const { ref, index } = useListItem();
  const activeIndex = usePopoverCurrentIndex();
  const popoverId = usePopoverCurrentId();
  const isActive = index === activeIndex;

  const { itemBackgroundElement, onMouseEnter, onMouseLeave } =
    useOverlayItemBackground({
      popoverId,
      className: s.SuggestionBackground,
    });

  useEffect(() => {
    if (isActive) {
      onMouseEnter();
    } else {
      onMouseLeave();
    }
  }, [isActive]);

  return (
    <button
      ref={ref}
      type="button"
      className={clsx(s.Suggestion, 'no-selection')}
      data-active={isActive}
      onClick={onSelect}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {itemBackgroundElement}
      {children}
    </button>
  );
};
