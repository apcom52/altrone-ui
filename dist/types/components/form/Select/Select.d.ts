/// <reference types="react" />
import { Option, OptionParent, Size } from "../../../types";
import './select.scss';
import { BasicInputProps } from "../BasicInput";
interface SelectProps<T extends number | string | boolean = string> extends Omit<React.HTMLProps<HTMLSelectElement>, 'value' | 'onChange' | 'size'>, BasicInputProps {
    value: T;
    options: Option<T>[];
    onChange: (value: T) => void;
    parents?: OptionParent[];
    searchable?: boolean;
    searchFunc?: (searchTerm: string, item: Option<T>) => boolean;
    ItemComponent?: (item: Option<T>, checked: boolean) => Element;
    size?: Size;
    classNames?: {
        select?: string;
        currentValue?: string;
        menu?: string;
        option?: string;
    };
}
declare const _default: import("react").MemoExoticComponent<({ value, options, onChange, id, parents, searchable, searchFunc, ItemComponent, disabled, size, classNames, placeholder, hintText, errorText }: SelectProps<string>) => JSX.Element>;
export default _default;
