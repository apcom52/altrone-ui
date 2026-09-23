import {
  ChevronDown,
  ChevronsDown,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUp,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import type { ToolbarIconSet } from './Toolbar.types.ts';

export const DEFAULT_TOOLBAR_ICONS: ToolbarIconSet = {
  sidebarExpand: <PanelLeftOpen />,
  sidebarCollapse: <PanelLeftClose />,
  titleMenu: <ChevronDown />,
  overflowUp: <ChevronsUp />,
  overflowDown: <ChevronsDown />,
  overflowLeft: <ChevronsLeft />,
  overflowRight: <ChevronsRight />,
};
