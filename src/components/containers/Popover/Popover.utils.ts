import React, { useContext } from 'react';
import { PopoverContext } from './Popover.types';

export const popoverContext = React.createContext<PopoverContext>({
  closePopup: () => null
});

export const usePopoverContext = () => useContext(popoverContext);
