import { TextareaProps } from './Textarea.types.ts';
import { TextInput } from '../textInput';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';
import clsx from 'clsx';
import s from './textarea.module.scss';
import { useFormField } from '../form/components/Field.context.ts';

export const Textarea = ({
  ref,
  className,
  style,
  name,
  invalid,
  disabled,
  size,
  children,
  readOnly,
  ...restProps
}: TextareaProps) => {
  const { textarea: textareaConfig = {} } = useConfiguration();

  const {
    name: formFieldName,
    invalid: formFieldInvalid,
    disabled: formFieldDisabled,
    size: formFieldSize,
  } = useFormField();

  const inputName = typeof name === 'string' ? name : formFieldName;
  const inputInvalid =
    typeof invalid === 'boolean' ? invalid : formFieldInvalid;
  const inputDisabled =
    typeof disabled === 'boolean' ? disabled : formFieldDisabled;
  const inputSize = size || formFieldSize;

  // TextInput (via asChild/Slot) already applies Input, Invalid, Readonly classes —
  // only add Textarea-specific class here to avoid duplication
  const cls = clsx(s.Textarea, textareaConfig.className, className);

  const styles = {
    ...textareaConfig.style,
    ...style,
  };

  return (
    <TextInput
      asChild
      className={cls}
      style={styles}
      wrapperClassName={s.Wrapper}
      name={inputName}
      invalid={inputInvalid}
      disabled={inputDisabled}
      size={inputSize}
      readOnly={readOnly}
      {...restProps}
    >
      <textarea ref={ref} />
      {children}
    </TextInput>
  );
};
