import {memo} from "react";
import './navigation-list.scss';
import NavigationListItem from "./NavigationListItem";

interface SubSubNavigationItem {
  label: string
  value: unknown
}

interface SubNavigationItem {
  label: string
  value: unknown
  icon?: JSX.Element
  submenu?: SubSubNavigationItem[]
}

interface NavigationItem {
  label: string
  value: unknown
  icon?: JSX.Element
  submenu?: SubNavigationItem[]
}

interface BaseNavigationItemInterface {
  selected: boolean
  onClick: (value: unknown) => void
  onExpand?: (value: unknown) => void
}

export interface NavigationItemProps extends BaseNavigationItemInterface, NavigationItem {}
export interface SubNavigationItemProps extends BaseNavigationItemInterface, SubNavigationItem {}
export interface SubSubNavigationItemProps extends BaseNavigationItemInterface, SubNavigationItem {}

interface NavigationListProps {
  list: NavigationItem[]
  selected: unknown
  onChange: (selectedValue: unknown) => void
  title?: string
  NavigationItemComponent?: JSX.Element
  NavigationSubItemComponent?: JSX.Element
  NavigationSubSubItemComponent?: JSX.Element
}

const NavigationList = ({ list = [], selected, onChange, title, NavigationItemComponent, NavigationSubItemComponent, NavigationSubSubItemComponent }: NavigationListProps) => {
  return <div className='alt-navigation-list'>
    {title && <div className='alt-navigation-list__title'>{title}</div>}
    <nav className='alt-navigation-list__navigation'>
      {list.map((item, itemIndex) => {
        const itemProps: NavigationItemProps = {
          selected: item.value === selected,
          onClick: () => onChange(item.value),
          ...item
        }

        return NavigationItemComponent ? <NavigationItemComponent key={itemIndex} /> : <NavigationListItem {...itemProps} />
      })}
    </nav>
  </div>
}

export default memo(NavigationList)