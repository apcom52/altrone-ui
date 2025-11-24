import { memo } from 'react';
import { DataGridFieldProps } from '../DataGrid.types';
import s from './field.module.scss';
import { StringField } from './StringField';
import { TextField } from './TextField';
import { NumberField } from './NumberField';
import { CurrencyField } from './CurrencyField';
import { PasswordField } from './PasswordField';
import { DateField } from './DateField';
import { BooleanField } from './BooleanField';
import { SelectField } from './SelectField';
import { LinkField } from './LinkField';
import { CustomField } from './CustomField';
import { ColorField } from './ColorField';

export const Field = memo<DataGridFieldProps>((props) => {
  const { accessor, label, type = 'string' } = props;

  const control: Record<string, React.ReactNode> = {
    string: <StringField {...props} />,
    text: <TextField {...props} />,
    number: <NumberField {...props} />,
    currency: <CurrencyField {...props} />,
    password: <PasswordField {...props} />,
    date: <DateField {...props} />,
    boolean: <BooleanField {...props} />,
    select: <SelectField {...props} />,
    link: <LinkField {...props} />,
    color: <ColorField {...props} />,
    custom: <CustomField {...props} />,
  };

  return (
    <div className={s.Field}>
      <div className={s.FieldLabel}>{label || String(accessor)}</div>
      <div className={s.FieldValue}>{control[type]}</div>
    </div>
  );
});
