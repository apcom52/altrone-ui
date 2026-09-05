import { ChangeEventHandler, memo, useEffect, useRef } from 'react';
import { CheckboxProps } from './Checkbox.types.ts';
import clsx from 'clsx';
import s from './checkbox.module.scss';
import { CheckIcon } from './inner/checkIcon.tsx';

export const Checkbox = memo<CheckboxProps>(
  ({
    ref,
    children,
    checked = false,
    onChange,
    className,
    style,
    danger,
    indeterminate = false,
    disabled,
    name,
    size = 'm',
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    ...restProps
  }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    /* `indeterminate` is a DOM property, not an attribute — it can only be set
       imperatively, and it's what makes AT announce the checkbox as "mixed". */
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const cls = clsx(
      s.Checkbox,
      {
        [s.Checked]: checked || indeterminate,
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
          {indeterminate ? (
            <span className={s.Indetermination} />
          ) : (
            <CheckIcon checked={checked} />
          )}
        </span>
        {children ? <span className={s.Label}>{children}</span> : null}
      </label>
    );
  },
);
