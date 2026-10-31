import clsx from 'clsx';
import { ColorPickerPresetProps } from '../ColorPicker.types';
import s from './colorPreset.module.scss';
import { GlobalUtils } from 'utils';
import { useCallback, useMemo, MouseEvent, Ref } from 'react';
import { CheckIcon } from 'components/checkbox';
import { motion, useAnimationControls } from 'motion/react';

interface ColorPresetProps extends ColorPickerPresetProps {
  ref?: Ref<HTMLButtonElement>;
  tabIndex?: number;
  onFocus?: () => void;
}

export const ColorPreset = (props: ColorPresetProps) => {
  const { ref, name, title, value, selected, onChange, tabIndex, onFocus } =
    props;

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
      ref={ref}
      type="button"
      tabIndex={tabIndex}
      onFocus={onFocus}
      title={title || name}
      aria-label={`${title || name}: ${value}`}
      aria-pressed={Boolean(selected)}
      className={cls}
      style={{ backgroundColor: value }}
      onClick={handleClick}
      animate={controls}
    >
      <CheckIcon checked={Boolean(selected)} className={s.Icon} />
    </motion.button>
  );
};
