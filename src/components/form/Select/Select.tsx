import {createElement, memo, useEffect, useMemo, useRef, useState} from "react";
import {Option, OptionParent} from "../../../types";
import button from "../../button/Button/Button";
import {FloatingBox} from "../../containers";
import './select.scss';
import {Icon} from "../../icons";
import clsx from "clsx";
import {TextInput} from "../TextInput";
import SelectOption from "./SelectOption";

interface SelectProps<T extends number | string | boolean = string> extends Omit<React.HTMLProps<HTMLSelectElement>, 'value' | 'onChange'> {
  value: T
  options: Option<T>[]
  onChange: (value: T) => void
  parents?: OptionParent[]
  searchable?: boolean
  searchFunc?: (searchTerm: string, item: Option<T>) => boolean
  ItemComponent?: (item: Option<T>, checked: boolean) => Element;
  fluid?: boolean
  classNames?: {
    select?: string
    currentValue?: string
    menu?: string
    option?: string
  }
}

const DEFAULT_KEY = '_default'

const Select = ({ value, options = [], onChange, parents, searchable = false, searchFunc, ItemComponent = SelectOption, disabled = false, fluid = false, classNames = {} }: SelectProps) => {
  const [isSelectVisible, setIsSelectVisible] = useState(false)
  const [isSearchMode, setIsSearchMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const selectRef = useRef<HTMLButtonElement | HTMLInputElement>(null)

  const [groupedItems, parentKeys]: [Record<string, (OptionParent | Option)[]>, string[]] = useMemo(() => {
    const result = {
      [DEFAULT_KEY]: [{
        label: 'Others',
        value: null
      }],
    }

    let filteredOptions = [...options]

    if (searchable && searchTerm) {
      if (searchFunc) {
        filteredOptions = filteredOptions.filter(option => searchFunc(searchTerm, option))
      } else {
        filteredOptions = filteredOptions.filter(option => option.label.trim().toLowerCase().indexOf(searchTerm.trim().toLowerCase()) > -1)
      }
    }

    for (const option of filteredOptions) {
      if (option.parent) {
        if (result[option.parent]) {
          result[option.parent].push(option)
        } else {
          const parentData = parents.find(p => p.value === option.parent) || { label: option.parent, value: option.parent }
          result[option.parent] = [parentData, option]
        }
      } else {
        result[DEFAULT_KEY].push(option)
      }
    }

    const parentKeys = Object.keys(result).filter(pK => pK !== DEFAULT_KEY)

    return [result, [...parentKeys, DEFAULT_KEY]]
  }, [options, parents, searchable, searchTerm, searchFunc])

  const selectedOption = useMemo(() => {
    return options.find(option => option.value === value) || {}
  }, [value, options])

  const onSelectMenuClose = () => {
    setIsSelectVisible(false)
    setIsSearchMode(false)
  }

  const onSelectOption = (value) => {
    onChange(value)
    onSelectMenuClose()
  }

  const onSelectClick = () => {
    setTimeout(() => {
      setIsSelectVisible(true)
    }, 0)

    if (searchable) {
      setIsSearchMode(true)
    }
  }

  const onInputBlur = () => {
    if (!isSelectVisible) {
      setIsSearchMode(false)
    }
  }

  const preventSelectMenuClose = (e) => {
    return e.target === selectRef.current
  }

  useEffect(() => {
    if (!isSearchMode) {
      setSearchTerm('')
    }
  }, [isSearchMode])

  return <>
    {(!searchable || (searchable && !isSearchMode)) ? <button
      ref={selectRef}
      disabled={disabled}
      onClick={onSelectClick}
      data-testid='alt-test-select'
      className={clsx('alt-select', classNames.select, {
        'alt-select--fluid': fluid,
        'alt-select--active': isSelectVisible,
        'alt-select--disabled': disabled
      })}
    >
      <div
        className={clsx('alt-select__value', classNames.currentValue)}
        data-testid='alt-test-select-current-value'
      >
        {createElement(ItemComponent, {
          label: selectedOption?.label,
          value: selectedOption?.value,
          selected: false,
          disabled: false,
          onSelect: () => null,
          inSelectHeader: true
        })}
      </div>
      <div className='alt-select__arrow'><Icon i='expand_more' /></div>
    </button> : <TextInput
      ref={selectRef}
      placeholder='Search...'
      value={searchTerm}
      onChange={setSearchTerm}
      rightIcon={<Icon i='search' />}
      onBlur={onInputBlur}
      autoFocus
    />}
    {isSelectVisible && <FloatingBox
      placement='bottom'
      targetRef={selectRef.current}
      onClose={onSelectMenuClose}
      minWidth={200}
      preventClose={(searchable && isSearchMode) ? preventSelectMenuClose : undefined}
      data-testid='alt-test-select-search'
      useParentWidth
    >
      <div className={clsx('alt-select-menu', classNames.menu)} data-testid='alt-test-select-menu'>
        {parentKeys.map((groupValue, groupIndex, groupedValueKeys) => {
          const group = groupedItems[groupValue]
          const [groupInfo, ...options] = group
          const isSingle = groupedValueKeys.length === 1

          return <div className='alt-select-group' key={groupValue}>
            {(!isSingle && options.length) ? <div className='alt-select-group__title'>{groupInfo.label}</div> : null}
            {options.map((option, optionIndex) => (
              createElement(ItemComponent, {
                key: optionIndex,
                label: option.label,
                value: option.value,
                selected: option.value === value,
                disabled: option.disabled || groupInfo.disabled,
                onSelect: onSelectOption,
                inSelectHeader: true
              })
            ))}
          </div>
        })}
      </div>
    </FloatingBox>}
  </>
}

export default memo(Select)