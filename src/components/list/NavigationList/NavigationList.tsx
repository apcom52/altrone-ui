import {memo, useMemo} from "react";
import './navigation-list.scss';
import NavigationListItem from "./NavigationListItem";
import NavigationListSubItem from "./NavigationListSubItem";
import NavigationListSubSubItem from "./NavigationListSubSubItem";

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
export interface NavigationSubItemProps extends BaseNavigationItemInterface, SubNavigationItem {}
export interface NavigationSubSubItemProps extends Omit<BaseNavigationItemInterface, 'onExpand'>, SubSubNavigationItem {}

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
  const [selectedItem, selectedSubItem, selectedSubSubItem] = useMemo(() => {
    for (const item of list) {
      if (item.value === selected) {
        return [item.value, null, null]
      }

      if (item?.submenu?.length) {
        for (const subitem of item.submenu) {
          if (subitem.value === selected) {
            return [item.value, subitem.value, null]
          }

          if (subitem?.submenu?.length) {
            for (const subsubitem of subitem.submenu) {
              if (subsubitem.value === selected) {
                return [item.value, subitem.value, subsubitem.value]
              }
            }
          }
        }
      }
    }

    return [null, null, null]
  }, [selected, list])

  return <div className='alt-navigation-list'>
    {title && <div className='alt-navigation-list__title'>{title}</div>}
    <nav className='alt-navigation-list__navigation'>
      {list.map((item, itemIndex) => {
        const itemProps: NavigationItemProps = {
          selected: item.value === selectedItem,
          onClick: () => onChange(item.value),
          ...item
        }

        return <>
          {NavigationItemComponent ? <NavigationItemComponent key={itemIndex} {...itemProps} /> : <NavigationListItem key={itemIndex} {...itemProps} />}
          {(selectedItem === item.value && item.submenu?.length > 0) && <div className='alt-navigation-list__navigation'>
            {item.submenu?.map((subitem, subitemIndex) => {
              const subItemProps: NavigationSubItemProps = {
              selected: subitem.value === selectedSubItem,
              onClick: () => onChange(subitem.value),
              ...subitem
            }

              return <>
                {NavigationSubItemComponent ? <NavigationSubItemComponent key={itemIndex} {...subItemProps} /> : <NavigationListSubItem key={subitemIndex} {...subItemProps} />}

                {(selectedSubItem === subitem.value && subitem.submenu?.length > 0) && <div className='alt-navigation-list__navigation'>
                  {subitem.submenu?.map((subsubitem, subsubitemIndex) => {
                    const subsubItemProps: NavigationSubSubItemProps = {
                      selected: subsubitem.value === selectedSubSubItem,
                      onClick: () => onChange(subsubitem.value),
                      ...subsubitem
                    }

                    return <>
                      {NavigationSubItemComponent ? <NavigationSubSubItemComponent key={itemIndex} {...subsubItemProps} /> : <NavigationListSubSubItem key={subsubitemIndex} {...subsubItemProps} />}
                    </>
                  })}
                </div>}
              </>
            })}
          </div>}
        </>
      })}
    </nav>
  </div>
}

export default memo(NavigationList)