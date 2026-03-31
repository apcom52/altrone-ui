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

// Map field type to its component — avoids creating 11 React elements on every render
const FIELD_MAP: Record<string, React.ComponentType<DataGridFieldProps>> = {
  string: StringField,
  text: TextField,
  number: NumberField,
  currency: CurrencyField,
  password: PasswordField,
  date: DateField,
  boolean: BooleanField,
  select: SelectField,
  link: LinkField,
  color: ColorField,
  custom: CustomField,
};

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

  const FieldComponent = FIELD_MAP[type];

  return (
    <div className={s.Field}>
      <div className={s.FieldLabel}>{label || String(accessor)}</div>
      <div className={s.FieldValue}>
        {typeof value === 'undefined' && mode === 'read' ? (
          '—'
        ) : FieldComponent ? (
          <FieldComponent {...props} mode={fieldMode} />
        ) : null}
      </div>
    </div>
  );
});
