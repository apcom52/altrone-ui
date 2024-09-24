import { ChangeEventHandler, KeyboardEventHandler, memo, useRef } from 'react';
import { SwitcherProps } from './Switcher.types.ts';
import clsx from 'clsx';
import s from './switcher.module.scss';
import { useConfiguration } from 'components/configuration';

export const Switcher = memo<SwitcherProps>(
  ({
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
    const { switcher: switcherConfig = {} } = useConfiguration();

    const inputRef = useRef<HTMLInputElement | null>(null);

    const cls = clsx(
      s.Switcher,
      {
        [s.Checked]: checked,
        [s.Disabled]: disabled,
        [s.Danger]: danger,
      },
      className,
      switcherConfig.className,
    );

    const styles = {
      ...switcherConfig.style,
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
          className={s.Input}
        />
        <div className={s.Button}>
          <div className={s.Handle} />
        </div>
        <div className={s.Label}>{children}</div>
      </label>
    );
  },
);
