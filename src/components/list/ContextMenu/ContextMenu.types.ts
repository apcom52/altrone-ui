import { ContextMenuType } from '../../../types';

export interface ContextMenuComponentProps {
  onClose: () => void;
  menu: ContextMenuType;
  fluid?: boolean;
  maxHeight?: number | string;
}
