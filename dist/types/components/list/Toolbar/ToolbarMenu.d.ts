/// <reference types="react" />
import { ContextMenuType as ContextMenuType } from "../../../types";
import './toolbar-menu.scss';
export interface ToolbarMenuProps {
    menu: {
        label: string;
        submenu?: ContextMenuType;
    }[];
}
declare const _default: import("react").MemoExoticComponent<({ menu }: ToolbarMenuProps) => JSX.Element>;
export default _default;
