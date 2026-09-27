import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleAlert,
  Delete,
  HelpCircle,
  Info,
  Search,
  XCircle,
} from 'lucide-react';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { IconSet } from './Application.types.ts';

interface IconsProps extends PropsWithChildren {
  icons: Partial<IconSet>;
}

export const DEFAULT_ICONS: IconSet = {
  prev: <ChevronLeft />,
  next: <ChevronRight />,
  open: <ChevronDown />,
  close: <ChevronUp />,
  search: <Search />,
  clear: <Delete />,
  error: <CircleAlert />,
  help: <HelpCircle />,
  info: <Info />,
  success: <CheckCircle2 />,
  warning: <AlertTriangle />,
  danger: <XCircle />,
};

const IconsContext = createContext<IconSet>(DEFAULT_ICONS);

export const AltroneIcons = ({ icons = {}, children }: IconsProps) => {
  const context = useMemo<IconSet>(
    () => ({ ...DEFAULT_ICONS, ...icons }),
    [icons],
  );

  return (
    <IconsContext.Provider value={context}>{children}</IconsContext.Provider>
  );
};

export const useIcons = () => useContext(IconsContext);
