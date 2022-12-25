/// <reference types="react" />
import { ContextMenuType as ContextMenuType } from '../../../types';
import './context-menu.scss';
interface ContextMenuComponentProps {
  onClose: () => void;
  menu: ContextMenuType;
}
declare const _default: import('react').MemoExoticComponent<
  ({ menu, onClose }: ContextMenuComponentProps) => JSX.Element
>;
export default _default;
