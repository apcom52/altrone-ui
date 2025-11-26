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
  const {
    accessor,
    label,
    type = 'string',
    mode = 'read',
    editable = true,
    value,
  } = props;

  const fieldMode = editable ? mode : mode === 'edit' ? 'read' : mode;

  const control: Record<string, React.ReactNode> = {
    string: <StringField {...props} mode={fieldMode} />,
    text: <TextField {...props} mode={fieldMode} />,
    number: <NumberField {...props} mode={fieldMode} />,
    currency: <CurrencyField {...props} mode={fieldMode} />,
    password: <PasswordField {...props} mode={fieldMode} />,
    date: <DateField {...props} mode={fieldMode} />,
    boolean: <BooleanField {...props} mode={fieldMode} />,
    select: <SelectField {...props} mode={fieldMode} />,
    link: <LinkField {...props} mode={fieldMode} />,
    color: <ColorField {...props} mode={fieldMode} />,
    custom: <CustomField {...props} mode={fieldMode} />,
  };

  return (
    <div className={s.Field}>
      <div className={s.FieldLabel}>{label || String(accessor)}</div>
      <div className={s.FieldValue}>
        {typeof value === 'undefined' && mode === 'read' ? '—' : control[type]}
      </div>
    </div>
  );
});
