import { useToggledState } from '../../utils';
import { useCallback, useMemo, useState } from 'react';
import { Option, SelectProps } from './Select.types.ts';

const EMPTY_ARRAY: Option[] = [];

export const useSelect = (props: SelectProps) => {
  const {
    multiple,
    options = EMPTY_ARRAY,
    value,
    onChange,
    searchable,
  } = props;

  const {
    value: searchMode,
    enable: focusSelect,
    disable: blurSelect,
  } = useToggledState(false);
  const [userQuery, setUserQuery] = useState('');

  const selectedOptions = useMemo(() => {
    if (multiple) {
      return options.filter((item) => value.includes(item.value));
    } else {
      return options.find((item) => item.value === value);
    }
  }, [value, options, multiple]);

  const valueString = Array.isArray(selectedOptions)
    ? selectedOptions.length
      ? selectedOptions.map((item) => item.label).join(', ')
      : ''
    : selectedOptions?.label;

  const selectValue = useCallback(
    (newValue: string) => {
      setUserQuery('');
      blurSelect();

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

  const filteredOptions = useMemo(() => {
    if (!searchable || !userQuery) {
      return options;
    }

    return options.filter((item) =>
      item.label.toLowerCase().startsWith(userQuery.toLowerCase()),
    );
  }, [options, userQuery, searchable]);

  return {
    searchMode,
    focusSelect,
    blurSelect,
    userQuery,
    setUserQuery,
    selectedOptions,
    valueString,
    selectValue,
    filteredOptions,
  };
};
