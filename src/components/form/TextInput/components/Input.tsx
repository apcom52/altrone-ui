import { forwardRef, memo, useCallback, useId } from 'react';
import { InputComponentProps } from '../TextInput.types';
import './input.scss';
import clsx from 'clsx';

export const Input = forwardRef<HTMLInputElement, InputComponentProps>((props, ref) => {
  const inputId = useId();

  const {
    value,
    onChange,
    type = 'text',
    className,
    id,
    maxLength,
    onFocus,
    onBlur,
    leftOffset,
    rightOffset,
    ...restProps
  } = props;

  const onChangeHandler = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      onChange(event.target.value, event);
    },
    [onChange]
  );

  return (
    <input
      key={inputId}
      ref={ref}
      id={id}
      className={clsx('alt-input', className)}
      type={type}
      value={value}
      onChange={onChangeHandler}
      placeholder="test"
      maxLength={maxLength}
      onFocus={onFocus}
      onBlur={onBlur}
      {...restProps}
    />
  );
});
