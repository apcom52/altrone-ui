import {forwardRef, memo, useEffect, useRef, useState} from "react";
import {Size, WithAltroneOffsets, WithoutDefaultOffsets} from "../../../types";
import './text-input.scss';
import clsx from "clsx";
import {useInputIsland} from "./useInputIsland";
import {useBoundingclientrect} from "rooks";
import {BasicInput} from "../BasicInput";

export enum InputIslandType {
  text,
  icon,
  actions,
  components
}

export interface InputIslandAction {
  title: string
  icon: JSX.Element,
  onClick: () => void
  disabled?: boolean
}

export interface InputIsland {
  type: InputIslandType
  content: string | JSX.Element | JSX.Element[] | InputIslandAction[]
}

export interface TextInputProps extends Omit<WithoutDefaultOffsets<React.HTMLProps<HTMLInputElement>>, 'onChange' | 'size'>, WithAltroneOffsets {
  onChange: (value: string) => void
  classNames?: {
    control?: string
  }
  leftIsland?: InputIsland
  rightIsland?: InputIsland
  prefix?: string
  suffix?: string
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
  errorText?: string
  hintText?: string
  size?: Size
  Component?: JSX.Element
}

const DEFAULT_HORIZONTAL_PADDING = 12
const DEFAULT_ISLAND_OFFSET = 8

const TextInput = forwardRef<HTMLInputElement>(({
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
  ...props
}: TextInputProps, ref) => {
  const _leftIsland = useInputIsland(leftIsland, leftIcon, prefix, disabled)
  const _rightIsland = useInputIsland(rightIsland, rightIcon, suffix, disabled)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const leftIslandRef = useRef<HTMLDivElement>(null)
  const rightIslandRef = useRef<HTMLDivElement>(null)

  const { left: wrapperLeft = 0, right: wrapperRight = 0 } = useBoundingclientrect(wrapperRef) || {}
  const { width: leftIslandWidth = 0 } = useBoundingclientrect(leftIslandRef) || {}
  const { width: rightIslandWidth = 0  } = useBoundingclientrect(rightIslandRef) || {}

  const [leftPadding, setLeftPadding] = useState(DEFAULT_HORIZONTAL_PADDING)
  const [rightPadding, setRightPadding] = useState(DEFAULT_HORIZONTAL_PADDING)

  useEffect(() => {
    if (_leftIsland) {
      setLeftPadding(leftIslandWidth + DEFAULT_ISLAND_OFFSET)
    } else {
      setLeftPadding(DEFAULT_HORIZONTAL_PADDING)
    }
  }, [_leftIsland, leftIslandWidth, wrapperLeft, size])

  useEffect(() => {
    if (_rightIsland) {
      setRightPadding(DEFAULT_ISLAND_OFFSET + rightIslandWidth)
    } else {
      setRightPadding(DEFAULT_HORIZONTAL_PADDING)
    }
  }, [_rightIsland, rightIslandWidth, wrapperRight, size])

  return <BasicInput
    hintText={hintText}
    errorText={errorText}
    disabled={disabled}
    size={size}
  >
    <div className={clsx('alt-text-input', {
      'alt-text-input--required': required,
      'alt-text-input--disabled': disabled,
    })} data-testid='text-input'>
      {Component || <input
        className={clsx('alt-text-input__control', classNames.control)}
        style={{
          ...style,
          paddingLeft: leftPadding,
          paddingRight: rightPadding
        }}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        ref={ref}
        {...props}
      />}
      { _leftIsland && <div className='alt-text-input__left-island' ref={leftIslandRef}>{_leftIsland}</div> }
      { _rightIsland && <div className='alt-text-input__right-island' ref={rightIslandRef}>{_rightIsland}</div> }

      {required && <div className='alt-text-input__required-mark'>*</div>}
    </div>
  </BasicInput>
})

export default memo(TextInput)