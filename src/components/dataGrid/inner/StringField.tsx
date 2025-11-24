import { memo } from 'react';
import { DataGridFieldProps } from '../DataGrid.types';
import { TextInput } from 'components/textInput';
import { Skeleton } from 'components/skeleton';

export const StringField = memo<DataGridFieldProps>((props) => {
  const { value, mode, onChange } = props;

  if (mode === 'loading') {
    return <Skeleton width="50%" height="32px" radius="16px" />;
  }

  return (
    <TextInput
      readOnly={mode !== 'edit'}
      value={String(value)}
      onChange={(value) => onChange(value)}
    />
  );
});
