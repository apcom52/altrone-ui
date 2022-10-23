import {createContext, useContext} from "react";

export interface FormContextProps {
  required?: boolean
  disabled?: boolean
}

export const FormContext = createContext<FormContextProps>({})
export const useFormContext = () => useContext(FormContext)
