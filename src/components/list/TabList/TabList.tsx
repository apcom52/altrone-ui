import {memo, useCallback, useEffect, useRef, useState} from "react";
import './tabs-list.scss';
import clsx from "clsx";
import {useResizeObserver} from "../../../hooks";
import {Icon} from "../../icons";

export enum TabListVariant {
  default = 'default',
  border = 'border',
  solid = 'solid'
}

type TabValue = number | string

interface TabListProps {
  selected: TabValue;
  tabs: {
    label: string
    value: TabValue
    disabled?: boolean
    href?: string
  }[];
  onChange: (value: TabValue) => void;
  variant?: TabListVariant;
  fluid?: boolean;
  showCloseButtons?: boolean
  onCloseTab?: (value: TabValue) => void
}

const TabList = ({ selected, tabs = [], variant = TabListVariant.default, onChange, fluid = false }: TabListProps) => {
  const tabListRef = useRef(null)
  const selectedTabRef = useRef(null)
  const [activeBackgroundStyles, setActiveBackgroundStyles] = useState({})

  const setBackgroundPosition = useCallback(() => {
    if (selectedTabRef.current && variant !== TabListVariant.solid) {
      const offset = variant === TabListVariant.border ? 20 : 0

      setActiveBackgroundStyles({
        left: selectedTabRef.current.offsetLeft + offset,
        width: selectedTabRef.current.offsetWidth - offset * 2
      })
    } else {
      setActiveBackgroundStyles({})
    }
  }, [variant])

  const tabsListObserver = useResizeObserver(tabListRef)

  useEffect(() => {
    setBackgroundPosition()
  }, [selected, setBackgroundPosition, tabsListObserver])

  return <div
    className={clsx('alt-tab-list', {
      'alt-tab-list--fluid': fluid,
      'alt-tab-list--variant-borders': variant === TabListVariant.border,
      'alt-tab-list--variant-solid': variant === TabListVariant.solid,
    })}
    ref={tabListRef}
  >
    {variant !== TabListVariant.solid && <div className='alt-tab-list__active-background' style={activeBackgroundStyles} />}
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
        <button className='alt-tab__close'><Icon i='close' /></button>
      </button>
    })}
  </div>
}

export default memo(TabList)