import { ChangeEventHandler, memo, useRef } from 'react';
import { SwitchProps } from './Switch.types.ts';
import clsx from 'clsx';
import s from './switch.module.scss';
import { useFormField } from '../form/components/Field.context.ts';

export const Switch = memo<SwitchProps>(
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

    const cls = clsx(
      s.Switch,
      {
        [s.Checked]: checked,
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
          name={inputName}
          disabled={inputDisabled}
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
