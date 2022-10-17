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

  return <div
    className={clsx('alt-chips', {
      'alt-chips--direction-vertical': direction === Direction.vertical
    })}
    data-testid='alt-test-chips'
  >
    {options.map((option, optionIndex) => {
      const isSelected = values.indexOf(option.value) > -1

      return <button
        key={optionIndex}
        className={clsx('alt-chip', {
          'alt-chip--selected': isSelected
        })}
        disabled={option.disabled}
        onClick={() => onChipClick(option.value)}
        data-testid='alt-test-chip'
      >
        {isSelected && <div className='alt-chip__icon'>{SelectedIcon || <Icon i='check'/>}</div>}
        <div className='alt-chip__label'>{option.label}</div>
      </button>
    })}
  </div>
}

export default memo(Chips)