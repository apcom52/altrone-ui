import {
  cloneElement,
  memo,
  MouseEventHandler,
  ReactElement,
  useCallback,
  useId,
  useRef,
  useState
} from 'react';
import './form-field.scss';
import clsx from 'clsx';
import { FormContextProps, useFormContext } from '../../../contexts';
import { FloatingBox } from '../FloatingBox';
import { Icon } from '../../typography';

interface FormFieldProps
  extends Omit<React.HTMLProps<HTMLDivElement>, 'children' | 'label'>,
    FormContextProps {
  children: ReactElement | ReactElement[];
  label?: JSX.Element | string;
  required?: boolean;
  hintText?: string | JSX.Element;
}

const FormField = ({ className, label, children, required = false, hintText }: FormFieldProps) => {
  const context = useFormContext();
  const id = useId();
  const isRequired = required || context.required;

  const [isHintTextVisible, setIsHintTextVisible] = useState(false);

  const hintRef = useRef<HTMLButtonElement>(null);

  const onHintClick = useCallback<MouseEventHandler>((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsHintTextVisible(true);
  }, []);

  return (
    <div className={clsx('alt-form-field', className)}>
      {label && (
        <label htmlFor={id} className="alt-form-field__label">
          {label} {isRequired && <span className="alt-form-field__required-mark">*</span>}
          {hintText && (
            <button ref={hintRef} onClick={onHintClick} className="alt-form-field__hint">
              <Icon i="question_mark" />
            </button>
          )}
        </label>
      )}
      <div className="alt-form-field__control">
        {!Array.isArray(children) && typeof children === 'object'
          ? cloneElement(children, { id, ...children.props })
          : children}
      </div>
      {isHintTextVisible && (
        <FloatingBox
          targetElement={hintRef.current}
          onClose={() => setIsHintTextVisible(false)}
          minWidth={200}
          useRootContainer>
          {hintText}
        </FloatingBox>
      )}
    </div>
  );
};

export default memo(FormField) as typeof FormField;
