import {WithAltroneOffsets, WithoutDefaultOffsets} from "../../../types";
import {memo} from "react";
import {Box} from "../../containers/Box";

interface HeadingProps extends WithoutDefaultOffsets, WithAltroneOffsets {
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

const Heading = ({ children, level = 1, ...props }: HeadingProps) => {
  const tagName = `h${level}` as keyof JSX.IntrinsicElements

  return <Box
    tagName={tagName}
    {...props}
  >
    {children}
  </Box>
}

export default memo(Heading)