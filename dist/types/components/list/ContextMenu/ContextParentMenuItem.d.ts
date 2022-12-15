/// <reference types="react" />
import { ParentContextAction } from "../../../types";
interface ContextParentMenuItem extends ParentContextAction {
    onClick: (action: ParentContextAction | null) => void;
    onClose: () => void;
}
declare const ContextParentMenuItem: ({ onClick, onClose, ...action }: ContextParentMenuItem) => JSX.Element;
declare const _default: import("react").MemoExoticComponent<({ onClick, onClose, ...action }: ContextParentMenuItem) => JSX.Element>;
export default _default;
