/// <reference types="react" />
import { Size, WithAltroneOffsets, WithoutDefaultOffsets } from "../../../types";
import './text-input.scss';
export declare enum InputIslandType {
    text = 0,
    icon = 1,
    actions = 2,
    components = 3
}
export interface InputIslandAction {
    title: string;
    icon: JSX.Element;
    onClick: () => void;
    disabled?: boolean;
}
export interface InputIsland {
    type: InputIslandType;
    content: string | JSX.Element | JSX.Element[] | InputIslandAction[];
}
export interface TextInputProps extends Omit<WithoutDefaultOffsets<React.HTMLProps<HTMLInputElement>>, 'value' | 'onChange' | 'size'>, WithAltroneOffsets {
    value: string;
    onChange: (value: string) => void;
    classNames?: {
        control?: string;
    };
    leftIsland?: InputIsland;
    rightIsland?: InputIsland;
    prefix?: string;
    suffix?: string;
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
    errorText?: string;
    hintText?: string;
    size?: Size;
    Component?: JSX.Element;
}
declare const _default: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<import("react").RefAttributes<HTMLInputElement>>>;
export default _default;
