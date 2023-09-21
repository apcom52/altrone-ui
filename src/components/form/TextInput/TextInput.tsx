import React, {
  forwardRef,
  KeyboardEventHandler,
  memo,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { Elevation, Size, Surface } from '../../../types';
import './text-input.scss';
import clsx from 'clsx';
import { useInputIsland } from './useInputIsland';
import { useBoundingclientrect } from 'rooks';
import { BasicInput } from '../BasicInput';
import { useResizeObserver } from '../../../hooks';
import { FloatingBox } from '../../containers';
import { ContextMenu } from '../../list';
import { Icon } from '../../typography';
import { Loading } from '../../indicators';

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
  extends PropsWithChildren<
    Omit<React.HTMLProps<HTMLInputElement>, 'value' | 'onChange' | 'size' | 'ref'>
  > {
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
  useLiveSuggestions?: boolean;
  loading?: boolean;
  elevation?: Elevation;
  surface?: Surface;
}

const DEFAULT_HORIZONTAL_PADDING = 12;
const DEFAULT_ISLAND_OFFSET = 8;
const NO_SUGGESTIONS: string[] = [];

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
      useLiveSuggestions = false,
      loading = false,
      children,
      elevation = Elevation.convex,
      surface = Surface.paper,
      ...props
    },
    ref
  ) => {
    const [suggestionsList, setSuggestionsList] = useState<string[]>([]);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number>(-1);

    const _leftIsland = useInputIsland(leftIsland, leftIcon, prefix, disabled);
    let _rightIsland = useInputIsland(rightIsland, rightIcon, suffix, disabled);

    if (loading) {
      _rightIsland = (
        <div className="alt-text-input__loading">
          <Loading size={size} />
        </div>
      );
    }

    const inputRef = useRef<HTMLInputElement | null>(null);
    const cancelNextSuggestionCheck = useRef(false);
    const shadowRef = useRef<HTMLDivElement>(null);
    const [liveSuggestionsBoundaries, setLiveSuggestionsBoundaries] = useState<[number, number]>([
      0, 0
    ]);

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

    const liveSuggestionLabel = useMemo(() => {
      if (!suggestionsList.length || !useLiveSuggestions || !props.value.trim()) {
        return '';
      }

      const fullLabel = suggestionsList[selectedSuggestionIndex > -1 ? selectedSuggestionIndex : 0];
      return fullLabel.replace(props.value, '');
    }, [suggestionsList, selectedSuggestionIndex, props.value, useLiveSuggestions]);

    const closeSuggestionsPopup = useCallback(() => {
      setSuggestionsList(NO_SUGGESTIONS);
      setSelectedSuggestionIndex(-1);
    }, []);

    const onTextInputKeyPress = useCallback<KeyboardEventHandler<HTMLInputElement>>(
      (e) => {
        if (e.key === 'ArrowUp') {
          setSelectedSuggestionIndex((old) => {
            return old > 0 ? old - 1 : old;
          });
        } else if (e.key === 'ArrowDown') {
          setSelectedSuggestionIndex((old) => {
            return old < suggestionsList.length - 1 ? old + 1 : old;
          });
        } else if (e.key === 'Enter') {
          setSelectedSuggestionIndex((old) => {
            cancelNextSuggestionCheck.current = true;
            onChange(suggestionsList[old]);
            setSuggestionsList(NO_SUGGESTIONS);

            return -1;
          });
        } else if (e.key === 'Tab') {
          if (liveSuggestionLabel) {
            e.preventDefault();
            setSelectedSuggestionIndex((old) => {
              cancelNextSuggestionCheck.current = true;
              onChange(suggestionsList[old < 0 ? 0 : old]);
              setSuggestionsList(NO_SUGGESTIONS);

              return -1;
            });
          }
        }
      },
      [suggestionsList, onChange, liveSuggestionLabel]
    );

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

    useEffect(() => {
      if (cancelNextSuggestionCheck.current) {
        cancelNextSuggestionCheck.current = false;
        return;
      }

      if (
        !props.value?.trim() ||
        suggestions.length === 0 ||
        !inputRef.current ||
        document.activeElement !== inputRef.current
      ) {
        setSuggestionsList(NO_SUGGESTIONS);
        setSelectedSuggestionIndex(-1);
        return;
      }

      setSuggestionsList(
        suggestions.filter((suggestion) => {
          return suggestion.toLowerCase().startsWith(props.value.trim().toLowerCase());
        })
      );
      setSelectedSuggestionIndex(-1);
    }, [suggestions, props.value]);

    useEffect(() => {
      if (!liveSuggestionLabel || !shadowRef.current || !inputRef.current || !props.value) {
        return;
      }

      const shadowRefRect = shadowRef.current.getBoundingClientRect();
      const inputRefRect = inputRef.current?.getBoundingClientRect();

      setLiveSuggestionsBoundaries([
        shadowRefRect.width + leftIslandWidth,
        inputRefRect.width - shadowRefRect.width - rightIslandWidth - leftIslandWidth - 12
      ]);
    }, [props.value, liveSuggestionLabel, leftIslandWidth, rightIslandWidth]);

    return (
      <BasicInput hintText={hintText} errorText={errorText} disabled={disabled} size={size}>
        <div
          className={clsx('alt-text-input', className, {
            'alt-text-input--required': required,
            'alt-text-input--disabled': disabled,
            [`alt-text-input--surface-${surface}`]: surface !== Surface.paper
          })}
          data-testid="text-input">
          {Component || (
            <input
              className={clsx('alt-text-input__control', classNames.control, {
                [`alt-text-input__control--elevation-${elevation}`]: elevation
              })}
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
              onKeyDownCapture={onTextInputKeyPress}
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
          {useLiveSuggestions && !!liveSuggestionLabel && (
            <>
              <div className="alt-live-suggestion__shadowText" ref={shadowRef}>
                {props.value.replace(/\s$/g, '-')}
              </div>
              <div
                className="alt-live-suggestion"
                style={{
                  left: liveSuggestionsBoundaries[0] + 'px',
                  width: liveSuggestionsBoundaries[1] + 'px'
                }}>
                <span
                  className="alt-live-suggestion__text"
                  data-testid="alt-test-textInput-liveSuggestion">
                  {liveSuggestionLabel}
                </span>
                <span className="alt-live-suggestion__tabIcon">
                  <Icon i="keyboard_tab" />
                </span>
              </div>
            </>
          )}
          {children}
        </div>
        {suggestionsList.length > 0 && (
          <FloatingBox
            className="alt-text-input__suggestions"
            targetElement={inputRef.current}
            onClose={closeSuggestionsPopup}
            placement="bottom"
            useParentWidth
            useRootContainer
            maxHeight={300}>
            <ContextMenu
              onClose={closeSuggestionsPopup}
              menu={suggestionsList.map((item, itemIndex) => ({
                title: item,
                value: item,
                onClick: () => onChange(item),
                selected: itemIndex === selectedSuggestionIndex
              }))}
              maxHeight={288}
              fluid
            />
          </FloatingBox>
        )}
      </BasicInput>
    );
  }
);

TextInput.displayName = 'TextInput';

export default memo(TextInput) as typeof TextInput;
