import {memo, useMemo, useRef, useState} from "react";
import {Option, OptionParent} from "../../../types";
import button from "../../button/Button/Button";
import {FloatingBox} from "../../containers";
import './select.scss';
import {Icon} from "../../icons";
import clsx from "clsx";

interface SelectProps<T extends number | string | boolean = string> extends Omit<React.HTMLProps<HTMLSelectElement>, 'value' | 'onChange'> {
  value: T
  options: Option<T>[]
  onChange: (value: T) => void
  parents?: OptionParent[]
  searchable?: boolean
  searchFunc?: (searchTerm: string, item: T) => boolean
  ItemComponent?: (item: Option<T>, checked: boolean) => Element;
  fluid?: boolean
  classNames?: {
    select?: string
    currentValue?: string
    menu?: string
    option?: string
  }
}

const Select = ({ value, options = [], onChange, parents, searchable = false, searchFunc, ItemComponent, disabled, fluid = false, classNames = {} }: SelectProps) => {
  const [isSelectVisible, setIsSelectVisible] = useState(false)
  const selectRef = useRef<HTMLButtonElement>(null)

  const selectedOption = useMemo(() => {
    return options.find(option => option.value === value)
  }, [value, options])

  const onSelectOption = (value) => {
    onChange(value)
    setIsSelectVisible(false)
  }

  return <>
    <button
      ref={selectRef}
      disabled={disabled}
      onClick={() => setIsSelectVisible(true)}
      data-testid='alt-test-select'
      className={clsx('alt-select', classNames.select, {
        'alt-select--fluid': fluid,
        'alt-select--active': isSelectVisible
      })}
    >
      <div
        className={clsx('alt-select__value', classNames.currentValue)}
        data-testid='alt-test-select-current-value'
      >
        {selectedOption ? selectedOption.label : null}
      </div>
      <div className='alt-select__arrow'><Icon i='expand_more' /></div>
    </button>
    {isSelectVisible && <FloatingBox
      placement='bottom'
      targetRef={selectRef.current}
      onClose={() => setIsSelectVisible(false)}
      useParentWidth
    >
      <div className={clsx('alt-select-menu', classNames.menu)} data-testid='alt-test-select-menu'>
        {options.map((option, optionIndex) => (
          <button
            key={optionIndex}
            className={clsx('alt-select-option', classNames.option, {
              'alt-select-option--selected': option.value === value
            })}
            title={option.label}
            disabled={option.disabled}
            onClick={() => onSelectOption(option.value)}
          >
            <div className='alt-select-option__icon'><Icon i='check' /></div>
            <div className='alt-select-option__label'>{option.label}</div>
          </button>
        ))}
      </div>
    </FloatingBox>}
  </>
}

export default memo(Select)