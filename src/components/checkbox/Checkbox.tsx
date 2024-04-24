import { ChangeEventHandler, KeyboardEventHandler, memo, useRef } from 'react';
import { CheckboxProps } from './Checkbox.types.ts';
import clsx from 'clsx';
import { Icon } from '../icon';
import s from './checkbox.module.scss';
import { CheckIcon } from './inner/checkIcon.tsx';

export const Checkbox = memo<CheckboxProps>(
  ({
    children,
    checked = false,
    onChange,
    className,
    style,
    danger,
    indeterminate,
    disabled,
    name,
    ...restProps
  }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const cls = clsx(s.Checkbox, {
      [s.Checked]: checked,
      [s.Disabled]: disabled,
    });

    const styles = {
      ...style,
    };

    const onChangeHandler: ChangeEventHandler = (e) => {
      onChange?.(!checked, e);
    };

    const onKeyDown: KeyboardEventHandler = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        inputRef.current?.click();
      }
    };

    return (
      <label
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        className={cls}
        style={styles}
        tabIndex={0}
        onKeyDown={onKeyDown}
        {...restProps}
      >
        <input
          ref={inputRef}
          type="checkbox"
          onChange={onChangeHandler}
          checked={checked}
          name={name}
          className={s.Input}
        />
        <div className={s.Button}>
          {indeterminate ? (
            <div className={s.Indetermination} />
          ) : (
            <CheckIcon checked={checked} />
          )}
        </div>
        <div className={s.Label}>{children}</div>
      </label>
    );
  },
);
