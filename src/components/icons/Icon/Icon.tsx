import {memo} from "react";
import './icon.scss'
import {Offset} from "../../../hooks/useOffset/useOffset";
import {Box} from "../../containers";
import clsx from "clsx";

type MaterialIconStyle = 'outlined' | 'rounded' | 'sharp';

interface IconProps {
  i: string
  size?: number
  className?: string
  margin?: Offset
  padding?: Offset
  style?: MaterialIconStyle
}

const Icon = ({i, size, className, style = 'outlined', ...props}: IconProps) => {
  return <Box
    tagName='span'
    className={clsx('alt-icon', `material-symbols-${style}`, className)}
    style={{ fontSize: size || '1em' }}
    {...props}
  >
    {i}
  </Box>
}

export default memo(Icon)