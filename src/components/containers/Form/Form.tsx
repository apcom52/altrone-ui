import clsx from 'clsx';
import { memo } from 'react';
import './form.scss';
import { FormContext, FormContextProps } from '../../../contexts';

interface FormProps
  extends Omit<React.HTMLProps<HTMLFormElement>, 'required' | 'disabled'>,
    FormContextProps {}

const Form = ({ className, children, required, ...props }: FormProps) => {
  return (
    <FormContext.Provider value={{ required }}>
      <form className={clsx('alt-form', className)} data-testid="alt-test-form" {...props}>
        {children}
      </form>
    </FormContext.Provider>;
  );
};

export default memo(Form);
