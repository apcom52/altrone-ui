import {memo} from "react";

interface FormGroupProps extends React.HTMLProps<HTMLDivElement> {

}

const FormGroup = ({ className, children, ...props}: FormGroupProps) => {
  return <div>
    {children}
  </div>
}

export default memo(FormGroup)