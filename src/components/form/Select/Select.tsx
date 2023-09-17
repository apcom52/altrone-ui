import { createElement, memo, useEffect, useMemo, useRef, useState } from 'react';
import { Direction, Elevation, Option, OptionParent, Role, Size, Surface } from '../../../types';
import { ButtonContainer, FloatingBox, FloatingBoxMobileBehaviour } from '../../containers';
import './select.scss';
import { Icon } from '../../typography';
import clsx from 'clsx';
import { TextInput } from '../TextInput';
import SelectOption, { SelectOptionProps } from './SelectOption';
import { useLocalization, useWindowSize } from '../../../hooks';
import { ScrollableSelector } from '../ScrollableSelector';
import { Button } from '../../form';
import SelectPlaceholder from './SelectPlaceholder';
import { BasicInput, BasicInputProps } from '../BasicInput';

interface SelectProps<T = unknown>
  extends Omit<React.HTMLProps<HTMLSelectElement>, 'value' | 'onChange' | 'size'>,
    BasicInputProps {
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  parents?: OptionParent[];
  searchable?: boolean;
  clearable?: boolean;
  searchFunc?: (searchTerm: string, item: Option<T>) => boolean;
  ItemComponent?: React.FC<SelectOptionProps<T>>;
  size?: Size;
  elevation?: Elevation;
  surface?: Surface;
  classNames?: {
    select?: string;
    currentValue?: string;
    menu?: string;
    option?: string;
  };
}

const DEFAULT_KEY = '_default';

