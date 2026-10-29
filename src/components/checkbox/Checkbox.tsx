import { ChangeEventHandler, memo, useEffect, useRef } from 'react';
import { CheckboxProps } from './Checkbox.types.ts';
import clsx from 'clsx';
import s from './checkbox.module.scss';
import { CheckIcon } from './inner/checkIcon.tsx';
import { useFormField } from '../form/components/Field.context.ts';

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
    size,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    ...restProps
  }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const {
      name: formFieldName,
      disabled: formFieldDisabled,
      size: formFieldSize,
    } = useFormField();

    const inputName = typeof name === 'string' ? name : formFieldName;
    const inputDisabled =
      typeof disabled === 'boolean' ? disabled : formFieldDisabled;
    const inputSize = size || formFieldSize || 'm';

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
        [s.Disabled]: inputDisabled,
        [s.Danger]: danger,
        [s.Mini]: inputSize === 'mini',
        [s.Small]: inputSize === 's',
        [s.Large]: inputSize === 'l',
        [s.XLarge]: inputSize === 'xl',
      },
      className,
    );

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
      onChange(!checked, event);
    };

    return (
      <label ref={ref} className={cls} style={style} {...restProps}>
        <input
          ref={inputRef}
          type="checkbox"
          className={s.Input}
          checked={checked}
          name={inputName}
          disabled={inputDisabled}
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
