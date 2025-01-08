import { createContext, useContext } from 'react';

export const NavigationListLevelContext = createContext<number>(0);
export const useNavigationListLevel = () =>
  useContext(NavigationListLevelContext);
