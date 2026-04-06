import clsx from 'clsx';
import { ColorPickerPresetProps } from '../ColorPicker.types';
import s from './colorPreset.module.scss';
import { GlobalUtils } from 'utils';
import { useCallback, useMemo, MouseEvent } from 'react';
import { Check } from 'lucide-react';

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
      {selected ? <Check className={s.Icon} /> : null}
    </button>
  );
};
