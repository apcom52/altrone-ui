import { SelectProps } from './Select.types.ts';
import { memo, useCallback, useId, useMemo } from 'react';
import { Dropdown, Icon, Scrollable } from 'components';
import s from './select.module.scss';
import clsx from 'clsx';
import { useRainbowEffect } from '../application/RainbowEffect.tsx';
import { PopoverContentContext } from '../popover';

const EMPTY_ARRAY: any = [];

const SelectComponent = ({
  value,
  placeholder,
  options = EMPTY_ARRAY,
  multiple = false,
  onChange,
  Component,
  name,
}: SelectProps) => {
  const id = useId();

  const selectName = name || id;

  const rainbowProps = useRainbowEffect();

  const selectedOptions = useMemo(() => {
    if (multiple) {
      return options.filter((item) => value.includes(item.value));
    } else {
      return options.find((item) => item.value === value);
    }
  }, [value, options, multiple]);

  const valueString = Array.isArray(selectedOptions)
    ? '+' + String(selectedOptions.length)
    : selectedOptions?.label;

  const selectText = valueString ? (
    <div className={s.SelectValue}>{valueString}</div>
  ) : (
    <div className={s.Placeholder}>{placeholder}</div>
  );

  const selectValue = useCallback(
    (newValue: string) => {
      if (multiple && Array.isArray(value)) {
        const isSelected = value.includes(newValue);

        if (isSelected) {
          onChange(value.filter((item) => item !== newValue));
        } else {
          onChange([...value, newValue]);
        }
      } else {
        onChange(newValue);
      }
    },
    [onChange, value, multiple],
  );

  const menu = useMemo(
    () =>
      ({ closePopup }: PopoverContentContext) => (
        <Scrollable maxHeight="250px">
          <Dropdown.Menu>
            {options.map((option, optionIndex) => {
              const checked = Array.isArray(selectedOptions)
                ? selectedOptions.includes(option)
                : selectedOptions === option;

              return (
                <Dropdown.Checkbox
                  checked={checked}
                  focused={checked}
                  onChange={() => {
                    selectValue(option.value);
                    if (!multiple) {
                      closePopup();
                    }
                  }}
                  key={optionIndex}
                  label={String(option.label)}
                />
              );
            })}
          </Dropdown.Menu>
        </Scrollable>
      ),
    [options, selectedOptions, multiple, selectValue],
  );

  const cls = clsx(s.Select);

  return (
    <div className={s.Wrapper}>
      <div>
        {multiple ? (
          <>
            {Array.isArray(value) &&
              value.map((item, itemIndex) => (
                <input
                  key={itemIndex}
                  type="hidden"
                  name={`${selectName}[]`}
                  value={item}
                />
              ))}
          </>
        ) : (
          <input type="hidden" name={selectName} value={value} />
        )}
      </div>
      <Dropdown placement="bottom-start" parentWidth content={menu}>
        {({ opened }) => {
          return (
            <button
              type="button"
              className={cls}
              data-rainbow-opacity={0.33}
              data-rainbow-blur={36}
              {...rainbowProps}
            >
              {selectText}
              <div className={s.ArrowIcon}>
                <Icon i={opened ? 'expand_less' : 'expand_more'} />
              </div>
            </button>
          );
        }}
      </Dropdown>
    </div>
  );
};

const Select = memo(SelectComponent) as typeof SelectComponent;

export { Select };
