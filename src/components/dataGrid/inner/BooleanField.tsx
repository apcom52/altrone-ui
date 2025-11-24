import { memo } from 'react';
import { DataGridFieldProps } from '../DataGrid.types';
import { Skeleton } from 'components/skeleton';
import { Check } from 'lucide-react';
import s from './field.module.scss';
import { Switcher } from 'components/switcher';

export const BooleanField = memo<DataGridFieldProps>((props) => {
  if (props.type !== 'boolean') {
    return null;
  }

  const { value, mode, onChange } = props;

  if (mode === 'loading') {
    return <Skeleton width="32px" height="32px" radius="16px" />;
  }

  if (mode === 'read') {
    const trueValue = props.trueLabel || (
      <div className={s.SwitcherText}>
        <Check size={32} />
      </div>
    );
    const falseValue = props.falseLabel || '';

    return <div className={s.InputText}>{value ? trueValue : falseValue}</div>;
  }

  return (
    <div className={s.Switcher}>
      <Switcher
        checked={Boolean(value)}
        onChange={(value) => onChange(value)}
      />
    </div>
  );
});
