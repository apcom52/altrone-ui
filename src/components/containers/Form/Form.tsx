import clsx from "clsx";
import {memo} from "react";

interface FormProps extends React.HTMLProps<HTMLFormElement> {

}

const Form = ({ className, children, ...props}: FormProps) => {
  return <form className={clsx('alt-form', className)} {...props}>
    {children}
  </form>
}

export default memo(Form)