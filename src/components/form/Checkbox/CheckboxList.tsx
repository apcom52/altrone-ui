import {memo} from "react";
import {Direction} from "../../../types";
import clsx from "clsx";
import './checkbox-list.scss';

interface CheckboxListProps extends React.HTMLProps<HTMLDivElement> {
  direction?: Direction
}

const CheckboxList = ({ children, direction = Direction.horizontal, className, ...props }: CheckboxListProps) => {
  return <div className={clsx('alt-checkbox-list', className, {
    'alt-checkbox-list--vertical': direction === Direction.vertical
  })} {...props}>
    {children}
  </div>
}

export default memo(CheckboxList)