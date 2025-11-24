import { memo } from 'react';
import { DataGridFieldProps } from '../DataGrid.types';
import { Textarea } from 'components/textarea';
import { Skeleton } from 'components/skeleton';
import s from './field.module.scss';

export const TextField = memo<DataGridFieldProps>((props) => {
  const { value, mode, onChange } = props;

  if (mode === 'loading') {
    return <Skeleton width="100%" height="72px" radius="16px" />;
  }

  if (mode === 'read') {
    return <div className={s.InputText}>{String(value)}</div>;
  }

  return (
    <Textarea value={String(value)} onChange={(value) => onChange(value)} />
  );
});
