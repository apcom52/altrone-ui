import { useMemo } from 'react';
import clsx from 'clsx';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from 'components/tooltip';
import type { FormFieldProps } from '../Form.types.ts';
import { useFormContext } from '../Form.context.ts';
import { FormFieldContext } from './Field.context.ts';
import s from './field.module.scss';

export const Field = ({
  ref,
  children,
  label,
  required,
  hintText,
  disabled,
  name,
  errorMessage,
  description,
  className,
  style,
  ...restProps
}: FormFieldProps) => {
  const form = useFormContext();

  const resolvedError =
    errorMessage || (name ? form.errorMessages?.[name] : undefined) || '';
  const invalid = Boolean(resolvedError);

  const fieldContext = useMemo(
    () => ({
      name,
      disabled:
        typeof disabled === 'boolean' ? disabled : (form.disabled ?? false),
      invalid,
      size: form.size,
    }),
    [name, disabled, invalid, form.disabled, form.size],
  );

  const hintElement = hintText?.trim() ? (
    <Tooltip content={hintText}>
      <button type="button" className={s.HintIcon} aria-label={hintText}>
        <HelpCircle size={12} />
      </button>
    </Tooltip>
  ) : null;

  return (
    <FormFieldContext.Provider value={fieldContext}>
      <div
        ref={ref}
        className={clsx(
          s.Field,
          { [s.Disabled]: disabled, [s.Invalid]: invalid },
          className,
        )}
        style={style}
        {...restProps}
      >
        <div className={s.Label}>
          {label}
          {required ? <span className={s.Asterisk}>*</span> : null}
          {hintElement}
        </div>
        <div className={s.Control}>{children}</div>
        {invalid ? (
          <div className={s.ErrorMessage}>{resolvedError}</div>
        ) : null}
        {description ? (
          <div className={s.Description}>{description}</div>
        ) : null}
      </div>
    </FormFieldContext.Provider>
  );
};
