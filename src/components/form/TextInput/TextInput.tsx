import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { InputComponentProps, TextInputProps, TextInputRef } from './TextInput.types';
import { BasicInput } from '../BasicInput';
import { Input } from './components';
import { Popover } from '../../containers';
import { PopoverRef } from '../../containers/Popover/Popover.types';
import { useResizeObserver } from '../../../hooks';

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

    return [left, right];
  }, [children]);

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
    className,
    onFocus,
    onBlur,
    style: {
      paddingLeft: leftIslands.length ? leftIslandsContainerRef.current?.offsetWidth + 'px' : '8px',
      paddingRight: rightIslands.length
        ? rightIslandsContainerRef.current?.offsetWidth + 'px'
        : '8px'
    },
    ...restProps
  };

  return (
    <BasicInput className="alt-text-input">
      <div className="alt-text-input__container">
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
