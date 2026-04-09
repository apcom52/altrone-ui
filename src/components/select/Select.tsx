import { SelectContext, SelectProps } from './Select.types.ts';
import { isValidElement, memo, useId, useMemo } from 'react';
import { Dropdown } from 'components/dropdown';
import { Delete, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Scrollable } from 'components/scrollable';
import { TextInput } from 'components/textInput';
import s from './select.module.scss';
import clsx from 'clsx';
import { PopoverContentContext } from 'components/popover';
import { useSelect } from './useSelect.ts';
import { useLocalization } from 'components/application';
import { Slot } from 'utils/components/Slot.tsx';

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
    onFocus,
    onBlur,
    onChange,
    children,
    options,
    asChild,
    readOnly,
    ref,
    ...restProps
  } = props;

  const id = useId();
  const selectName = name || id;

  const t = useLocalization();

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
        <div style={{ height: '250px' }}>
          <Scrollable>
            <Dropdown.Menu>
              {filteredOptions.map((option) => {
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
                    key={option.value}
                    label={String(option.label)}
                  />
                );
              })}
            </Dropdown.Menu>
          </Scrollable>
        </div>
      ),
    [filteredOptions, selectedOptions, multiple, selectValue],
  );

  const cls = clsx(s.Select, className);
  const styles = {
    ...style,
  };

  const isMultiple = Array.isArray(value);

  const needToShowClearButton =
    clearable && (isMultiple ? value?.length > 0 : value);

  return (
    <div className={s.SelectWrapper} ref={ref}>
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
          <input
            type="hidden"
            name={selectName}
            value={value != null ? String(value) : ''}
          />
        )}
      </div>
      <Dropdown
        placement="bottom-start"
        parentWidth={parentWidth}
        content={menu}
        focusTrapTargets={searchMode ? ['reference'] : ['content']}
        defaultListNavigationIndex={-1}
        listNavigation
        overlap
      >
        {({ opened }) => {
          const selectContext: SelectContext<Value> = {
            expanded: opened,
            value,
            selectedOptions,
            disabled: Boolean(props.disabled),
            multiple: Boolean(props.multiple),
            clearValue,
          };

          if (asChild) {
            if (!isValidElement(children)) {
              console.error(
                '[Select] asChild requires a valid React element as children',
              );
              return null;
            }
            return <Slot {...selectContext}>{children}</Slot>;
          }

          return (
            <TextInput
              className={cls}
              style={styles}
              value={searchMode ? userQuery : valueString}
              placeholder={valueString ? valueString : placeholder}
              readOnly={readOnly ?? !(searchable && searchMode)}
              readonlyStyles={Boolean(readOnly)}
              size={size}
              transparent={props.transparent}
              onChange={setUserQuery}
              onFocus={
                searchable
                  ? (e) => {
                      focusSelect();
                      onFocus?.(e);
                    }
                  : onFocus
              }
              onBlur={
                searchable
                  ? (e) => {
                      blurSelect();
                      onBlur?.(e);
                    }
                  : onBlur
              }
              {...restProps}
            >
              {needToShowClearButton && (
                <TextInput.ActionIsland
                  placement="right"
                  label={t('common.clear')}
                  icon={<Delete />}
                  showLabel={false}
                  disabled={false}
                  onClick={clearValue}
                />
              )}
              <TextInput.IconIsland
                className={s.ArrowIcon}
                placement="right"
                icon={
                  searchMode ? (
                    <Search />
                  ) : opened ? (
                    <ChevronUp />
                  ) : (
                    <ChevronDown />
                  )
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
