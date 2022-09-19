import {memo, useMemo} from "react";
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

interface InputIslandAction {
  title: string
  icon: JSX.Element,
  onClick: () => void
  disabled?: boolean
}

interface InputIsland {
  type: InputIslandType
  content: string | JSX.Element | JSX.Element[] | InputIslandAction[]
}

interface TextInputProps extends WithoutDefaultOffsets<React.HTMLProps<HTMLInputElement>>, WithAltroneOffsets {
  classNames?: {
    control?: string
  }
  leftIsland?: InputIsland
  rightIsland?: InputIsland
  prefix?: string
  suffix?: string
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
}

const TextInput = ({ className, classNames = {}, prefix, leftIcon, leftIsland, suffix, rightIcon, rightIsland, ...props}: TextInputProps) => {
  const _leftIsland = useInputIsland(leftIsland, leftIcon, prefix)
  const _rightIsland = useInputIsland(rightIsland, rightIcon, suffix)

  console.log('left', _leftIsland);
  console.log('right', _rightIsland);

  return <div className={clsx('alt-text-input', className)}>
    <input
      className={clsx('alt-text-input__control', classNames.control)}
      {...props}
    />
    { _leftIsland && <div className='alt-text-input__left-island'>{_leftIsland}</div> }
    { _rightIsland && <div className='alt-text-input__right-island'>{_rightIsland}</div> }
  </div>
}

export default memo(TextInput)