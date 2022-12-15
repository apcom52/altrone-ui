/// <reference types="react" />
import './icon.scss';
import { Offset } from "../../../hooks/useOffset/useOffset";
type MaterialIconStyle = 'outlined' | 'rounded' | 'sharp';
interface IconProps {
    i: string;
    size?: number;
    className?: string;
    margin?: Offset;
    padding?: Offset;
    style?: MaterialIconStyle;
}
declare const _default: import("react").MemoExoticComponent<({ i, size, className, style, ...props }: IconProps) => JSX.Element>;
export default _default;
