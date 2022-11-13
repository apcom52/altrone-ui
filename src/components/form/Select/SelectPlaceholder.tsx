import {memo, ReactNode} from "react";

interface SelectPlaceholderProps {
  children: string | ReactNode
}

const SelectPlaceholder = ({ children }: SelectPlaceholderProps) => {
  return <div className='alt-select-placeholder'>{children}</div>
}

export default memo(SelectPlaceholder)