import { memo } from 'react';
import clsx from 'clsx';
import { TextInputProps } from '../TextInput';
import '../TextInput/text-input.scss';
import './textarea.scss';
import { BasicInput, BasicInputProps } from '../BasicInput';
import { Elevation, Surface } from '../../../types';

interface TextareaProps
  extends Pick<
      TextInputProps,
      'value' | 'onChange' | 'className' | 'required' | 'elevation' | 'surface'
    >,
    BasicInputProps {
  placeholder?: string;
}

const Textarea = ({
  value,
  onChange,
  className,
  required,
  disabled,
  errorText,
  hintText,
  size,
  elevation = Elevation.convex,
  surface = Surface.paper,
  ...props
}: TextareaProps) => {
  return (
    <BasicInput hintText={hintText} errorText={errorText} size={size} disabled={disabled}>
      <div
        className={clsx('alt-text-input', className, {
          'alt-text-input--required': required,
          'alt-text-input--disabled': disabled,
          [`alt-text-input--surface-${surface}`]: surface !== Surface.paper
        })}
        data-testid="alt-test-textarea">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={clsx('alt-textarea', {
            [`alt-textarea--elevation-${elevation}`]: elevation !== Elevation.convex
          })}
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
