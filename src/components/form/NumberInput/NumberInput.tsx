import {InputIslandType, TextInput, TextInputProps} from "../index";
import {memo} from "react";
import NumberInputCounter from "./NumberInputCounter";

interface NumberInputProps extends TextInputProps<number> {
  showControls?: boolean
}

const NumberInput = ({ value = 0, showControls = true, rightIsland, ...props }: NumberInputProps) => {
  return <TextInput
    value={value}
    {...props}
    rightIsland={{
      type: InputIslandType.components,
      content: <NumberInputCounter />
    }}
    type='number'
  />
}

export default memo(NumberInput)
