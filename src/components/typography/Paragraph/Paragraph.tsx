import {WithAltroneOffsets, WithoutDefaultOffsets} from "../../../types";
import {memo} from "react";
import {Box} from "../../containers/Box";

interface ParagraphProps extends WithoutDefaultOffsets, WithAltroneOffsets {}

const Blockquote = ({ children, ...props }: ParagraphProps) => {
  return <Box
    tagName='p'
    {...props}
  >
    {children}
  </Box>
}

export default memo(Blockquote)