import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { InputComponentProps, TextInputProps, TextInputRef } from './TextInput.types';
import { Input } from './components';
import { Popover } from '../../containers';
import { PopoverRef } from '../../containers/Popover/Popover.types';
import { useResizeObserver } from '../../../hooks';
import { TextInputIsland } from './TextInputIsland';
import { Loading } from '../../indicators';
import { Elevation, Size, Surface } from '../../../types';
import clsx from 'clsx';
import { BasicInput } from '../BasicInput';

const EMPTY_ARRAY: string[] = [];

export const TextInput = forwardRef<TextInputRef, TextInputProps>((props, ref) => {
  const {
    value,
    onChange,
    id,
    className,
    type,
    maxLength,
    suggestions = EMPTY_ARRAY,
    onFocus,
    onBlur,
    children,
    loading = false,
    Component,
    size = Size.medium,
    disabled = false,
    required = false,
    elevation = Elevation.convex,
    surface = Surface.solid,
    ...restProps
  } = props;

  const popoverRef = useRef<PopoverRef>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const leftIslandsContainerRef = useRef<HTMLDivElement | null>(null);
  const rightIslandsContainerRef = useRef<HTMLDivElement | null>(null);

  useResizeObserver(leftIslandsContainerRef);
  useResizeObserver(rightIslandsContainerRef);

  const [leftIslands, rightIslands] = useMemo(() => {
    const safeChildren = (Array.isArray(children) ? children : [children]).filter((childElement) =>
      Boolean(childElement)
    );

    const left = safeChildren.filter(
      (island) => !island?.props.placement || island?.props.placement === 'left'
    );
    const right = safeChildren.filter((island) => island?.props.placement === 'right');

    if (loading) {
      right.push(
        <TextInputIsland.Custom placement="right" className="alt-text-input__loading">
          <Loading color="var(--secondaryTextColor)" />
        </TextInputIsland.Custom>
      );
    }

    if (required) {
      right.push(
        <TextInputIsland.Custom placement="right" className="alt-text-input__required-mark">
          *
        </TextInputIsland.Custom>
      );
    }

    return [left, right];
  }, [children, loading, required]);

  useImperativeHandle(
    ref,
    () => ({
      value,
      inputElement: inputRef.current
    }),
    [value, inputRef.current]
  );

  const inputProps: InputComponentProps = {
    value,
    onChange,
    type,
    maxLength,
    id,
    className: clsx(
      className,
      `alt-input--elevation-${elevation}`,
      `alt-input--surface-${surface}`
    ),
    onFocus,
    onBlur,
    disabled: disabled,
    style: {
      paddingLeft: leftIslands.length ? leftIslandsContainerRef.current?.offsetWidth + 'px' : '8px',
      paddingRight: rightIslands.length
        ? rightIslandsContainerRef.current?.offsetWidth + 'px'
        : '8px'
    },
    ...restProps
  };

  const inputElement = Component ? (
    Component
  ) : (
    <Popover
      enabled={false}
      ref={popoverRef}
      placement="bottom"
      trigger={['click', 'focus']}
      showCloseButton={false}
      useParentWidth
      useFocusTrap={false}
      content={<>hello!</>}>
      <Input key="textInput" ref={inputRef} {...inputProps} />
    </Popover>
  );

  return (
    <BasicInput className="alt-text-input" size={size}>
      <div
        className={clsx('alt-text-input__container', {
          [`alt-text-input--size-${size}`]: size !== Size.medium,
          'alt-text-input--disabled': disabled
        })}>
        {inputElement}
        {leftIslands.length ? (
          <div
            className="alt-text-input__islands alt-text-input__left-islands"
            ref={leftIslandsContainerRef}>
            {leftIslands}
          </div>
        ) : null}
        {rightIslands.length ? (
          <div
            className="alt-text-input__islands alt-text-input__right-islands"
            ref={rightIslandsContainerRef}>
            {rightIslands}
          </div>
        ) : null}
      </div>
    </BasicInput>
  );
});
