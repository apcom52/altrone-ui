import { FormEventHandler, forwardRef, useMemo } from 'react';
import { FormContextType, FormProps } from './Form.types.ts';
import { Flex } from 'components/flex';
import { Field } from './components/Field.tsx';
import s from './form.module.scss';
import { FormContext } from './Form.context.ts';

const FormComponent = forwardRef<HTMLFormElement, FormProps<any>>(
  (props, ref) => {
    const {
      children,
      errorMessages = {},
      disabled,
      onSubmit,
      size = 'm',
      ...restProps
    } = props;

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

    return (
      <form
        className={s.Form}
        ref={ref}
        action=""
        onSubmit={handleSubmit}
        {...restProps}
      >
        <FormContext.Provider value={formContext}>
          <Flex align="start" gap="l">
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
