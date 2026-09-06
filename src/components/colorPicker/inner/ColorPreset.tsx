import clsx from 'clsx';
import { ColorPickerPresetProps } from '../ColorPicker.types';
import s from './colorPreset.module.scss';
import { GlobalUtils } from 'utils';
import { useCallback, useMemo, MouseEvent } from 'react';
import { CheckIcon } from 'components/checkbox';
import { motion, useAnimationControls } from 'motion/react';

export const ColorPreset = (props: ColorPickerPresetProps) => {
  const { name, title, value, selected, onChange } = props;

  const controls = useAnimationControls();

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
      /** Squish, overshoot, settle. Suppressed under reduced motion by MotionConfig. */
      controls.start({
        scale: [1, 0.85, 1.08, 1],
        transition: { duration: 0.32, times: [0, 0.35, 0.7, 1], ease: 'easeOut' },
      });
      onChange(value, event);
    },
    [controls, onChange, value],
  );

  return (
    <motion.button
      type="button"
      title={title || name}
      aria-label={`${title || name}: ${value}`}
      className={cls}
      style={{ backgroundColor: value }}
      onClick={handleClick}
      animate={controls}
    >
      <CheckIcon checked={Boolean(selected)} className={s.Icon} />
    </motion.button>
  );
};
