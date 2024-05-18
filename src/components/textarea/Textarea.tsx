import { forwardRef } from 'react';
import { TextareaProps } from './Textarea.types.ts';
import { TextInput } from '../textInput';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';
import clsx from 'clsx';
import s from './textarea.module.scss';
import inputStyles from '../textInput/textInput.module.scss';
import { useFormField } from '../form/components/Field.tsx';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, style, name, invalid, disabled, size, ...restProps }, ref) => {
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

    const cls = clsx(
      s.Textarea,
      inputStyles.Input,
      {
        [inputStyles.Invalid]: inputInvalid,
      },
      textareaConfig.className,
      className,
    );
    const styles = {
      ...textareaConfig.style,
      ...style,
    };

    return (
      <TextInput
        className={cls}
        style={styles}
        wrapperClassName={s.Wrapper}
        name={inputName}
        invalid={inputInvalid}
        disabled={inputDisabled}
        size={inputSize}
        Component={<textarea className={cls} ref={ref} />}
        {...restProps}
      />
    );
  },
);
