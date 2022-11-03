import {memo, ReactNode} from "react";
import clsx from "clsx";
import {Align} from "../../../types/Align";

interface ToolbarGroupProps {
  align?: Align
  fluid?: boolean
  children?: ReactNode | ReactNode[]
}

const ToolbarGroup = ({ children, fluid = false, align = Align.center }: ToolbarGroupProps) => {
  return <div className={clsx('alt-toolbar-group', {
    'alt-toolbar-group--fluid': fluid,
    'alt-toolbar-group--align-start': align === Align.start,
    'alt-toolbar-group--align-end': align === Align.end,
  })}>
    {children}
  </div>
}

export default memo(ToolbarGroup)