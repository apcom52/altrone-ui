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
import { useRainbowEffect } from 'components/application';
import { useResizeObserver, useBoolean } from 'utils';
import {
  ActionIsland,
  CustomIsland,
  IconIsland,
  TextIsland,
} from './components';
import { useConfiguration } from 'components/configuration';
import { useFormField } from '../form/components/Field.tsx';
import { Dropdown } from '../dropdown';
import { Popover } from '../popover';
import { Tooltip } from '../tooltip';

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
      size,
      rainbowEffect,
      onFocus,
      onBlur,
      Component,
      suggestions = [],
      readonlyStyles = true,
      name,
      disabled,
      ...restProps
    } = props;

    const {
      name: formFieldName,
      invalid: formFieldInvalid,
      disabled: formFieldDisabled,
      size: formFieldSize,
    } = useFormField();

    const inputValue = value;
    const inputName = typeof name === 'string' ? name : formFieldName;
    const inputInvalid =
      typeof invalid === 'boolean' ? invalid : formFieldInvalid;
    const inputDisabled =
      typeof disabled === 'boolean' ? disabled : formFieldDisabled;
    const inputSize = size || formFieldSize;

    const { textInput: inputConfig = {} } = useConfiguration();

    const isRainbowPropsActivated =
      typeof rainbowEffect === 'boolean'
        ? rainbowEffect
        : inputConfig.rainbowEffect || true;

    const inputRef = useRef<HTMLInputElement | null>(null);

    const { value: focused, enable: focus, disable: blur } = useBoolean(false);

    const isRainbowNeeded = Boolean(
      !(restProps.readOnly && readonlyStyles) &&
        !inputDisabled &&
        !focused &&
        isRainbowPropsActivated,
    );

    const rainbowProps = useRainbowEffect(isRainbowNeeded, {
      onMouseEnter: restProps.onMouseEnter,
      onMouseMove: restProps.onMouseMove,
      onMouseLeave: restProps.onMouseLeave,
      opacity: 0.33,
      blur: 36,
    });

    const wrapperCls = clsx(
      s.Wrapper,
      {
        [s.Small]: inputSize === 's',
        [s.Large]: inputSize === 'l',
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
            [
              TextIsland,
              IconIsland,
              ActionIsland,
              CustomIsland,
              Dropdown,
              Popover,
              Tooltip,
            ].includes((element as JSX.Element).type)
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
        onFocus: onFocusHandler,
        onBlur: onBlurHandler,
        className,
        style: styles,
        name: inputName,
        disabled: inputDisabled,
        ...restProps,
        ...Component.props,
        ...rainbowProps,
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
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          name={inputName}
          disabled={inputDisabled}
          {...restProps}
          {...rainbowProps}
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
