import button from "../../button/Button/Button";
import {memo} from "react";

interface TabProps extends React.HTMLProps<HTMLButtonElement> {
  value: string | number
}

const Tab = ({ children }: TabProps) => {
  return <button className='alt-tab'>{children}</button>
}

export default memo(Tab)