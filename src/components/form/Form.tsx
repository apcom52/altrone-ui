import { FormEventHandler, memo, useMemo } from 'react';
import { FormContextType, FormProps } from './Form.types.ts';
import { Flex } from 'components/flex';
import { Field } from './components';
import s from './form.module.scss';
import { FormContext } from './Form.context.ts';
import clsx from 'clsx';

const FormComponent = memo(
  <FormState extends Record<string, unknown>>({
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
    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
      event.preventDefault();
      onSubmit?.(event);
    };

    const formContext = useMemo<FormContextType>(
      () => ({
        errorMessages,
        disabled,
        size,
      }),
      [errorMessages, disabled, size],
    );

    const cls = clsx(s.Form, className);
    const styles = {
      ...style,
    };

    return (
      <form
        className={cls}
        style={styles}
        ref={ref}
        onSubmit={handleSubmit}
        {...restProps}
      >
        <FormContext.Provider value={formContext}>
          <Flex direction="vertical" align="start" gap="l">
            {children}
          </Flex>
        </FormContext.Provider>
      </form>
    );
  },
);

const FormNamespace = Object.assign(FormComponent, {
  Field: Field,
});

export { FormNamespace as Form };
