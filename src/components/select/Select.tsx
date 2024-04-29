import { SelectProps } from './Select.types.ts';
import { memo, useId, useMemo } from 'react';
import { Dropdown, Icon, Scrollable, TextInput } from 'components';
import s from './select.module.scss';
import clsx from 'clsx';
import { PopoverContentContext } from '../popover';
import { useSelect } from './useSelect.ts';
import { Size } from '../../types';

const SelectComponent = (props: SelectProps) => {
  const {
    name,
    multiple,
    value,
    placeholder,
    searchable,
    size = Size.medium,
  } = props;

  const id = useId();
  const selectName = name || id;

  const {
    selectedOptions,
    selectValue,
    searchMode,
    userQuery,
    setUserQuery,
    focusSelect,
    blurSelect,
    valueString = '',
    filteredOptions,
  } = useSelect(props);

  const menu = useMemo(
    () =>
      ({ closePopup }: PopoverContentContext) => (
        <Scrollable maxHeight="250px">
          <Dropdown.Menu>
            {filteredOptions.map((option, optionIndex) => {
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
    [filteredOptions, selectedOptions, multiple, selectValue],
  );

  const cls = clsx(s.Select);

  return (
    <div className={s.SelectWrapper}>
      <div className={s.FormInputs}>
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
      <Dropdown
        placement="bottom-start"
        parentWidth
        content={menu}
        focusTrapTargets={searchMode ? ['reference'] : ['content']}
        defaultListNavigationIndex={-1}
        listNavigation
      >
        {({ opened }) => {
          return (
            <TextInput
              className={cls}
              value={searchMode ? userQuery : valueString}
              placeholder={valueString ? valueString : placeholder}
              onChange={setUserQuery}
              onFocus={searchable ? focusSelect : undefined}
              onBlur={searchable ? blurSelect : undefined}
              readOnly={
                props.readonly ? props.readonly : !(searchable && searchMode)
              }
              readonlyStyles={!props.readonly ? false : true}
              size={size}
              transparent={props.transparent}
            >
              <TextInput.IconIsland
                className={s.ArrowIcon}
                placement="right"
                icon={
                  <Icon
                    i={
                      searchMode
                        ? 'search'
                        : opened
                          ? 'expand_less'
                          : 'expand_more'
                    }
                  />
                }
              />
            </TextInput>
          );
        }}
      </Dropdown>
    </div>
  );
};

const Select = memo(SelectComponent) as typeof SelectComponent;

export { Select };
