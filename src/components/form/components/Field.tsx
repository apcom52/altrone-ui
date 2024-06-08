import { createContext, memo, useContext, useMemo } from 'react';
import type { FormFieldContextType, FormFieldProps } from '../Form.types.ts';
import s from './field.module.scss';
import { Tooltip } from 'components/tooltip';
import clsx from 'clsx';
import { useFormContext } from '../Form.context.ts';

const FormFieldContext = createContext<FormFieldContextType>({
  name: '',
  disabled: false,
  invalid: false,
  size: 'm',
});
export const useFormField = () => useContext(FormFieldContext);

export const Field = memo<FormFieldProps>(
  ({
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
  }) => {
    const formState = useFormContext();

    const errorMessageContent =
      errorMessage || formState.errorMessages?.[String(name)] || '';
    const invalidField = Boolean(errorMessageContent);

    const hintElement = hintText?.trim() ? (
      <Tooltip childrenClassName={s.HintIcon} content={hintText} />
    ) : null;

    const cls = clsx(
      s.Field,
      {
        [s.Disabled]: disabled,
        [s.Invalid]: invalidField,
      },
      className,
    );

    const fieldContext = useMemo<FormFieldContextType>(() => {
      return {
        name,
        disabled:
          typeof disabled === 'boolean'
            ? disabled
            : formState.disabled || false,
        invalid: invalidField,
        size: formState.size,
      };
    }, [name, invalidField, formState.size, formState.disabled, disabled]);

    return (
      <FormFieldContext.Provider value={fieldContext}>
        <div className={cls} {...restProps}>
          <div className={s.Label}>
            {label}
            {required ? <div className={s.Asterisk}>*</div> : null}
            {hintElement}
          </div>
          <div className={s.Control}>{children}</div>
          {invalidField ? (
            <div className={s.ErrorMessage}>{errorMessageContent}</div>
          ) : null}
          {description ? (
            <div className={s.Description}>{description}</div>
          ) : null}
        </div>
      </FormFieldContext.Provider>
    );
  },
);
