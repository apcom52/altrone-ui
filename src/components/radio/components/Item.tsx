import { KeyboardEventHandler, memo, useRef } from 'react';
import { RadioItemProps } from '../Radio.types.ts';
import s from './item.module.scss';
import clsx from 'clsx';
import { useRadioContext } from '../Radio.context.ts';
import { useConfiguration } from '../../configuration';

export const RadioItem = memo<RadioItemProps>(
  ({ children, value, className, disabled, style, ...restProps }) => {
    const {
      value: radioValue,
      disabled: radioDisabled,
      name,
      onChange,
    } = useRadioContext();

    const { radio: { item: radioItemConfig = {} } = {} } = useConfiguration();

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
      radioItemConfig.className,
    );

    const styles = {
      ...radioItemConfig.style,
      ...style,
    };

    return (
      <label
        role="radio"
        aria-disabled={itemDisabled}
        aria-checked={itemChecked}
        tabIndex={disabled ? -1 : 0}
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
          disabled={disabled}
        />
        <div className={s.Button} />
        <div className={s.Label}>{children}</div>
      </label>
    );
  },
);
