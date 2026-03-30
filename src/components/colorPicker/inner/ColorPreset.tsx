import clsx from 'clsx';
import { ColorPickerPresetProps } from '../ColorPicker.types';
import s from './colorPreset.module.scss';
import { Icon } from 'components/icon';
import { GlobalUtils } from 'utils';
import { useCallback, useMemo, MouseEvent } from 'react';

export const ColorPreset = (props: ColorPickerPresetProps) => {
  const { name, title, value, selected, onChange } = props;

  const colorLuminance = useMemo(() => {
    return GlobalUtils.getColorLuminance(value);
  }, [value]);

  const cls = clsx(s.ColorPreset, {
    [s.Selected]: selected,
    [s.Dark]: colorLuminance === 'dark',
    [s.Light]: colorLuminance === 'light',
  });

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      onChange(value, event);
    },
    [onChange, value],
  );

  return (
    <button
      type="button"
      title={title || name}
      aria-label={`${title || name}: ${value}`}
      className={cls}
      style={{ backgroundColor: value }}
      onClick={handleClick}
    >
      {selected ? <Icon i="check" className={s.Icon} /> : null}
    </button>
  );
};
