import {memo} from "react";

interface FormFieldProps extends React.HTMLProps<HTMLDivElement> {

}

const FormField = ({ className, children, ...props}: FormFieldProps) => {
  return <div>
    {children}
  </div>
}

export default memo(FormField)