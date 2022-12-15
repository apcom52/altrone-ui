/// <reference types="react" />
import './number-input-counter.scss';
interface NumberInputCounterProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
}
declare const _default: import("react").MemoExoticComponent<({ value, onChange, min, max, step }: NumberInputCounterProps) => JSX.Element>;
export default _default;
