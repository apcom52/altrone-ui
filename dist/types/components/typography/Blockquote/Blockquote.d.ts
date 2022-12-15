/// <reference types="react" />
import { WithAltroneOffsets, WithoutDefaultOffsets } from "../../../types";
import './blockquote.scss';
interface BlockquoteProps extends WithoutDefaultOffsets, WithAltroneOffsets {
    cite?: string;
    author?: string;
    classNames?: {
        content?: string;
        author?: string;
    };
    innerProps?: {
        content?: React.HTMLProps<HTMLQuoteElement>;
        author: React.HTMLProps<HTMLDivElement>;
    };
}
declare const _default: import("react").MemoExoticComponent<({ children, className, author, classNames, innerProps, cite, ...props }: BlockquoteProps) => JSX.Element>;
export default _default;
