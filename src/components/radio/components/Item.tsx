import { KeyboardEventHandler, memo, useRef } from 'react';
import { RadioItemProps } from '../Radio.types.ts';
import s from './item.module.scss';
import clsx from 'clsx';
import { useRadioContext } from '../Radio.context.ts';

export const RadioItem = memo<RadioItemProps>(
  ({ ref, children, value, className, disabled, style, ...restProps }) => {
    const {
      value: radioValue,
      disabled: radioDisabled,
      name,
      onChange,
    } = useRadioContext();

    const inputRef = useRef<HTMLInputElement>(null);

    const itemChecked = radioValue === value;
    const itemDisabled = Boolean(radioDisabled || disabled);

    const onKeyDown: KeyboardEventHandler = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        inputRef.current?.click();
      }
    };

    const cls = clsx(
      s.RadioItem,
      {
        [s.Checked]: itemChecked,
        [s.Disabled]: itemDisabled,
      },
      className,
    );

    const styles = {
      ...style,
    };

    return (
      <label
        ref={ref}
        aria-disabled={itemDisabled}
        tabIndex={itemDisabled ? -1 : 0}
        className={cls}
        onKeyDown={onKeyDown}
        style={styles}
        {...restProps}
      >
        <input
          type="radio"
          name={name}
          ref={inputRef}
          checked={itemChecked}
          value={value}
          onChange={onChange}
          className={s.Input}
          disabled={itemDisabled}
        />
        <div className={s.Button} />
        {children ? <div className={s.Label}>{children}</div> : null}
      </label>
    );
  },
);
