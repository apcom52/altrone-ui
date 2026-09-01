import React, {
  isValidElement,
  ReactElement,
  useCallback,
  useMemo,
} from 'react';
import { IslandPlacement, TextInputProps } from './TextInput.types.ts';
import s from './textInput.module.scss';
import clsx from 'clsx';
import { DOMUtils, AltChildren } from 'utils';
import {
  ActionIsland,
  CharCounterIsland,
  CustomIsland,
  IconIsland,
  LoadingIsland,
  TextIsland,
} from './components';
import { useFormField } from '../form/components/Field.context.ts';
import {
  TextInputSizeContext,
  TextInputValueSizeContext,
} from './TextInput.context.ts';
import { Slot } from 'utils/components/Slot.tsx';
import { Box } from 'components/box';

const ISLAND_TYPES = [
  TextIsland,
  IconIsland,
  ActionIsland,
  CustomIsland,
  LoadingIsland,
  CharCounterIsland,
];

const TextInputComponent = ({
  ref,
  inputRef,
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
  const inputSize = size || formFieldSize || 'm';

  const isReadonly = readonlyStyles && Boolean(restProps.readOnly);

  const [startIslands, endIslands, nonIslandElements, asChildElement] =
    useMemo(() => {
      const elementList = new AltChildren(children)
        .filterNodes()
        .toArray() as ReactElement[];

      const islandElements: ReactElement[] = [];
      const nonIslands: ReactElement[] = [];

      for (const element of elementList) {
        if (
          element &&
          typeof element !== 'string' &&
          DOMUtils.containsElementType(element, ISLAND_TYPES)
        ) {
          islandElements.push(element);
        } else {
          nonIslands.push(element);
        }
      }

      const placementOf = (el: ReactElement): IslandPlacement | undefined =>
        (el.props as { placement?: IslandPlacement }).placement || 'start';

      const start = islandElements.filter(
        (island) => (placementOf(island) ?? 'start') === 'start',
      );
      const end = islandElements.filter(
        (island) => placementOf(island) === 'end',
      );

      if (asChild) {
        const [first, ...rest] = nonIslands;
        return [start, end, rest, first ?? null] as const;
      }

      return [start, end, nonIslands, null] as const;
    }, [children, asChild]);

  const onChangeHandler = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (e) => {
      onChange?.(e.target.value, e);
    },
    [onChange],
  );

  const valueSize = useMemo(
    () => ({
      valueLength: value?.length ?? 0,
      maxLength: restProps.maxLength,
    }),
    [value, restProps.maxLength],
  );

  const fieldProps = {
    value,
    onChange: onChangeHandler,
    onFocus,
    onBlur,
    className: clsx(s.Input, className),
    style,
    'aria-invalid': inputInvalid,
    name: inputName,
    disabled: inputDisabled,
    ...restProps,
  };

  let inputElement: ReactElement | null;

  if (asChild) {
    if (!isValidElement(asChildElement)) {
      console.error(
        '[TextInput] asChild requires a valid React element as the first non-island child',
      );
      return null;
    }

    inputElement = (
      <Slot ref={inputRef} {...fieldProps}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {asChildElement as ReactElement<any>}
      </Slot>
    );
  } else {
    inputElement = <input type="text" ref={inputRef} {...fieldProps} />;
  }

  /**
   * `padding={{ y: 0 }}`: height is then the size tier exactly
   * (`min-height: var(--box-size)`) — islands, which are ~one tier tall, can't
   * inflate it. Horizontal padding stays on the value Box sets from `size`.
   */
  return (
    <Box
      ref={ref}
      editable
      shape="pill"
      material={variant === 'transparent' ? 'transparent' : 'plate'}
      tone={inputInvalid ? 'danger' : 'neutral'}
      size={inputSize}
      padding={{ y: 0 }}
      className={clsx(
        s.TextInput,
        {
          [s.Transparent]: variant === 'transparent',
          [s.Mini]: inputSize === 'mini',
          [s.Small]: inputSize === 's',
          [s.Large]: inputSize === 'l',
          [s.XLarge]: inputSize === 'xl',
          [s.Readonly]: isReadonly,
          [s.Disabled]: inputDisabled,
        },
        wrapperClassName,
      )}
      style={wrapperStyle}
    >
      <TextInputSizeContext.Provider value={inputSize}>
        <TextInputValueSizeContext.Provider value={valueSize}>
          <div className={s.Field}>
            {startIslands.length ? (
              <div className={s.StartIslands} data-altrone-island="start">
                {startIslands}
              </div>
            ) : null}
            {inputElement}
            {endIslands.length ? (
              <div className={s.EndIslands} data-altrone-island="end">
                {endIslands}
              </div>
            ) : null}
            {nonIslandElements}
          </div>
        </TextInputValueSizeContext.Provider>
      </TextInputSizeContext.Provider>
    </Box>
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
