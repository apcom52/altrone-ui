import {memo} from "react";
import {WithAltroneOffsets, WithoutDefaultOffsets} from "../../../types";

interface TextInputProps extends WithoutDefaultOffsets<React.HTMLProps<HTMLInputElement>>, WithAltroneOffsets {

}

const TextInput = ({...props}: TextInputProps) => {
  return <input {...props} />
}

export default memo(TextInput)