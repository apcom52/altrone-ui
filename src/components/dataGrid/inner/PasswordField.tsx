import { memo } from 'react';
import { DataGridFieldProps } from '../DataGrid.types';
import { Skeleton } from 'components/skeleton';
import { NumberInput } from 'components/numberInput';
import { TextInput } from 'components/textInput';
import { useLocale } from 'utils';
import s from './field.module.scss';
import { PasswordInput } from 'components/passwordInput';

export const PasswordField = memo<DataGridFieldProps>((props) => {
  if (props.type !== 'password') {
    return null;
  }

  const { value, mode, onChange } = props;

  if (mode === 'loading') {
    return <Skeleton width="45%" height="32px" radius="16px" />;
  }

  return (
    <PasswordInput
      readOnly={mode !== 'edit'}
      value={String(value)}
      onChange={(value) => onChange(value)}
    />
  );
});
