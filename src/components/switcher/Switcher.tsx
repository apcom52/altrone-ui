import { ChangeEventHandler, memo, useRef } from 'react';
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
    size = 'm',
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    ...restProps
  }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const cls = clsx(
      s.Switcher,
      {
        [s.Checked]: checked,
        [s.Disabled]: disabled,
        [s.Danger]: danger,
        [s.Mini]: size === 'mini',
        [s.Small]: size === 's',
        [s.Large]: size === 'l',
        [s.XLarge]: size === 'xl',
      },
      className,
    );

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
      onChange?.(!checked, event);
    };

    return (
      <label ref={ref} className={cls} style={style} {...restProps}>
        <input
          ref={inputRef}
          type="checkbox"
          role="switch"
          className={s.Input}
          checked={checked}
          name={name}
          disabled={disabled}
          onChange={onChangeHandler}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
        />
        <span className={s.Button}>
          <span className={s.Handle} />
        </span>
        {children ? <span className={s.Label}>{children}</span> : null}
      </label>
    );
  },
);
