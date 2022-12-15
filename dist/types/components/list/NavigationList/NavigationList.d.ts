/// <reference types="react" />
import './navigation-list.scss';
interface SubSubNavigationItem {
    label: string;
    value: unknown;
}
interface SubNavigationItem {
    label: string;
    value: unknown;
    icon?: JSX.Element;
    submenu?: SubSubNavigationItem[];
}
interface NavigationItem {
    label: string;
    value: unknown;
    icon?: JSX.Element;
    submenu?: SubNavigationItem[];
}
interface BaseNavigationItemInterface {
    selected: boolean;
    onClick: (value: unknown) => void;
    onExpand?: (value: unknown) => void;
}
export interface NavigationItemProps extends BaseNavigationItemInterface, NavigationItem {
}
export interface NavigationSubItemProps extends BaseNavigationItemInterface, SubNavigationItem {
}
export interface NavigationSubSubItemProps extends Omit<BaseNavigationItemInterface, 'onExpand'>, SubSubNavigationItem {
}
interface NavigationListProps {
    list: NavigationItem[];
    selected: unknown;
    onChange: (selectedValue: unknown) => void;
    title?: string;
    className?: string;
    NavigationItemComponent?: JSX.Element;
    NavigationSubItemComponent?: JSX.Element;
    NavigationSubSubItemComponent?: JSX.Element;
}
declare const _default: import("react").MemoExoticComponent<({ list, selected, onChange, title, className, NavigationItemComponent, NavigationSubItemComponent, NavigationSubSubItemComponent }: NavigationListProps) => JSX.Element>;
export default _default;
