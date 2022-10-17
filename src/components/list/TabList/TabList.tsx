import {memo, useCallback, useEffect, useRef, useState} from "react";
import './tabs-list.scss';
import clsx from "clsx";
import {useResizeObserver} from "../../../hooks";

export enum TabListVariant {
  default = 'default',
  border = 'border',
  solid = 'solid'
}

interface TabListProps {
  selected: number | string;
  tabs: {
    label: string
    value: number | string
    disabled?: boolean
    href?: string
  }[];
  onChange: (value: number | string) => void;
  variant?: TabListVariant;
  fluid?: boolean;
}

const TabList = ({ selected, tabs = [], variant = TabListVariant.default, onChange, fluid = false }: TabListProps) => {
  const tabListRef = useRef(null)
  const selectedTabRef = useRef(null)
  const [activeBackgroundStyles, setActiveBackgroundStyles] = useState({})

  const setBackgroundPosition = useCallback(() => {
    if (selectedTabRef.current) {
      setActiveBackgroundStyles({
        left: selectedTabRef.current.offsetLeft,
        width: selectedTabRef.current.offsetWidth
      })
    } else {
      setActiveBackgroundStyles({})
    }
  }, [])

  const tabsListObserver = useResizeObserver(tabListRef)

  useEffect(() => {
    setBackgroundPosition()
  }, [selected, setBackgroundPosition, tabsListObserver])

  return <div
    className={clsx('alt-tab-list', {
      'alt-tab-list--fluid': fluid,
      'alt-tab-list--variant-borders': variant === TabListVariant.border,
    })}
    ref={tabListRef}
  >
    <div className='alt-tab-list__active-background' style={activeBackgroundStyles} />
    {tabs.map((tab, tabIndex) => {
      const isSelected = tab.value === selected
      return <button
        key={tabIndex}
        className={clsx('alt-tab', {
          'alt-tab--selected': isSelected
        })}
        ref={isSelected ? selectedTabRef : null}
        onClick={() => onChange(tab.value)}
      >
        {tab.label}
      </button>
    })}
  </div>
}

export default memo(TabList)