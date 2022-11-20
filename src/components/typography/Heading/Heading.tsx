import {WithAltroneOffsets, WithoutDefaultOffsets} from "../../../types";
import {memo} from "react";
import {Box} from "../../containers/Box";
import './heading.scss'
import clsx from "clsx";

interface HeadingProps extends WithoutDefaultOffsets, WithAltroneOffsets {
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

const Heading = ({ children, level = 1, ...props }: HeadingProps) => {
  const tagName = `h${level >= 1 && level <= 6 ? level : 1}` as keyof JSX.IntrinsicElements

  return <Box
    tagName={tagName}
    className={clsx('alt-heading', `alt-heading--level-${level}`, props.className)}
    {...props}
  >
    {children}
  </Box>
}

export default memo(Heading)