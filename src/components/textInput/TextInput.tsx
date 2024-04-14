import React, {
  cloneElement,
  forwardRef,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { TextInputProps } from './TextInput.types.ts';
import s from './textInput.module.scss';
import clsx from 'clsx';
import { useRainbowEffect } from '../application/RainbowEffect.tsx';
import { Size } from '../../types';
import { useResizeObserver, useToggledState } from '../../utils';
import {
  ActionIsland,
  CustomIsland,
  IconIsland,
  TextIsland,
} from './components';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';

const TextInputComponent = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const {
      children,
      value,
      onChange,
      className,
      transparent = false,
      style,
      wrapperClassName,
      wrapperStyle,
      invalid,
      size = Size.medium,
      rainbowEffect,
      onFocus,
      onBlur,
      Component,
      suggestions = [],
      ...restProps
    } = props;

    const { textInput: inputConfig = {} } = useConfiguration();

    const isRainbowPropsActivated =
      typeof rainbowEffect === 'boolean'
        ? rainbowEffect
        : inputConfig.rainbowEffect || true;

    const inputRef = useRef<HTMLInputElement | null>(null);

    const {
      value: focused,
      enable: focus,
      disable: blur,
    } = useToggledState(false);

    const rainbowEvents = useRainbowEffect(
      !restProps.readOnly &&
        !restProps.disabled &&
        rainbowEffect &&
        !focused &&
        isRainbowPropsActivated,
    );

    const wrapperCls = clsx(
      s.Wrapper,
      {
        [s.Small]: size === Size.small,
        [s.Large]: size === Size.large,
      },
      wrapperClassName,
    );

    const cls = clsx(
      s.Input,
      {
        [s.Invalid]: invalid,
        [s.Readonly]: restProps.readOnly,
        [s.Transparent]: transparent,
      },
      className,
      inputConfig.className,
    );

    const wrapperStyles = {
      ...wrapperStyle,
    };

    const leftIslandsContainerRef = useRef<HTMLDivElement | null>(null);
    const rightIslandsContainerRef = useRef<HTMLDivElement | null>(null);

    const [leftIslands, rightIslands] = useMemo(() => {
      const safeChildren = (
        Array.isArray(children) ? children : [children]
      ).filter((childElement) => Boolean(childElement));

      const left = safeChildren.filter(
        (island) =>
          !island?.props.placement || island?.props.placement === 'left',
      );
      const right = safeChildren.filter(
        (island) => island?.props.placement === 'right',
      );

      return [left, right];
    }, [children]);

    const onChangeHandler = useCallback<
      React.ChangeEventHandler<HTMLInputElement>
    >(
      (e) => {
        console.log('>> change handler', e);
        onChange?.(e.target.value, e);
      },
      [onChange],
    );

    useResizeObserver(leftIslandsContainerRef);
    useResizeObserver(rightIslandsContainerRef);

    const styles = {
      ...style,
      ...inputConfig.style,
      paddingLeft: leftIslands.length
        ? leftIslandsContainerRef.current?.offsetWidth + 'px'
        : undefined,
      paddingRight: rightIslands.length
        ? rightIslandsContainerRef.current?.offsetWidth + 'px'
        : undefined,
    };

    let inputElement = null;
    if (Component) {
      inputElement = cloneElement(Component, {
        ref,
        value,
        onChange: onChangeHandler,
        ariaInvalid: invalid,
        dataRainbowOpacity: 0.33,
        dataRainbowBlur: 36,
        onFocus: focus,
        onBlur: blur,
        className,
        style: styles,
        ...rainbowEvents,
        ...restProps,
      });
    } else {
      inputElement = (
        <input
          type="text"
          ref={(element) => {
            inputRef.current = element;
            if (typeof ref === 'function') {
              ref(element);
            } else if (ref) {
              ref.current = element;
            }
          }}
          value={value}
          onChange={onChangeHandler}
          className={cls}
          style={styles}
          aria-invalid={invalid}
          data-rainbow-opacity={0.33}
          data-rainbow-blur={36}
          onFocus={focus}
          onBlur={blur}
          {...rainbowEvents}
          {...restProps}
        />
      );
    }

    return (
      <div className={wrapperCls} style={wrapperStyles}>
        {inputElement}
        {leftIslands.length ? (
          <div ref={leftIslandsContainerRef} className={s.LeftIslands}>
            {leftIslands}
          </div>
        ) : null}
        {rightIslands.length ? (
          <div ref={rightIslandsContainerRef} className={s.RightIslands}>
            {rightIslands}
          </div>
        ) : null}
      </div>
    );
  },
);

const TextInputNamespace = Object.assign(TextInputComponent, {
  TextIsland: TextIsland,
  IconIsland: IconIsland,
  ActionIsland: ActionIsland,
  CustomIsland: CustomIsland,
});

export { TextInputNamespace as TextInput };
