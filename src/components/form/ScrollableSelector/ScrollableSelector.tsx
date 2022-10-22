import {memo, useEffect, useRef} from "react";
import {Option} from "../../../types";
import {Align} from "../../../types/Align";
import clsx from "clsx";
import './scrollable-selector.scss';

interface ScrollableSelectorProps<T> {
  value: T
  options: Option<T>[]
  onChange: (value: T) => void
  disabled?: boolean
  width?: number | string
  align?: Align
}

const ScrollableSelector = <T extends any = string>({ value, options = [], width = '100%', disabled = false, align = Align.center, onChange }: ScrollableSelectorProps<T>) => {
  const selectorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const valueIndex = options.findIndex(option => option.value === value)

    selectorRef.current?.scrollTo({
      top: 34 * valueIndex,
      behavior: 'smooth'
    })
  }, [value])

  return <div ref={selectorRef} className={clsx('alt-scrollable-selector', {
    'alt-scrollable-selector--align-start': align === Align.start,
    'alt-scrollable-selector--align-end': align === Align.end,
  })} style={{ width }} data-testid='alt-test-scrollable-selector'>
    {options.map((option, optionIndex) => (
      <button
        key={optionIndex}
        className={clsx('alt-scrollable-selector__option', {
          'alt-scrollable-selector__option--selected': value === option.value
        })}
        onClick={() => onChange(option.value)}
        disabled={disabled || option.disabled}
        type='button'
      >
        {option.label}
      </button>
    ))}
  </div>
}

export default memo(ScrollableSelector)