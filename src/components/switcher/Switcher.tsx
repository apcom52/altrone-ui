import { ChangeEventHandler, KeyboardEventHandler, memo, useRef } from 'react';
import { SwitcherProps } from './Switcher.types.ts';
import clsx from 'clsx';
import s from './switcher.module.scss';

export const Switcher = memo<SwitcherProps>(
  ({
    ref,
    children,
    checked = false,
    onChange,
    className,
    style,
    danger,
    disabled,
    name,
    ...restProps
  }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const cls = clsx(
      s.Switcher,
      {
        [s.Checked]: checked,
        [s.Disabled]: disabled,
        [s.Danger]: danger,
      },
      className,
    );

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
        ref={ref}
        role="switch"
        aria-checked={checked}
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
          disabled={disabled}
          className={s.Input}
        />
        <div className={s.Button}>
          <div className={s.Handle} />
        </div>
        {children ? <div className={s.Label}>{children}</div> : null}
      </label>
    );
  },
);
