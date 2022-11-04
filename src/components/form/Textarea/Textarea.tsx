import {memo} from "react";
import clsx from "clsx";
import {TextInputProps} from "../TextInput";
import '../TextInput/text-input.scss';
import './textarea.scss';

interface TextareaProps extends Pick<TextInputProps, 'value' | 'onChange' | 'className' | 'classNames' | 'required' | 'disabled' | 'errorText' | 'hintText'> {
}

const Textarea = ({ value, onChange, className, classNames, required, disabled, errorText, hintText, ...props }: TextareaProps) => {
  return <div
    className={clsx('alt-text-input', className, {
      'alt-text-input--invalid': errorText,
      'alt-text-input--required': required,
      'alt-text-input--disabled': disabled,
    })}
    data-testid='alt-test-textarea'
  >
    <textarea value={value} onChange={e => onChange(e.target.value)} className='alt-textarea' {...props} />
    {errorText && <div className='alt-text-input__error-text'>{errorText}</div>}
    {hintText && <div className='alt-text-input__hint-text'>{hintText}</div>}
    {required && <div className='alt-text-input__required-mark'>*</div>}
  </div>
}

export default memo(Textarea)