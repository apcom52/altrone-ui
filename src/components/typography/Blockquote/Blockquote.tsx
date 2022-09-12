import {WithAltroneOffsets, WithoutDefaultOffsets} from "../../../types";
import {memo} from "react";
import {Box} from "../../containers/Box";

interface BlockquoteProps extends WithoutDefaultOffsets, WithAltroneOffsets {}

const Blockquote = ({ children, ...props }: BlockquoteProps) => {
  return <Box
    tagName='blockquote'
    {...props}
  >
    {children}
  </Box>
}

export default memo(Blockquote)