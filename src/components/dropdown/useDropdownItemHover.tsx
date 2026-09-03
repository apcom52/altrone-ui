import { useOverlayItemBackground } from 'utils';
import { usePopoverCurrentId } from 'components/popover/Popover';
import s from './components/action.module.scss';

export const useDropdownItemHover = () => {
  const popoverId = usePopoverCurrentId();

  return useOverlayItemBackground({
    popoverId,
    className: s.ItemBackground,
  });
};
