import { memo } from 'react';
import clsx from 'clsx';
import { TextInputProps } from '../TextInput';
import '../TextInput/text-input.scss';
import './textarea.scss';
import { BasicInput, BasicInputProps } from '../BasicInput';

interface TextareaProps
  extends Pick<TextInputProps, 'value' | 'onChange' | 'className' | 'required'>,
    BasicInputProps {}

const Textarea = ({
  value,
  onChange,
  className,
  required,
  disabled,
  errorText,
  hintText,
  size,
  ...props
}: TextareaProps) => {
  return (
    <BasicInput hintText={hintText} errorText={errorText} size={size} disabled={disabled}>
      <div
        className={clsx('alt-text-input', className, {
          'alt-text-input--required': required,
          'alt-text-input--disabled': disabled
        })}
        data-testid="alt-test-textarea">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="alt-textarea"
          disabled={disabled}
          required={required}
          {...props}
        />
        {required && <div className="alt-text-input__required-mark">*</div>}
      </div>
    </BasicInput>
  );
};

export default memo(Textarea) as typeof Textarea;
