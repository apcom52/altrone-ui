import {
  ChangeEventHandler,
  createContext,
  memo,
  useCallback,
  useContext,
  useId,
  useMemo,
} from 'react';
import clsx from 'clsx';
import s from './radio.module.scss';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';
import { RadioContext, RadioProps } from './Radio.types.ts';
import { RadioItem } from './components';
import { getSafeArray } from '../../utils';

const RadioContextWrapper = createContext<RadioContext>({
  value: '',
  onChange: () => null,
  name: '',
  disabled: false,
});
export const useRadioContext = () => useContext(RadioContextWrapper);

const RadioWrapper = memo<RadioProps>(
  ({
    children,
    value,
    onChange,
    className,
    style,
    direction = 'horizontal',
    name,
    disabled,
    ...restProps
  }) => {
    const id = useId();

    const radioName = typeof name === 'string' && name ? name : id;

    const { radio: radioConfig = {} } = useConfiguration();

    const cls = clsx(
      s.RadioList,
      {
        [s.Vertical]: direction === 'vertical',
      },
      className,
      radioConfig.className,
    );

    const styles = {
      ...radioConfig.style,
      ...style,
    };

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
      (e) => {
        onChange?.(e.currentTarget.value, e);
      },
      [onChange],
    );
    const safeChildren = getSafeArray(children);

    const radioContext = useMemo<RadioContext>(() => {
      return {
        name: radioName,
        value,
        disabled: Boolean(disabled),
        onChange: onChangeHandler,
      };
    }, [onChangeHandler, value, radioName, disabled]);

    return (
      <RadioContextWrapper.Provider value={radioContext}>
        <div className={cls} style={styles} {...restProps}>
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
