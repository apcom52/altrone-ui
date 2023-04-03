import { forwardRef, memo, useEffect, useMemo, useRef, useState } from 'react';
import { Size } from '../../../types';
import './text-input.scss';
import clsx from 'clsx';
import { useInputIsland } from './useInputIsland';
import { useBoundingclientrect } from 'rooks';
import { BasicInput } from '../BasicInput';
import { useResizeObserver } from '../../../hooks';
import { FloatingBox } from '../../containers';
import { ContextMenu } from '../../list';

export enum InputIslandType {
  text = 'text',
  icon = 'icon',
  actions = 'actions',
  components = 'components'
}

export interface InputIslandAction {
  title: string;
  icon: JSX.Element;
  onClick: () => void;
  disabled?: boolean;
}

export interface InputIsland {
  type: InputIslandType;
  content: string | JSX.Element | JSX.Element[] | InputIslandAction[];
}

export interface TextInputProps
  extends Omit<React.HTMLProps<HTMLInputElement>, 'value' | 'onChange' | 'size' | 'ref'> {
  value: string;
  onChange: (value: string) => void;
  classNames?: {
    control?: string;
  };
  leftIsland?: InputIsland;
  rightIsland?: InputIsland;
  prefix?: string;
  suffix?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  errorText?: string;
  hintText?: string;
  size?: Size;
  Component?: JSX.Element;
  suggestions?: string[];
}

const DEFAULT_HORIZONTAL_PADDING = 12;
const DEFAULT_ISLAND_OFFSET = 8;

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      onChange,
      className,
      classNames = {},
      prefix,
      leftIcon,
      leftIsland,
      suffix,
      rightIcon,
      rightIsland,
      style,
      errorText,
      hintText,
      required,
      disabled,
      Component,
      size = Size.medium,
      suggestions = [],
      ...props
    },
    ref
  ) => {
    const _leftIsland = useInputIsland(leftIsland, leftIcon, prefix, disabled);
    const _rightIsland = useInputIsland(rightIsland, rightIcon, suffix, disabled);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const leftIslandRef = useRef<HTMLDivElement>(null);
    const rightIslandRef = useRef<HTMLDivElement>(null);

    const { left: wrapperLeft = 0, right: wrapperRight = 0 } =
      useBoundingclientrect(wrapperRef) || {};
    const { width: leftIslandWidth = 0 } = useBoundingclientrect(leftIslandRef) || {};
    const { width: rightIslandWidth = 0 } = useBoundingclientrect(rightIslandRef) || {};

    const leftIslandResizeObserver = useResizeObserver(leftIslandRef);
    const rightIslandResizeObserver = useResizeObserver(rightIslandRef);
    const textFieldResizeObserver = useResizeObserver(wrapperRef);

    const [leftPadding, setLeftPadding] = useState(DEFAULT_HORIZONTAL_PADDING);
    const [rightPadding, setRightPadding] = useState(DEFAULT_HORIZONTAL_PADDING);

    useEffect(() => {
      if (_leftIsland) {
        setLeftPadding(leftIslandWidth + DEFAULT_ISLAND_OFFSET);
      } else {
        setLeftPadding(DEFAULT_HORIZONTAL_PADDING);
      }
    }, [
      _leftIsland,
      leftIslandWidth,
      wrapperLeft,
      size,
      leftIslandResizeObserver,
      textFieldResizeObserver
    ]);

    useEffect(() => {
      if (_rightIsland) {
        setRightPadding(DEFAULT_ISLAND_OFFSET + rightIslandWidth);
      } else {
        setRightPadding(DEFAULT_HORIZONTAL_PADDING);
      }
    }, [
      _rightIsland,
      rightIslandWidth,
      wrapperRight,
      size,
      rightIslandResizeObserver,
      textFieldResizeObserver
    ]);

    const suggestionsList = useMemo(() => {
      if (
        !props.value.trim() ||
        suggestions.length === 0 ||
        !inputRef.current ||
        document.activeElement !== inputRef.current
      ) {
        return [];
      }

      return suggestions.filter((suggestion) => {
        return suggestion.toLowerCase().indexOf(props.value.trim().toLowerCase()) > -1;
      });
    }, [suggestions, props.value]);

    return (
      <BasicInput hintText={hintText} errorText={errorText} disabled={disabled} size={size}>
        <div
          className={clsx('alt-text-input', className, {
            'alt-text-input--required': required,
            'alt-text-input--disabled': disabled
          })}
          data-testid="text-input">
          {Component || (
            <input
              className={clsx('alt-text-input__control', classNames.control)}
              style={{
                ...style,
                paddingLeft: leftPadding,
                paddingRight: rightPadding
              }}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              required={required}
              ref={(node: HTMLInputElement) => {
                inputRef.current = node;
                if (typeof ref === 'function') {
                  ref(node);
                } else if (ref) {
                  ref.current = node;
                }
              }}
              {...props}
            />
          )}
          {_leftIsland && (
            <div className="alt-text-input__left-island" ref={leftIslandRef}>
              {_leftIsland}
            </div>
          )}
          {_rightIsland && (
            <div className="alt-text-input__right-island" ref={rightIslandRef}>
              {_rightIsland}
            </div>
          )}

          {required && <div className="alt-text-input__required-mark">*</div>}
        </div>
        {suggestionsList.length > 0 && (
          <FloatingBox
            targetElement={inputRef.current}
            onClose={() => null}
            placement="bottom"
            useParentWidth
            useRootContainer>
            <ContextMenu
              onClose={() => null}
              menu={suggestionsList.map((item) => ({
                title: item,
                value: item,
                onClick: () => onChange(item)
              }))}
            />
          </FloatingBox>
        )}
      </BasicInput>
    );
  }
);

TextInput.displayName = 'TextInput';

export default memo(TextInput) as typeof TextInput;
