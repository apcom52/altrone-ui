import { FC, memo, PropsWithChildren } from 'react';
import { Size } from '../../../types';
import clsx from 'clsx';
import './basic-input.scss';

export interface BasicInputProps<T = string> {
  errorText?: string;
  hintText?: string;
  size?: Size;
  className?: string;
  disabled?: boolean;
}

const BasicInput: FC<PropsWithChildren<BasicInputProps>> = ({
  errorText,
  hintText,
  size = Size.medium,
  className,
  children
}) => {
  return (
    <div
      className={clsx('alt-basic-input', className, {
        'alt-basic-input--invalid': errorText,
        [`alt-basic-input--size-${size}`]: size !== Size.medium
      })}
    >
      {children}
      {errorText && <div className="alt-basic-input__error-text">{errorText}</div>}
      {hintText && <div className="alt-basic-input__hint-text">{hintText}</div>}
    </div>
  );
};

export default memo(BasicInput);
