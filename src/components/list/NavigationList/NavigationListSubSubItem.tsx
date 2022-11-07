import './navigation-list-sub-sub-item.scss'
import {memo} from "react";
import {NavigationSubSubItemProps} from "./NavigationList";
import clsx from "clsx";

const NavigationListSubSubItem = ({ label, value, onClick, selected = false }: NavigationSubSubItemProps) => {
  return <button
    className={clsx('alt-navigation-list-sub-sub-item', {
      'alt-navigation-list-sub-sub-item--selected': selected
    })}
    onClick={() => onClick(value)}
  >
    {label}
  </button>
}

export default memo(NavigationListSubSubItem)