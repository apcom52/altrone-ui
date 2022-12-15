import {WithAltroneOffsets, WithoutDefaultOffsets} from "../../../types";
import {memo} from "react";
import {Box} from "../../containers/Box";
import './paragraph.scss'
import clsx from "clsx";

interface ParagraphProps extends WithoutDefaultOffsets, WithAltroneOffsets {}

const Paragraph = ({ children, className, ...props }: ParagraphProps) => {
  return <Box
    tagName='p'
    className={clsx('alt-paragraph', className)}
    {...props}
  >
    {children}
  </Box>
}

export default memo(Paragraph)