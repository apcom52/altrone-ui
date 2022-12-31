/// <reference types="react" />
import { WithoutDefaultOffsets } from "../../../types";
import "./floating-box.scss";
import { Options } from "@popperjs/core";
export declare enum FloatingBoxMobileBehaviour {
    default = "default",
    modal = "modal"
}
interface FloatingBoxProps extends WithoutDefaultOffsets {
    targetElement: HTMLElement | null;
    onClose: () => void;
    offset?: number;
    placement?: Options["placement"];
    popperProps?: Omit<Partial<Options>, "modifiers">;
    useParentWidth?: boolean;
    minWidth?: number | string;
    maxHeight?: number | string;
    useRootContainer?: boolean;
    preventClose?: (e: MouseEvent) => boolean;
    mobileBehaviour?: FloatingBoxMobileBehaviour;
    closeOnAnotherFloatingBoxClick?: boolean;
    className?: string;
}
declare const FloatingBox: import("react").ForwardRefExoticComponent<FloatingBoxProps & import("react").RefAttributes<HTMLDivElement>>;
export default FloatingBox;
