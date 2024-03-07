import { ReactElement, useId } from 'react';
import './form-field.scss';
import clsx from 'clsx';
import { FormContextProps, useFormContext } from '../../../contexts';
import { Icon } from '../../typography';
import { Popover } from '../index';
import { cloneNode } from '../../../utils';

interface FormFieldProps
  extends Omit<React.HTMLProps<HTMLDivElement>, 'children' | 'label'>,
    FormContextProps {
  children: ReactElement | ReactElement[];
  label?: JSX.Element | string;
  required?: boolean;
  hintText?: string | JSX.Element;
}

/**
 * This component is used to wrap form component
 * @param className
 * @param label
 * @param children
 * @param required
 * @param hintText
 * @constructor
 */
const FormField = ({ className, label, children, required = false, hintText }: FormFieldProps) => {
  const context = useFormContext();
  const id = useId();
  const isRequired = required || context.required;

  const hintContent = <div className="alt-form-field__hint-text">{hintText}</div>;

  return (
    <div className={clsx('alt-form-field', className)}>
      {label && (
        <label htmlFor={id} className="alt-form-field__label">
          {label} {isRequired && <span className="alt-form-field__required-mark">*</span>}
          {hintText && (
            <Popover
              trigger={['hover', 'click']}
              placement="auto"
              content={hintContent}
              useFocusTrap={false}>
              <button className="alt-form-field__hint">
                <Icon i="question_mark" />
              </button>
            </Popover>
          )}
        </label>
      )}
      <div className="alt-form-field__control">
        {!Array.isArray(children) && typeof children === 'object'
          ? cloneNode(children, { id, ...children.props })
          : children}
      </div>
    </div>
  );
};

export default FormField;
