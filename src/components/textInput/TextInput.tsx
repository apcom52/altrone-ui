import { forwardRef } from 'react';
import { TextInputProps } from './TextInput.types.ts';
import s from './textInput.module.scss';
import clsx from 'clsx';
import { useRainbowEffect } from '../application/RainbowEffect.tsx';
import { Size } from '../../types';
import { useToggledState } from '../../utils';

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const {
      value,
      onChange,
      className,
      transparent = false,
      style,
      wrapperClassName,
      wrapperStyle,
      invalid,
      size = Size.medium,
      rainbowEffect = true,
      onFocus,
      onBlur,
      ...restProps
    } = props;

    const {
      value: focused,
      enable: focus,
      disable: blur,
    } = useToggledState(false);

    const rainbowEvents = useRainbowEffect(
      !restProps.readOnly && !restProps.disabled && rainbowEffect && !focused,
    );

    const wrapperCls = clsx(s.Wrapper, wrapperClassName);
    const cls = clsx(
      s.Input,
      {
        [s.Invalid]: invalid,
        [s.Readonly]: restProps.readOnly,
        [s.Transparent]: transparent,
        [s.Small]: size === Size.small,
        [s.Large]: size === Size.large,
      },
      className,
    );

    const wrapperStyles = {
      ...wrapperStyle,
    };

    const styles = {
      ...style,
    };

    return (
      <div className={wrapperCls} style={wrapperStyles}>
        <input
          type="text"
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value, e)}
          className={cls}
          style={styles}
          aria-invalid={invalid}
          data-rainbow-opacity={0.5}
          data-rainbow-blur={36}
          onFocus={focus}
          onBlur={blur}
          {...rainbowEvents}
          {...restProps}
        />
      </div>
    );
  },
);
