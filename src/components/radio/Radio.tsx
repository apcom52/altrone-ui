import { ChangeEventHandler, memo, useCallback, useId, useMemo } from 'react';
import clsx from 'clsx';
import s from './radio.module.scss';
import { RadioContext, RadioProps } from './Radio.types.ts';
import { RadioItem } from './components';
import { ArrayUtils } from 'utils';
import { RadioContextWrapper } from './Radio.context.ts';
import { useFormField } from '../form/components/Field.context.ts';

const RadioWrapper = memo<RadioProps>(
  ({
    ref,
    children,
    value,
    onChange,
    className,
    style,
    orientation = 'horizontal',
    name,
    disabled,
    size,
    ...restProps
  }) => {
    const id = useId();

    const {
      name: formFieldName,
      disabled: formFieldDisabled,
      size: formFieldSize,
    } = useFormField();

    const radioName =
      typeof name === 'string' && name ? name : formFieldName || id;
    const radioDisabled =
      typeof disabled === 'boolean' ? disabled : formFieldDisabled;
    const radioSize = size || formFieldSize || 'm';

    const cls = clsx(
      s.RadioList,
      {
        [s.Vertical]: orientation === 'vertical',
      },
      className,
    );

    const styles = {
      ...style,
    };

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
      (e) => {
        onChange?.(e.currentTarget.value, e);
      },
      [onChange],
    );
    const safeChildren = ArrayUtils.getSafeArray(children);

    const radioContext = useMemo<RadioContext>(() => {
      return {
        name: radioName,
        value,
        disabled: Boolean(radioDisabled),
        onChange: onChangeHandler,
        size: radioSize,
      };
    }, [onChangeHandler, value, radioName, radioDisabled, radioSize]);

    return (
      <RadioContextWrapper.Provider value={radioContext}>
        <div ref={ref} className={cls} style={styles} {...restProps}>
          {safeChildren}
        </div>
      </RadioContextWrapper.Provider>
    );
  },
);

const RadioNamespace = Object.assign(RadioWrapper, {
  Item: RadioItem,
});

export { RadioNamespace as Radio };
