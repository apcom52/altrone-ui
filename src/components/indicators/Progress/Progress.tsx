import {memo} from "react";
import './progress.scss';
import {Size} from "../../../types";
import clsx from "clsx";

export enum ProgressVariant {
  default = 'default',
  segmented = 'segmented'
}

interface ProgressProps {
  value: number
  max?: number
  size?: Size
  danger?: boolean
}

const Progress = ({ variant = ProgressVariant.default, value = 0, max = 100, danger = false, size = Size.medium }) => {
  const percent = Math.round(value / max * 100)

  return <div className={clsx('alt-progress', {
    'alt-progress--size-small': size === Size.small,
    'alt-progress--size-large': size === Size.large,
    'alt-progress--variant-segmented': variant === ProgressVariant.segmented
  })}>
    {variant === ProgressVariant.default && <div
      className='alt-progress__active'
      style={{ width: percent + '%' }}
    />}
    {variant === ProgressVariant.segmented && (new Array(max).fill(0).map((_, segmentIndex) => {
      return <div className={clsx('alt-progress__segment', {
        'alt-progress__segment--active': segmentIndex < value
      })} key={segmentIndex}></div>
    }))}
  </div>
}

export default memo(Progress)