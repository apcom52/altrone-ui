import { useCallback } from 'react';
import { Direction, Size, OptionValue } from '../../../types';
import clsx from 'clsx';
import { Icon } from '../../typography';
import './chips.scss';
import { ChipsProps } from './Chips.types';

const Chips = <ValueType, Multiple extends boolean | undefined = true>({
  options = [],
  values,
  onChange,
  SelectedIcon,
  direction = Direction.horizontal,
  size = Size.medium,
  multiple = true
}: ChipsProps<ValueType, Multiple>) => {
  const onChipClick = useCallback(
    (value: ValueType) => {
      if (multiple === true) {
        const selectedChips = values as ValueType[];
        const chipIsSelected = selectedChips.findIndex((chipValue) => value === chipValue) > -1;

        let newValues;

        if (chipIsSelected) {
          newValues = selectedChips.filter((chipValue) => chipValue !== value) as OptionValue<
            ValueType,
            true
          >;
        } else {
          newValues = [...selectedChips, value] as OptionValue<ValueType, true>;
        }

        onChange(newValues as OptionValue<ValueType, Multiple>);
      } else {
        if (value === values) {
          onChange(undefined as OptionValue<ValueType, Multiple>);
        } else {
          onChange(value as OptionValue<ValueType, Multiple>);
        }
      }
    },
    [values, onChange, multiple]
  );

  const isChipSelected = (chipValue: ValueType) => {
    if (!multiple) {
      return (values as OptionValue<ValueType>) === chipValue;
    } else {
      return (values as OptionValue<ValueType, true>).find((chip: ValueType) => chip === chipValue);
    }
  };

  return (
    <div
      className={clsx('alt-chips', {
        'alt-chips--direction-vertical': direction === Direction.vertical,
        [`alt-chips--size-${size}`]: size !== Size.medium
      })}
      data-testid="alt-test-chips">
      {options.map((option, optionIndex) => {
        const isSelected = isChipSelected(option.value);

        return (
          <button
            key={optionIndex}
            className={clsx('alt-chip', {
              'alt-chip--selected': isSelected
            })}
            disabled={option.disabled}
            onClick={() => onChipClick(option.value)}
            data-testid="alt-test-chip"
            type="button">
            {isSelected && (
              <div className="alt-chip__icon">{SelectedIcon || <Icon i="check" />}</div>
            )}
            <div className="alt-chip__label">{option.label}</div>
          </button>
        );
      })}
    </div>
  );
};

export default Chips;
