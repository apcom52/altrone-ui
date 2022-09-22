import {memo, useEffect, useMemo, useRef, useState} from "react";
import {WithAltroneOffsets, WithoutDefaultOffsets} from "../../../types";
import './text-input.scss';
import clsx from "clsx";
import {useInputIsland} from "./useInputIsland";

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

export interface TextInputProps extends WithoutDefaultOffsets<React.HTMLProps<HTMLInputElement>>, WithAltroneOffsets {
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
}

const TextInput = ({
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
  ...props
}: TextInputProps) => {
  const _leftIsland = useInputIsland(leftIsland, leftIcon, prefix)
  const _rightIsland = useInputIsland(rightIsland, rightIcon, suffix)

  const leftIslandRef = useRef<HTMLDivElement>(null)
  const rightIslandRef = useRef<HTMLDivElement>(null)

  const [leftPadding, setLeftPadding] = useState(12)
  const [rightPadding, setRightPadding] = useState(12)

  useEffect(() => {
    if (leftIslandRef.current) {
      const leftIslandRect = leftIslandRef.current.getBoundingClientRect()
      setLeftPadding(8 + leftIslandRect.width + 8)
    } else {
      setLeftPadding(12)
    }
  }, [_leftIsland, leftIslandRef.current])

  useEffect(() => {
    if (rightIslandRef.current) {
      const rightIslandRect = rightIslandRef.current.getBoundingClientRect()
      setRightPadding(8 + rightIslandRect.width + 8)
    } else {
      setRightPadding(12)
    }
  }, [_rightIsland, rightIslandRef.current])

  return <div
    className={clsx('alt-text-input', className, {
      'alt-text-input--invalid': errorText,
      'alt-text-input--required': required,
    })}
  >
    <input
      className={clsx('alt-text-input__control', classNames.control)}
      {...props}
      style={{
        ...style,
        paddingLeft: leftPadding,
        paddingRight: rightPadding
      }}
      {...props}
    />
    { _leftIsland && <div className='alt-text-input__left-island' ref={leftIslandRef}>{_leftIsland}</div> }
    { _rightIsland && <div className='alt-text-input__right-island' ref={rightIslandRef}>{_rightIsland}</div> }
    {hintText && <div className='alt-text-input__hint-text'>{hintText}</div>}
    {errorText && <div className='alt-text-input__error-text'>{errorText}</div>}
    {required && <div className='alt-text-input__required-mark'>*</div>}
  </div>
}

export default memo(TextInput)