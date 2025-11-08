import { createContext, useContext } from 'react';

export const TextSizeContext = createContext<number>(4);
export const useTextSize = () => useContext(TextSizeContext);
