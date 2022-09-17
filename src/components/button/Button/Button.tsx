import {memo} from "react";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {

}

const Button = ({ children }: ButtonProps) => {
  return <button>{children}</button>
}

export default memo(Button)