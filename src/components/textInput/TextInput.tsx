import React, {
  cloneElement,
  FocusEventHandler,
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
import { useFormField } from '../form/components/Field.tsx';

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
      readonlyStyles = true,
      name,
      ...restProps
    } = props;

    const {
      value: formFieldValue,
      name: formFieldName,
      invalid: formFieldInvalid,
    } = useFormField();

    const inputValue =
      typeof formFieldValue === 'string' ? formFieldValue : value;
    const inputName = typeof name === 'string' ? name : formFieldName;
    const inputInvalid =
      typeof invalid === 'boolean' ? invalid : formFieldInvalid;

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
      !(restProps.readOnly && readonlyStyles) &&
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
        [s.Invalid]: inputInvalid,
        [s.Readonly]: readonlyStyles && restProps.readOnly,
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

    const [leftIslands, rightIslands, nonIslandElements] = useMemo(() => {
      const safeChildren = (
        Array.isArray(children) ? children : [children]
      ).filter((childElement) => Boolean(childElement));

      const islandElements = [];
      const nonIslandElements = [];

      for (const element of safeChildren) {
        if (element && typeof element !== 'string') {
          if (
            [TextIsland, IconIsland, ActionIsland, CustomIsland].includes(
              (element as JSX.Element).type,
            )
          ) {
            islandElements.push(element);
          } else {
            nonIslandElements.push(element);
          }
        } else {
          nonIslandElements.push(element);
        }
      }

      const left = islandElements.filter(
        (island) =>
          !island?.props?.placement || island?.props?.placement === 'left',
      );
      const right = islandElements.filter(
        (island) => island?.props?.placement === 'right',
      );

      return [left, right, nonIslandElements];
    }, [children]);

    const onChangeHandler = useCallback<
      React.ChangeEventHandler<HTMLInputElement>
    >(
      (e) => {
        onChange?.(e.target.value, e);
      },
      [onChange],
    );

    const onFocusHandler: FocusEventHandler<HTMLInputElement> = useCallback(
      (e) => {
        onFocus?.(e);
        focus();
      },
      [onFocus],
    );

    const onBlurHandler: FocusEventHandler<HTMLInputElement> = useCallback(
      (e) => {
        onBlur?.(e);
        blur();
      },
      [onFocus],
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
        value: inputValue,
        onChange: onChangeHandler,
        'aria-invalid': inputInvalid,
        'data-rainbow-opacity': 0.33,
        'data-rainbow-blur': 36,
        onFocus: onFocusHandler,
        onBlur: onBlurHandler,
        className,
        style: styles,
        name: inputName,
        ...rainbowEvents,
        ...restProps,
        ...Component.props,
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
          value={inputValue}
          onChange={onChangeHandler}
          className={cls}
          style={styles}
          aria-invalid={inputInvalid}
          data-rainbow-opacity={0.33}
          data-rainbow-blur={36}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          name={inputName}
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
        {nonIslandElements}
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
