import { forwardRef } from 'react';
import { TextareaProps } from './Textarea.types.ts';
import { TextInput } from '../textInput';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';
import clsx from 'clsx';
import s from './textarea.module.scss';
import inputStyles from '../textInput/textInput.module.scss';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, style, ...restProps }, ref) => {
    const { textarea: textareaConfig = {} } = useConfiguration();

    const cls = clsx(
      s.Textarea,
      inputStyles.Input,
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
        Component={<textarea className={cls} ref={ref} />}
        {...restProps}
      />
    );
  },
);
