import { createContext, useContext, useState, ReactNode } from 'react';

interface DropdownHoverContextType {
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}

const DropdownHoverContext = createContext<DropdownHoverContextType | null>(
  null
);

export function DropdownHoverProvider({ children }: { children: ReactNode }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <DropdownHoverContext.Provider value={{ hoveredIndex, setHoveredIndex }}>
      {children}
    </DropdownHoverContext.Provider>
  );
}

export function useDropdownHover() {
  const context = useContext(DropdownHoverContext);

  if (!context) {
    throw new Error(
      'useDropdownHover must be used within DropdownHoverProvider'
    );
  }
  return context;
}
