import {memo, useCallback, useEffect, useRef, useState} from "react";
import './tabs-list.scss';
import clsx from "clsx";
import {useResizeObserver} from "../../../hooks";
import {Icon} from "../../icons";
import {Align} from "../../../types/Align";

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
  showAddTabButton?: boolean
  onCloseTab?: (value: TabValue) => void
  onAddTab?: () => void
  align?: Align
}

const TabList = ({
  selected,
  tabs = [],
  variant = TabListVariant.default,
  fluid = false,
  showCloseButtons = true,
  showAddTabButton = true,
  onChange,
  onCloseTab,
  onAddTab,
  align = Align.center
}: TabListProps) => {
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
  }, [selected, setBackgroundPosition, tabsListObserver, align])

  const onCloseClick = (e, value) => {
    if (variant === TabListVariant.solid && onCloseTab) {
      e.stopPropagation()
      onCloseTab(value)
    }
  }

  return <div
    className={clsx('alt-tab-list', {
      'alt-tab-list--fluid': fluid,
      'alt-tab-list--variant-borders': variant === TabListVariant.border,
      'alt-tab-list--variant-solid': variant === TabListVariant.solid,
      'alt-tab-list--align-start': align === Align.start,
      'alt-tab-list--align-end': align === Align.end,
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
        {(variant === TabListVariant.solid && showCloseButtons && onCloseTab)
          && <button className='alt-tab__close' onClick={(e) => onCloseClick(e, tab.value)}><Icon i='close' /></button>}
      </button>
    })}
    {(variant === TabListVariant.solid && showAddTabButton && onAddTab) && <button className='alt-tab-list__add' onClick={onAddTab}>
      <Icon i='add' />
    </button>}
  </div>
}

export default memo(TabList)