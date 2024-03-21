import React, {
  forwardRef,
  ReactElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { InputComponentProps, TextInputProps, TextInputRef } from './TextInput.types';
import { Input } from './components';
import { PopoverRef } from '../../containers/Popover/Popover.types';
import { useResizeObserver } from '../../../hooks';
import { TextInputIsland } from './TextInputIsland';
import { Loading } from '../../indicators';
import { Elevation, Size, Surface } from '../../../types';
import clsx from 'clsx';
import { BasicInput } from '../BasicInput';
import { Dropdown } from '../../containers/Dropdown';
import { DropdownMenuRef } from '../../containers/Dropdown/Dropdown.types';
import { Icon } from '../../typography';

const EMPTY_ARRAY: any[] = [];

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
    useLiveSuggestions = false,
    ...restProps
  } = props;

  const [suitableSuggestions, setSuitableSuggestions] = useState<ReactElement[]>(EMPTY_ARRAY);
  const [currentSelectedIndex, setCurrentSelectedIndex] = useState(-1);
  const [shadowInputWidth, setShadowInputWidth] = useState(0);
  const isOptionsWasSelectedFromSuggestions = useRef(false);

  const popoverRef = useRef<PopoverRef>(null);
  const dropdownMenuRef = useRef<DropdownMenuRef>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

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

  const onKeyDown: React.KeyboardEventHandler = (e) => {
    if (e.key === 'ArrowDown') {
      if (popoverRef?.current?.contentNode) {
        e.preventDefault();
        const menuElement: HTMLDivElement | null =
          popoverRef.current.contentNode?.querySelector('.alt-dropdown-item');
        if (menuElement) {
          menuElement.focus?.();
        }
      }
    } else if (e.key === 'Tab' && useLiveSuggestions && liveSuggestionLabel) {
      e.preventDefault();
      onChange(value + liveSuggestionLabel);
    }
  };

  const handleClickSuggestion = useCallback(
    (newValue: string) => {
      isOptionsWasSelectedFromSuggestions.current = true;
      onChange(newValue);
      setSuitableSuggestions(EMPTY_ARRAY);
    },
    [onChange]
  );

  const liveSuggestionLabel = useMemo(() => {
    if (!suitableSuggestions.length || !useLiveSuggestions || !props.value.trim()) {
      return '';
    }

    const fullLabelElement =
      suitableSuggestions[currentSelectedIndex > -1 ? currentSelectedIndex : 0];
    const fullLabel = fullLabelElement?.props?.label;
    return fullLabel.replace(props.value, '');
  }, [suitableSuggestions, props.value, useLiveSuggestions, currentSelectedIndex]);

  useEffect(() => {
    if (isOptionsWasSelectedFromSuggestions.current) {
      isOptionsWasSelectedFromSuggestions.current = false;
      return;
    }

    const _suitableSuggestions = suggestions
      .filter((suggestion) => {
        return suggestion.toLowerCase().startsWith(props.value.trim().toLowerCase());
      })
      .map((item, itemIndex) => {
        return (
          <Dropdown.Action
            key={item + itemIndex}
            label={item}
            onClick={() => handleClickSuggestion(item)}
          />
        );
      });

    setSuitableSuggestions(_suitableSuggestions);
  }, [suggestions, value]);

  useLayoutEffect(() => {
    setShadowInputWidth(shadowRef.current?.offsetWidth || 0);
  }, [value]);

  useEffect(() => {
    setShadowInputWidth(shadowRef.current?.offsetWidth || 0);
  }, [value]);

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
    <Dropdown
      enabled={suitableSuggestions.length > 0 && value.length > 0}
      ref={popoverRef}
      placement="bottom"
      trigger={['click', 'focus']}
      useFocusTrap={true}
      focusTrapTargets={['reference', 'content']}
      useParentWidth
      content={
        <Dropdown.Menu
          defaultFocusItemIndex={-1}
          onChangeFocusItemIndex={setCurrentSelectedIndex}
          ref={dropdownMenuRef}>
          {suitableSuggestions}
        </Dropdown.Menu>
      }>
      <Input key="textInput" ref={inputRef} {...inputProps} onKeyDown={onKeyDown} />
    </Dropdown>
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
        {useLiveSuggestions && (
          <div className="alt-live-suggestion__shadowText" ref={shadowRef}>
            {props.value.replace(/\s$/g, String.fromCharCode(160))}
          </div>
        )}
        {useLiveSuggestions && Boolean(liveSuggestionLabel) ? (
          <div
            className="alt-live-suggestion"
            style={{
              left: `${shadowInputWidth}px`,
              width: 'auto'
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
        ) : null}
      </div>
    </BasicInput>
  );
});
