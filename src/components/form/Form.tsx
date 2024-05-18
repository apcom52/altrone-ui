import {
  createContext,
  FormEventHandler,
  forwardRef,
  memo,
  useContext,
  useMemo,
} from 'react';
import { FormContextType, FormProps } from './Form.types.ts';
import { Flex } from '../flex';
import { Align, Gap, Size } from '../../types';
import { Field } from './components/Field.tsx';
import s from './form.module.scss';

const FormContext = createContext<FormContextType>({});
export const useFormContext = () => useContext(FormContext);

const FormWrapper = forwardRef<HTMLFormElement, FormProps<any>>(
  (props, ref) => {
    const {
      children,
      errorMessages = {},
      disabled,
      onSubmit,
      size = Size.medium,
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
          <Flex align={Align.start} gap={Gap.large}>
            {children}
          </Flex>
        </FormContext.Provider>
      </form>
    );
  },
);

const MemoizedFormWrapper = memo(FormWrapper) as typeof FormWrapper;

const FormNamespace = Object.assign(MemoizedFormWrapper, {
  Field: Field,
});

export { FormNamespace as Form };
