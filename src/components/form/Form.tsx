import { FormEventHandler, useMemo } from 'react';
import clsx from 'clsx';
import { AnyObject } from 'utils';
import { FormContextType, FormProps } from './Form.types.ts';
import { FormContext } from './Form.context.ts';
import { Field } from './components';
import s from './form.module.scss';

const FormComponent = <FormState extends AnyObject>({
  ref,
  children,
  errorMessages = {},
  disabled,
  onSubmit,
  size = 'm',
  className,
  style,
  ...restProps
}: FormProps<FormState>) => {
  const formContext = useMemo<FormContextType>(
    () => ({ errorMessages, disabled, size }),
    [errorMessages, disabled, size],
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    /**
     * Leave a native `<form action>` (e.g. a Server Action) alone — only take
     * over the submit when the consumer handles it in JS via `onSubmit`.
     */
    if (!restProps.action) {
      event.preventDefault();
    }
    onSubmit?.(event);
  };

  return (
    <form
      ref={ref}
      className={clsx(s.Form, className)}
      style={style}
      onSubmit={handleSubmit}
      {...restProps}
    >
      <FormContext.Provider value={formContext}>
        <div className={s.FieldStack}>{children}</div>
      </FormContext.Provider>
    </form>
  );
};

export const Form = Object.assign(FormComponent, { Field });
