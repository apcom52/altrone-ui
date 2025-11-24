import { memo } from 'react';
import { DataGridFieldProps } from '../DataGrid.types';
import s from './field.module.scss';
import { Skeleton } from 'components/skeleton';
import { NumberInput } from 'components/numberInput';

export const NumberField = memo<DataGridFieldProps>((props) => {
  if (props.type !== 'number') {
    return null;
  }

  const { value, mode, onChange, min, max, allowNegative, digitsAfterPoint } =
    props;

  if (mode === 'loading') {
    return <Skeleton width="30%" height="32px" radius="16px" />;
  }

  return (
    <NumberInput
      readOnly={mode !== 'edit'}
      value={Number(value)}
      onChange={(value) => onChange(value)}
      min={min}
      max={max}
      allowNegative={allowNegative}
      digitsAfterPoint={digitsAfterPoint}
    />
  );
});
