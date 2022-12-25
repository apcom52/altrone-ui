import { ReactNode } from 'react';
import './toolbar.scss';
import { ToolbarMenuProps } from './ToolbarMenu';
import { Point } from '../../../types';
export declare const useToolbarContext: () => HTMLDivElement;
interface ToolbarProps {
  children: ReactNode | ReactNode[];
  floated?: boolean;
  menu?: ToolbarMenuProps['menu'];
  offset?: Point;
  width?: number | string;
  className?: string;
}
declare const _default: import('react').MemoExoticComponent<
  ({ children, floated, menu, offset, width, className }: ToolbarProps) => JSX.Element
>;
export default _default;