const Select = <T extends unknown>({
  value,
  options = [],
  onChange,
  id,
  parents,
  searchable = false,
  clearable = false,
  searchFunc,
  ItemComponent = SelectOption,
  disabled = false,
  size = Size.medium,
  classNames = {},
  placeholder,
  hintText,
  errorText,
  elevation = Elevation.convex,
  surface = Surface.paper
}: SelectProps<T>) => {
  const { ltePhoneL, gtPhoneL } = useWindowSize();
  const t = useLocalization();

  const [isSelectVisible, setIsSelectVisible] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const selectRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [groupedItems, parentKeys]: [Record<string, [OptionParent, ...Option<T>[]]>, string[]] =
    useMemo(() => {
      const result: Record<string, [OptionParent, ...Option<T>[]]> = {
        [DEFAULT_KEY]: [
          {
            label: t('form.select.others'),
            value: null
          }
        ]
      };

      let filteredOptions = [...options];

      if (searchable && searchTerm) {
        if (searchFunc) {
          filteredOptions = filteredOptions.filter((option) => searchFunc(searchTerm, option));
        } else {
          filteredOptions = filteredOptions.filter(
            (option) =>
              option.label.trim().toLowerCase().indexOf(searchTerm.trim().toLowerCase()) > -1
          );
        }
      }

      for (const option of filteredOptions) {
        if (option.parent) {
          if (result[option.parent]) {
            result[option.parent].push(option);
          } else {
            const parentData: OptionParent = parents?.find((p) => p.value === option.parent) || {
              label: option.parent,
              value: option.parent
            };
            result[option.parent] = [parentData, option];
          }
        } else {
          result[DEFAULT_KEY].push(option);
        }
      }

      const parentKeys = Object.keys(result).filter((pK) => pK !== DEFAULT_KEY);

      return [result, [...parentKeys, DEFAULT_KEY]];
    }, [options, parents, searchable, searchTerm, searchFunc]);

  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === value) || null;
  }, [value, options]);

  const onSelectMenuClose = () => {
    setIsSelectVisible(false);
    setIsSearchMode(false);
  };

  const onSelectOption = (value: T) => {
    onChange(value);
    onSelectMenuClose();
  };

  const onSelectClick = () => {
    setTimeout(() => {
      setIsSelectVisible(true);
    }, 0);

    if (searchable) {
      setIsSearchMode(true);
    }
  };

  const onInputBlur = () => {
    if (!isSelectVisible) {
      setIsSearchMode(false);
    }
  };

  const preventSelectMenuClose = (e: MouseEvent) => {
    return isSearchMode ? e.target === inputRef.current : e.target === selectRef.current;
  };

  useEffect(() => {
    if (!isSearchMode) {
      setSearchTerm('');
    }
  }, [isSearchMode]);

  return (
    <BasicInput hintText={hintText} errorText={errorText} disabled={disabled} size={size}>
      {!searchable || (searchable && !isSearchMode) ? (
        <button
          ref={selectRef}
          id={id}
          disabled={disabled}
          onClick={onSelectClick}
          data-testid="alt-test-select"
          className={clsx('alt-select', classNames.select, {
            'alt-select--active': isSelectVisible,
            'alt-select--disabled': disabled,
            [`alt-select--elevation-${elevation}`]: elevation,
            [`alt-select--surface-${surface}`]: surface !== Surface.paper
          })}
          type="button">
          <div
            className={clsx('alt-select__value', classNames.currentValue)}
            data-testid="alt-test-select-current-value">
            {selectedOption ? (
              createElement(ItemComponent, {
                label: selectedOption?.label,
                value: selectedOption?.value,
                selected: false,
                disabled: false,
                onSelect: () => null,
                inSelectHeader: true
              })
            ) : (
              <SelectPlaceholder>{placeholder || t('form.select.placeholder')}</SelectPlaceholder>
            )}
          </div>
          <div className="alt-select__arrow">
            <Icon i="expand_more" />
          </div>
        </button>
      ) : (
        <TextInput
          ref={inputRef}
          placeholder={t('form.select.search')}
          value={searchTerm}
          onChange={setSearchTerm}
          rightIcon={<Icon i="search" />}
          onBlur={onInputBlur}
          autoFocus
        />
      )}
      {isSelectVisible && (
        <FloatingBox
          placement="bottom"
          targetElement={isSearchMode ? inputRef.current : selectRef.current}
          onClose={onSelectMenuClose}
          minWidth={200}
          preventClose={searchable && isSearchMode ? preventSelectMenuClose : undefined}
          data-testid="alt-test-select-search"
          useParentWidth
          mobileBehaviour={FloatingBoxMobileBehaviour.modal}
          useRootContainer={true}
          closeOnAnotherFloatingBoxClick>
          {gtPhoneL && (
            <div
              className={clsx('alt-select-menu', classNames.menu)}
              data-testid="alt-test-select-menu">
              {clearable && value ? (
                <SelectOption<undefined>
                  label="—"
                  value={undefined}
                  onSelect={() => onSelectOption(undefined as T)}
                  disabled={false}
                  selected={false}
                />
              ) : null}
              {parentKeys.map((groupValue, groupIndex, groupedValueKeys) => {
                const group = groupedItems[groupValue];
                const [groupInfo, ...options] = group;
                const isSingle = groupedValueKeys.length === 1;

                return (
                  <div className="alt-select-group" key={groupValue}>
                    {!isSingle && options.length ? (
                      <div className="alt-select-group__title">{groupInfo.label}</div>
                    ) : null}
                    {options.map((option, optionIndex) =>
                      createElement(ItemComponent, {
                        key: optionIndex,
                        label: option.label,
                        value: option.value,
                        selected: option.value === value,
                        disabled: option.disabled || groupInfo.disabled || false,
                        onSelect: onSelectOption,
                        inSelectHeader: false
                      })
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {ltePhoneL && (
            <>
              <div className="alt-select-menu__title">{t('form.select.placeholder')}</div>
              <ScrollableSelector<T>
                className="alt-select-menu__selector"
                options={options}
                value={value}
                onChange={onChange}
              />
              <ButtonContainer direction={Direction.vertical}>
                {clearable && value ? (
                  <Button role={Role.default} onClick={() => onSelectOption(undefined as T)} fluid>
                    {t('common.clear')}
                  </Button>
                ) : null}
                <Button role={Role.primary} onClick={() => setIsSelectVisible(false)} fluid>
                  {t('common.apply')}
                </Button>
              </ButtonContainer>
            </>
          )}
        </FloatingBox>
      )}
    </BasicInput>
  );
};

export default memo(Select) as typeof Select;
