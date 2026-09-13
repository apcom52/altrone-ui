import { SelectContextValue, SelectProps } from './Select.types.ts';
import {
  CSSProperties,
  isValidElement,
  memo,
  ReactElement,
  useId,
  useMemo,
  useState,
} from 'react';
import { AnyObject } from 'utils/types.ts';
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
import { SelectContext } from './Select.context.ts';

const SelectComponent = (props: SelectProps) => {
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
    disabled,
    transparent,
    menuHeight,
    renderFunc,
    onChange,
    onFocus,
    onBlur,
    children,
    options,
    asChild,
    readOnly,
    ref,
    ...restProps
  } = props;

  const id = useId();
  const selectName = name || id;
  const listboxId = `${id}-listbox`;

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

  const isTransparent = Boolean(transparent);

  const [opened, setOpened] = useState(false);

  const menu = useMemo(
    () =>
      ({ closePopup }: PopoverContentContext) => (
        <div
          className={s.Menu}
          role="listbox"
          id={listboxId}
          style={
            menuHeight
              ? ({
                  '--select-menu-height': `${menuHeight}px`,
                } as CSSProperties)
              : undefined
          }
        >
          <Scrollable className={s.MenuScroll} overflowX="hidden">
            {filteredOptions.length === 0 ? (
              <div className={s.Empty}>{t('select.notFound')}</div>
            ) : (
              <Dropdown.Menu role="presentation">
                {filteredOptions.map((option) => {
                  const checked = Array.isArray(selectedOptions)
                    ? selectedOptions.some(
                        (item) => item.value === option.value,
                      )
                    : selectedOptions?.value === option.value;

                  return (
                    <Dropdown.Checkbox
                      key={option.value}
                      role="option"
                      aria-selected={checked}
                      checked={checked}
                      focused={checked}
                      disabled={option.disabled}
                      label={option.label}
                      onChange={() => {
                        selectValue(option.value);
                        if (!multiple) {
                          closePopup();
                        }
                      }}
                    />
                  );
                })}
              </Dropdown.Menu>
            )}
          </Scrollable>
        </div>
      ),
    [
      filteredOptions,
      selectedOptions,
      multiple,
      selectValue,
      menuHeight,
      listboxId,
      t,
    ],
  );

  const cls = clsx(s.Select, className);
  const needToShowClearButton =
    clearable && (Array.isArray(value) ? value.length > 0 : Boolean(value));

  const hiddenInputs = multiple ? (
    (Array.isArray(value) ? value : []).map((item, index) => (
      <input
        key={`${item}-${index}`}
        type="hidden"
        name={`${selectName}[]`}
        value={item}
      />
    ))
  ) : (
    <input
      type="hidden"
      name={selectName}
      value={value != null ? String(value) : ''}
    />
  );

  const context: SelectContextValue = {
    expanded: opened,
    value,
    selectedOptions,
    disabled: Boolean(disabled),
    multiple: Boolean(multiple),
    clearValue,
  };

  const renderTrigger = () => {
    if (renderFunc) {
      return renderFunc({ ...context, className: cls, style });
    }

    if (asChild) {
      if (!isValidElement(children)) {
        console.error(
          '[Select] asChild requires a valid React element as children',
        );
        return null;
      }
      return (
        <Slot className={cls} style={style}>
          {children as ReactElement<AnyObject>}
        </Slot>
      );
    }

    return (
      <TextInput
        className={cls}
        style={style}
        role="combobox"
        aria-expanded={opened}
        aria-controls={listboxId}
        aria-haspopup="listbox"
        value={searchMode ? userQuery : valueString}
        placeholder={valueString || placeholder}
        readOnly={readOnly ?? !(searchable && searchMode)}
        readonlyStyles={Boolean(readOnly)}
        size={size}
        disabled={disabled}
        variant={isTransparent ? 'transparent' : 'default'}
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
            placement="end"
            label={t('common.clear')}
            icon={<Delete />}
            showLabel={false}
            disabled={false}
            onClick={(event) => clearValue(event)}
          />
        )}
        <TextInput.IconIsland
          className={s.ArrowIcon}
          placement="end"
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
  };

  return (
    <SelectContext.Provider value={context}>
      {/* `ref` sits on the wrapper, not the trigger: the Dropdown clones the
          trigger and takes over its `ref` for floating-ui positioning without
          merging, so a `ref` on the trigger would be dropped. The wrapper still
          spans the whole control. */}
      <div className={s.SelectWrapper} ref={ref}>
        {hiddenInputs}
        <Dropdown
          placement="bottom-start"
          parentWidth={parentWidth}
          content={menu}
          focusTrapTargets={searchMode ? ['reference'] : ['content']}
          defaultListNavigationIndex={-1}
          listNavigation
          overlap={!searchable}
          onOpenChange={setOpened}
        >
          {renderTrigger}
        </Dropdown>
      </div>
    </SelectContext.Provider>
  );
};

const Select = memo(SelectComponent);

export { Select };
