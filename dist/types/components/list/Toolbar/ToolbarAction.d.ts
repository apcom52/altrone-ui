/// <reference types="react" />
import './toolbar-action.scss';
interface ToolbarActionProps {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  danger?: boolean;
  className?: string;
}
declare const _default: import('react').MemoExoticComponent<
  import('react').ForwardRefExoticComponent<
    ToolbarActionProps & import('react').RefAttributes<HTMLButtonElement>
  >
>;
export default _default;
