/// <reference types="react" />
import { Option } from "../../../types";
import { Align } from "../../../types/Align";
import './scrollable-selector.scss';
interface ScrollableSelectorProps<T> {
    value: T;
    options: Option<T>[];
    onChange: (value: T) => void;
    disabled?: boolean;
    width?: number | string;
    align?: Align;
    className?: string;
}
declare const _default: import("react").MemoExoticComponent<(<T extends unknown = string>({ value, options, width, disabled, align, onChange, className }: ScrollableSelectorProps<T>) => JSX.Element)>;
export default _default;
