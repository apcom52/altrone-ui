import { SelectContext, SelectProps } from './Select.types.ts';
import { cloneElement, memo, useId, useMemo } from 'react';
import { Dropdown } from 'components/dropdown';
import { Icon } from 'components/icon';
import { Scrollable } from 'components/scrollable';
import { TextInput } from 'components/textInput';
import s from './select.module.scss';
import clsx from 'clsx';
import { PopoverContentContext } from 'components/popover';
import { useSelect } from './useSelect.ts';
import { useConfiguration } from 'components/configuration';

const SelectComponent = <Value = unknown,>(props: SelectProps<Value>) => {
  const {
    name,
    multiple,
    value,
    placeholder,
    searchable,
    clearable,
    size = 'm',
    className,
    style,
    parentWidth = true,
    Component,
    onFocus,
    onBlur,
    onChange,
    children,
    ...restProps
  } = props;

  const id = useId();
  const selectName = name || id;

  const { select: selectConfig = {} } = useConfiguration();

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
    clearValue,
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

  const cls = clsx(s.Select, className, selectConfig.className);
  const styles = {
    ...selectConfig.style,
    ...style,
  };

  const isMultiple = Array.isArray(value);

  const needToShowClearButton =
    clearable && (isMultiple ? value?.length > 0 : value);

  const selectContext: SelectContext = {
    expanded: false,
    value,
    selectedOptions,
    disabled: Boolean(props.disabled),
    multiple: Boolean(props.multiple),
    clearValue,
  };

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
          <input type="hidden" name={selectName} value={String(value)} />
        )}
      </div>
      <Dropdown
        placement="bottom-start"
        parentWidth={parentWidth}
        content={menu}
        focusTrapTargets={searchMode ? ['reference'] : ['content']}
        defaultListNavigationIndex={-1}
        listNavigation
      >
        {({ opened }) => {
          if (Component) {
            if (typeof Component === 'function') {
              return Component({ ...selectContext, expanded: opened });
            } else {
              return cloneElement(Component, {
                ...selectContext,
                expanded: opened,
              });
            }
          }

          return (
            <TextInput
              className={cls}
              style={styles}
              value={searchMode ? userQuery : valueString}
              placeholder={valueString ? valueString : placeholder}
              readOnly={
                props.readonly ? props.readonly : !(searchable && searchMode)
              }
              readonlyStyles={!props.readonly ? false : true}
              size={size}
              transparent={props.transparent}
              onChange={setUserQuery}
              onFocus={searchable ? focusSelect : undefined}
              onBlur={searchable ? blurSelect : undefined}
              {...restProps}
            >
              {needToShowClearButton && (
                <TextInput.ActionIsland
                  placement="right"
                  label="Clear"
                  icon={<Icon i="backspace" />}
                  showLabel={false}
                  disabled={false}
                  onClick={clearValue}
                />
              )}
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
