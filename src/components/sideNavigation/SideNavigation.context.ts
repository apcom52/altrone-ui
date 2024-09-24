import { createContext, useContext } from 'react';
import { SideNavigationContextType } from './SideNavigation.types.ts';

export const SideNavigationContext = createContext<SideNavigationContextType>({
  currentItem: '',
  setItem: () => null,
});
export const useCurrentSideNavigation = () => useContext(SideNavigationContext);
