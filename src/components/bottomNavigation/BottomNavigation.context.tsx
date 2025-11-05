import { createContext, useContext } from 'react';

export const BottomNavigationContext = createContext<string>('');
export const useBottomNavigationContext = () =>
  useContext(BottomNavigationContext);
