import clsx from 'clsx';
import { ColorPickerPresetProps } from '../ColorPicker.types';
import s from './colorPreset.module.scss';
import { Icon } from 'components/icon';
import { GlobalUtils } from 'utils';
import { useMemo } from 'react';

export const ColorPreset = (props: ColorPickerPresetProps) => {
  const { name, title, value, selected } = props;

  const colorLuminance = useMemo(() => {
    return GlobalUtils.getColorLuminance(value);
  }, [value]);

  const cls = clsx(s.ColorPreset, {
    [s.Selected]: selected,
    [s.Dark]: colorLuminance === 'dark',
    [s.Light]: colorLuminance === 'light',
  });

  return (
    <button
      title={title || name}
      aria-valuetext={value}
      className={cls}
      style={{ backgroundColor: value }}
      onClick={() => {
        props.onChange(value);
      }}
    >
      {selected ? <Icon i="check" className={s.Icon} /> : null}
    </button>
  );
};
