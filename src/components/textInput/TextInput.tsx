import { forwardRef } from 'react';
import { TextInputProps } from './TextInput.types.ts';
import s from './textInput.module.scss';
import clsx from 'clsx';

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const {
      value,
      onChange,
      className,
      style,
      wrapperClassName,
      wrapperStyle,
      invalid,
      ...restProps
    } = props;

    const wrapperCls = clsx(s.Wrapper, wrapperClassName);
    const cls = clsx(
      s.Input,
      {
        [s.Invalid]: invalid,
      },
      className,
    );

    const wrapperStyles = {
      ...wrapperStyle,
    };

    const styles = {
      ...style,
    };

    return (
      <div className={wrapperCls} style={wrapperStyles}>
        <input
          type="text"
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value, e)}
          className={cls}
          style={styles}
          aria-invalid={invalid}
          {...restProps}
        />
      </div>
    );
  },
);
