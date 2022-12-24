/// <reference types="react" />
import './progress.scss';
import { Role, Size } from "../../../types";
export declare enum ProgressVariant {
    default = "default",
    segmented = "segmented"
}
interface ProgressProps {
    value: number;
    max?: number;
    size?: Size;
    role?: Role;
    variant?: ProgressVariant;
    className?: string;
}
declare const _default: import("react").MemoExoticComponent<({ variant, value, max, role, size, className }: ProgressProps) => JSX.Element>;
export default _default;
