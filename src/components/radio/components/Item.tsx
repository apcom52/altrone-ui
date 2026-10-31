import { memo } from 'react';
import { RadioItemProps } from '../Radio.types.ts';
import s from './item.module.scss';
import clsx from 'clsx';
import { useRadioContext } from '../Radio.context.ts';

export const RadioItem = memo<RadioItemProps>(
  ({
    ref,
    children,
    value,
    className,
    disabled,
    style,
    size: itemSize,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    ...restProps
  }) => {
    const {
      value: radioValue,
      disabled: radioDisabled,
      name,
      onChange,
      size: groupSize,
    } = useRadioContext();

    const itemChecked = radioValue === value;
    const itemDisabled = Boolean(radioDisabled || disabled);
    const size = itemSize ?? groupSize;

    const cls = clsx(
      s.RadioItem,
      {
        [s.Checked]: itemChecked,
        [s.Disabled]: itemDisabled,
        [s.Mini]: size === 'mini',
        [s.Small]: size === 's',
        [s.Large]: size === 'l',
        [s.XLarge]: size === 'xl',
      },
      className,
    );

    return (
      <label ref={ref} className={cls} style={style} {...restProps}>
        <input
          type="radio"
          className={s.Input}
          name={name}
          checked={itemChecked}
          value={value}
          disabled={itemDisabled}
          onChange={onChange}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
        />
        <span className={s.Button}>
          <span className={s.Dot} />
        </span>
        {children ? <span className={s.Label}>{children}</span> : null}
      </label>
    );
  },
);
