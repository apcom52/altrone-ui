import { createContext, useContext } from 'react';

export const ContextMenuTotalPages = createContext<number>(0);
export const useContextMenuTotalPages = () => useContext(ContextMenuTotalPages);
