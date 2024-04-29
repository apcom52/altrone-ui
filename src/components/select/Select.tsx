import { SelectProps } from './Select.types.ts';
import { ChangeEventHandler, memo, useMemo, useRef, useState } from 'react';
import { Dropdown } from '../dropdown';
import s from './select.module.scss';
import clsx from 'clsx';
import { useRainbowEffect } from '../application/RainbowEffect.tsx';
import { Icon } from '../icon';
import { Scrollable } from '../scrollable';
import { PopoverContentContext } from '../popover';
import { triggerNativeEvent } from '../../utils/events.ts';

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
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const optionsRef = useRef<Record<string, HTMLOptionElement | null>>({});

  console.log('>> values', value);

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

  const selectValue = (value: string) => {
    if (selectRef.current) {
      if (multiple) {
        if (optionsRef.current[value]) {
          (optionsRef.current[value] as HTMLOptionElement).selected = Boolean(
            !optionsRef.current[value]?.selected,
          );
        }
      } else {
        triggerNativeEvent({
          element: selectRef.current,
          value: String(value),
          eventType: 'change',
          senderObject: window.HTMLSelectElement.prototype,
          propertyName: 'value',
        });
      }
    }
  };

  const onChangeHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
    console.log('>> change', e.target.value);

    if (multiple) {
      const checkedOptions = Array.from(
        e.target.querySelectorAll('option:checked'),
      ).map((item) => String(item.getAttribute('value')));

      onChange(checkedOptions || EMPTY_ARRAY, e);
    } else {
      onChange(e.target.value, e);
    }
  };

  const menu = ({ closePopup }: PopoverContentContext) => (
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
  );

  const cls = clsx(s.Select);

  return (
    <div className={s.Wrapper}>
      <select
        style={
          multiple
            ? {
                minHeight: '100px',
              }
            : {}
        }
        ref={selectRef}
        multiple={multiple}
        name={name}
        onChange={onChangeHandler}
      >
        {options.map((item, itemIndex) => {
          const selected = Array.isArray(selectedOptions)
            ? selectedOptions.includes(item)
            : selectedOptions === item;

          return (
            <option
              key={itemIndex}
              selected={selected}
              value={String(item.value)}
              ref={(_ref) => (optionsRef.current[item.value] = _ref)}
            >
              {item.label}
            </option>
          );
        })}
      </select>
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
