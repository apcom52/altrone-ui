import clsx from 'clsx';
import './form.scss';
import { FormContext, FormContextProps } from '../../../contexts';

interface FormProps
  extends Omit<React.HTMLProps<HTMLFormElement>, 'required' | 'disabled'>,
    FormContextProps {}

/**
 * This component is used to wrap form fields into one layout
 * @param className
 * @param children
 * @param required
 * @param props
 * @constructor
 */
const Form = ({ className, children, required, ...props }: FormProps) => {
  return (
    <FormContext.Provider value={{ required }}>
      <form className={clsx('alt-form', className)} data-testid="alt-test-form" {...props}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default Form;
