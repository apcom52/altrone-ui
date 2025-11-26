import { memo } from 'react';
import { DataGridFieldProps } from '../DataGrid.types';
import { Skeleton } from 'components/skeleton';
import { NumberInput } from 'components/numberInput';
import { TextInput } from 'components/textInput';
import { useLocale } from 'utils';
import s from './field.module.scss';

export const CurrencyField = memo<DataGridFieldProps>((props) => {
  if (props.type !== 'currency') {
    return null;
  }

  const {
    value,
    mode,
    onChange,
    min,
    max,
    allowNegative,
    digitsAfterPoint = 2,
    currency,
    placeholder,
  } = props;

  const locale = useLocale();

  const currencyFormatter = new Intl.NumberFormat(locale.locale, {
    style: 'currency',
    currency,
  });

  if (mode === 'loading') {
    return <Skeleton width="40%" height="32px" radius="16px" />;
  }

  if (mode === 'read') {
    return (
      <div className={s.InputText}>
        {currencyFormatter.format(Number(value))}
      </div>
    );
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
      placeholder={placeholder}
    >
      <TextInput.TextIsland label={currency} />
    </NumberInput>
  );
});
