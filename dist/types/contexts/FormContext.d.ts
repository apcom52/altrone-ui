/// <reference types="react" />
export interface FormContextProps {
    required?: boolean;
    disabled?: boolean;
}
export declare const FormContext: import("react").Context<FormContextProps>;
export declare const useFormContext: () => FormContextProps;
