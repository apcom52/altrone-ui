/// <reference types="react" />
export interface SelectOptionProps {
    label: string;
    value: string | number;
    disabled: boolean;
    selected: boolean;
    onSelect: (value: number | string) => void;
    parent?: string | number;
    className?: string;
    inSelectHeader?: boolean;
}
declare const _default: import("react").MemoExoticComponent<({ label, value, disabled, selected, onSelect, className, inSelectHeader }: SelectOptionProps) => JSX.Element>;
export default _default;
