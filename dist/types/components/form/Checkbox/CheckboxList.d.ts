/// <reference types="react" />
import { Direction } from "../../../types";
import './checkbox-list.scss';
interface CheckboxListProps extends React.HTMLProps<HTMLDivElement> {
    direction?: Direction;
    limit?: number;
}
declare const _default: import("react").MemoExoticComponent<({ children, direction, className, limit, ...props }: CheckboxListProps) => JSX.Element>;
export default _default;
