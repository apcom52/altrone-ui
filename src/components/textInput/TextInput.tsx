import React, {
  FocusEventHandler,
  isValidElement,
  ReactElement,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { TextInputProps } from './TextInput.types.ts';
import s from './textInput.module.scss';
import clsx from 'clsx';
import { useResizeObserver, useBoolean, DOMUtils } from 'utils';
import {
  ActionIsland,
  CharCounterIsland,
  CustomIsland,
  IconIsland,
  LoadingIsland,
  TextIsland,
} from './components';
import { useConfiguration } from 'components/configuration';
import { useFormField } from '../form/components/Field.tsx';
import { AltChildren } from 'utils';
import {
  TextInputSizeContext,
  TextInputValueSizeContext,
} from './TextInput.context.ts';
import { Slot } from 'utils/components/Slot.tsx';

const TextInputComponent = ({
  ref,
  children,
  value,
  onChange,
  className,
  variant = 'default',
  style,
  wrapperClassName,
  wrapperStyle,
  invalid,
  size,
  onFocus,
  onBlur,
  asChild = false,
  readonlyStyles = true,
  name,
  disabled,
  ...restProps
}: TextInputProps) => {
  const {
    name: formFieldName,
    invalid: formFieldInvalid,
    disabled: formFieldDisabled,
    size: formFieldSize,
  } = useFormField();

  const inputName = typeof name === 'string' ? name : formFieldName;
  const inputInvalid =
    typeof invalid === 'boolean' ? invalid : formFieldInvalid;
  const inputDisabled =
    typeof disabled === 'boolean' ? disabled : formFieldDisabled;
  const inputSize = size || formFieldSize;

  const { textInput: inputConfig = {} } = useConfiguration();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { enable: focus, disable: blur } = useBoolean(false);

  const onFocusHandler: FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      onFocus?.(e);
      focus();
    },
    [onFocus],
  );

  const wrapperCls = clsx(
    s.Wrapper,
    {
      [s.Mini]: inputSize === 'mini',
      [s.Small]: inputSize === 's',
      [s.Large]: inputSize === 'l',
      [s.XLarge]: inputSize === 'xl',
      [s.Transparent]: variant === 'transparent',
    },
    wrapperClassName,
  );

  const cls = clsx(
    s.Input,
    {
      [s.Invalid]: inputInvalid,
      [s.Readonly]: readonlyStyles && restProps.readOnly,
    },
    className,
    inputConfig.className,
  );

  const wrapperStyles = {
    ...wrapperStyle,
  };

  const leftIslandsContainerRef = useRef<HTMLDivElement | null>(null);
  const rightIslandsContainerRef = useRef<HTMLDivElement | null>(null);

  const [leftIslands, rightIslands, nonIslandElements, asChildElement] =
    useMemo(() => {
      const islands = new AltChildren(children).filterNodes();
      const elementList = islands.toArray() as ReactElement[];

      const islandElements: ReactElement[] = [];
      const nonIslands: ReactElement[] = [];

      for (const element of elementList) {
        if (element && typeof element !== 'string') {
          if (
            DOMUtils.containsElementType(element, [
              TextIsland,
              IconIsland,
              ActionIsland,
              CustomIsland,
              LoadingIsland,
              CharCounterIsland,
            ])
          ) {
            islandElements.push(element);
          } else {
            nonIslands.push(element);
          }
        } else {
          nonIslands.push(element);
        }
      }

      const left = islandElements.filter(
        (island) =>
          !island?.props?.placement || island?.props?.placement === 'left',
      );
      const right = islandElements.filter(
        (island) => island?.props?.placement === 'right',
      );

      if (asChild) {
        const [first, ...rest] = nonIslands;
        return [left, right, rest, first ?? null] as const;
      }

      return [left, right, nonIslands, null] as const;
    }, [children, asChild]);

  const onChangeHandler = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (e) => {
      onChange?.(e.target.value, e);
    },
    [onChange],
  );

  const onBlurHandler: FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      onBlur?.(e);
      blur();
    },
    [onBlur],
  );

  useResizeObserver(leftIslandsContainerRef);
  useResizeObserver(rightIslandsContainerRef);

  const styles = {
    ...inputConfig.style,
    ...style,
    paddingLeft: leftIslands.length && leftIslandsContainerRef.current
      ? `${leftIslandsContainerRef.current.offsetWidth}px`
      : undefined,
    paddingRight: rightIslands.length && rightIslandsContainerRef.current
      ? `${rightIslandsContainerRef.current.offsetWidth}px`
      : undefined,
  };

  let inputElement: ReactElement | null = null;

  const valueSize = useMemo(() => {
    return {
      valueLength: value?.length ?? 0,
      maxLength: restProps.maxLength,
    };
  }, [value, restProps.maxLength]);

  if (asChild) {
    if (!isValidElement(asChildElement)) {
      console.error(
        '[TextInput] asChild requires a valid React element as the first non-island child',
      );
      return null;
    }

    inputElement = (
      <Slot
        ref={ref}
        value={value}
        onChange={onChangeHandler}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        className={cls}
        style={styles}
        aria-invalid={inputInvalid}
        name={inputName}
        disabled={inputDisabled}
        {...restProps}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {asChildElement as ReactElement<any>}
      </Slot>
    );
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
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        className={cls}
        style={styles}
        aria-invalid={inputInvalid}
        name={inputName}
        disabled={inputDisabled}
        {...restProps}
      />
    );
  }

  return (
    <div className={wrapperCls} style={wrapperStyles}>
      <TextInputSizeContext.Provider value={inputSize || 'm'}>
        <TextInputValueSizeContext.Provider value={valueSize}>
          {inputElement}
          {leftIslands.length ? (
            <div
              ref={leftIslandsContainerRef}
              className={s.LeftIslands}
              data-altrone-island="left"
            >
              {leftIslands}
            </div>
          ) : null}
          {rightIslands.length ? (
            <div
              ref={rightIslandsContainerRef}
              className={s.RightIslands}
              data-altrone-island="right"
            >
              {rightIslands}
            </div>
          ) : null}
          {nonIslandElements}
        </TextInputValueSizeContext.Provider>
      </TextInputSizeContext.Provider>
    </div>
  );
};

const TextInputNamespace = Object.assign(TextInputComponent, {
  TextIsland: TextIsland,
  IconIsland: IconIsland,
  ActionIsland: ActionIsland,
  CustomIsland: CustomIsland,
  LoadingIsland: LoadingIsland,
  CharCounterIsland: CharCounterIsland,
});

export { TextInputNamespace as TextInput };
