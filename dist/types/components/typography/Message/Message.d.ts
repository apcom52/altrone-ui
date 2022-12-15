/// <reference types="react" />
import './message.scss';
import { Role } from "../../../types";
interface MessageProps extends Omit<React.HTMLProps<HTMLDivElement>, 'title' | 'style'> {
    title?: string;
    role?: Role;
    IconComponent?: JSX.Element;
    className?: string;
}
declare const _default: import("react").MemoExoticComponent<({ title, children, role, IconComponent, className }: MessageProps) => JSX.Element>;
export default _default;
