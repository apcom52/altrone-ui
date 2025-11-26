import { memo } from 'react';
import { DataGridFieldProps } from '../DataGrid.types';
import { Skeleton } from 'components/skeleton';
import { DatePicker } from 'components/datePicker';
import { dayjsInstance } from 'components/calendar/Calendar';

export const DateField = memo<DataGridFieldProps>((props) => {
  if (props.type !== 'date') {
    return null;
  }

  const {
    value,
    mode,
    level = 'day',
    minDate,
    maxDate,
    format,
    clearable,
    onChange,
    placeholder,
  } = props;

  if (mode === 'loading') {
    return (
      <Skeleton
        width={level === 'year' ? '20%' : level === 'month' ? '45%' : '50%'}
        height="32px"
        radius="16px"
      />
    );
  }

  if (level === 'year') {
    return (
      <DatePicker.YearPicker
        readOnly={mode !== 'edit'}
        value={dayjsInstance(String(value))}
        onChange={(value) => onChange(value?.toISOString())}
        minDate={minDate ? dayjsInstance(minDate) : undefined}
        maxDate={maxDate ? dayjsInstance(maxDate) : undefined}
        clearable={clearable}
      />
    );
  }

  if (level === 'month') {
    return (
      <DatePicker.MonthPicker
        readOnly={mode !== 'edit'}
        value={dayjsInstance(String(value))}
        onChange={(value) => onChange(value?.toISOString())}
        minDate={minDate ? dayjsInstance(minDate) : undefined}
        maxDate={maxDate ? dayjsInstance(maxDate) : undefined}
        format={format}
        clearable={clearable}
        placeholder={placeholder}
      />
    );
  }

  return (
    <DatePicker
      readOnly={mode !== 'edit'}
      value={dayjsInstance(String(value))}
      onChange={(value) => onChange(value?.toISOString())}
      minDate={minDate ? dayjsInstance(minDate) : undefined}
      maxDate={maxDate ? dayjsInstance(maxDate) : undefined}
      format={format}
      clearable={clearable}
      placeholder={placeholder}
    />
  );
});
