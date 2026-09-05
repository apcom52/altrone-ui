import { useBoolean } from 'utils';
import React, { useCallback, useMemo, useState } from 'react';
import { Option, SelectProps } from './Select.types.ts';

const EMPTY_ARRAY: Option[] = [];

type SelectEvent =
  | React.MouseEvent<HTMLElement>
  | React.KeyboardEvent<HTMLElement>;

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
  } = useBoolean(false);
  const [userQuery, setUserQuery] = useState('');

  const selectedOptions = useMemo(() => {
    if (multiple) {
      const values = Array.isArray(value) ? value : [];
      return options.filter((item) => values.includes(item.value));
    }

    return options.find((item) => item.value === value);
  }, [value, options, multiple]);

  const valueString = Array.isArray(selectedOptions)
    ? selectedOptions.map((item) => item.label).join(', ')
    : (selectedOptions?.label ?? '');

  const selectValue = useCallback(
    (newValue: string, event?: SelectEvent) => {
      setUserQuery('');

      if (multiple) {
        const current = Array.isArray(value) ? value : [];
        const next = current.includes(newValue)
          ? current.filter((item) => item !== newValue)
          : [...current, newValue];
        onChange(next, event);
      } else {
        blurSelect();
        onChange(newValue, event);
      }
    },
    [onChange, value, multiple, blurSelect],
  );

  const filteredOptions = useMemo(() => {
    if (!searchable || !userQuery) {
      return options;
    }

    const query = userQuery.toLowerCase();
    return options.filter((item) => item.label.toLowerCase().includes(query));
  }, [options, userQuery, searchable]);

  const clearValue = useCallback(
    (event?: SelectEvent) => {
      onChange(multiple ? [] : undefined, event);
    },
    [onChange, multiple],
  );

  return {
    searchMode,
    focusSelect,
    blurSelect,
    userQuery,
    setUserQuery,
    selectedOptions,
    valueString,
    selectValue,
    clearValue,
    filteredOptions,
  };
};
