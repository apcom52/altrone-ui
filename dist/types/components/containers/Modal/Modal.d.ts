import { PropsWithChildren, ReactNode } from "react";
import { Align } from "../../../types/Align";
import { Role, Size } from "../../../types";
import './modal.scss';
interface ModalProps extends PropsWithChildren {
    onClose: () => void;
    title?: string;
    size?: Size;
    fluid?: boolean;
    actions?: {
        label: string;
        onClick: () => null;
        leftIcon?: ReactNode;
        rightIcon?: ReactNode;
        align?: Align;
        role?: Role;
    }[];
    showClose?: boolean;
    showCancel?: boolean;
    closeOnOverlay?: boolean;
    reduceMotion?: boolean;
    className?: string;
}
declare const _default: import("react").MemoExoticComponent<({ title, children, onClose, size, fluid, actions, showClose, showCancel, closeOnOverlay, reduceMotion, className }: ModalProps) => import("react").ReactPortal>;
export default _default;
