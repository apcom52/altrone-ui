import { createContext, useContext } from 'react';

/** An item reports itself here whenever its `selected` changes, so the
    container can position the single shared backdrop over the active one. */
export const BottomNavigationContext = createContext<
  (el: HTMLElement | null, selected: boolean) => void
>(() => {});
export const useBottomNavigationSelect = () =>
  useContext(BottomNavigationContext);
