import { memo } from 'react';
import { DataGridFieldProps } from '../DataGrid.types';
import { Skeleton } from 'components/skeleton';
import s from './field.module.scss';
import { Select } from 'components/select';

export const SelectField = memo<DataGridFieldProps>((props) => {
  if (props.type !== 'select') {
    return null;
  }

  const { value, options = [], multiple, mode, onChange, placeholder } = props;

  if (mode === 'loading') {
    return <Skeleton width="50%" height="32px" radius="16px" />;
  }

  if (mode === 'read') {
    const selectedOptions = Array.isArray(value) ? value : [value];
    const selectedOptionLabels = selectedOptions?.map(
      (option) => options.find((o) => o.value === option)?.label
    );

    return (
      <div className={s.InputText}>{selectedOptionLabels?.join(', ')}</div>
    );
  }

  return (
    <Select
      value={multiple ? (Array.isArray(value) ? value : [value]) : value}
      onChange={(value) => onChange(value)}
      options={options}
      multiple={Boolean(multiple)}
      placeholder={placeholder}
    />
  );
});
