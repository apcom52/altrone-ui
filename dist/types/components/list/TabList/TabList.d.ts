/// <reference types="react" />
import './tabs-list.scss';
import { Align } from "../../../types/Align";
export declare enum TabListVariant {
    default = "default",
    border = "border",
    solid = "solid"
}
type TabValue = number | string;
interface TabListProps {
    selected: TabValue;
    tabs: {
        label: string;
        value: TabValue;
        disabled?: boolean;
        href?: string;
    }[];
    onChange: (value: TabValue) => void;
    variant?: TabListVariant;
    fluid?: boolean;
    showCloseButtons?: boolean;
    showAddTabButton?: boolean;
    onCloseTab?: (value: TabValue) => void;
    onAddTab?: () => void;
    align?: Align;
}
declare const _default: import("react").MemoExoticComponent<({ selected, tabs, variant, fluid, showCloseButtons, showAddTabButton, onChange, onCloseTab, onAddTab, align }: TabListProps) => JSX.Element>;
export default _default;
