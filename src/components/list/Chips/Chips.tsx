import {memo, useCallback} from "react";
import {Direction, Option} from "../../../types";
import clsx from "clsx";
import {Icon} from "../../icons";
import './chips.scss';

interface ChipsProps {
  options: Option[]
  values: any[]
  onChange: (values: any[]) => void
  SelectedIcon?: JSX.Element
  direction?: Direction
}

const Chips = ({ options = [], values = [], onChange, SelectedIcon, direction = Direction.horizontal }: ChipsProps) => {
  const onChipClick = useCallback((value) => {
    const chipIsSelected = values.findIndex(chipValue => value === chipValue)

    if (chipIsSelected > -1) {
      onChange(values.filter(chipValue => chipValue !== value))
    } else {
      onChange([...values, value])
    }
  }, [values, onChange])

  return <div className='alt-chips'>
    {options.map((option, optionIndex) => {
      const isSelected = values.indexOf(option.value) > -1

      return <button
        key={optionIndex}
        className={clsx('alt-chip', {
          'alt-chips__chip--selected': isSelected
        })}
        disabled={option.disabled}
        onClick={() => onChipClick(option.value)}
      >
        {isSelected && <div>{SelectedIcon || <Icon i='check'/>}</div>}
        <div>{option.label}</div>
      </button>
    })}
  </div>
}

export default memo(Chips)