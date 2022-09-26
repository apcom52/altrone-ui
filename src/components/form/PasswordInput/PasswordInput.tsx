import {InputIslandType, TextInput, TextInputProps} from "../index";
import {memo, useCallback, useState} from "react";
import {Icon} from "../../icons";

interface PasswordInputProps extends TextInputProps {
  showControls?: boolean
}

const PasswordInput = ({ showControls = true, rightIsland, ...props }: PasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisible = useCallback(() => {
    setIsPasswordVisible(old => !old)
  }, [])

  return <TextInput
    {...props}
    type={isPasswordVisible ? 'text' : 'password'}
    rightIsland={showControls
      ? {
        type: InputIslandType.actions,
        content: [{
          title: isPasswordVisible ? 'Hide password' : 'Show password',
          icon: isPasswordVisible ? <Icon i='visibility_off' /> : <Icon i='visibility' />,
          onClick: togglePasswordVisible
        }]
      }
      : rightIsland}
  />
}

export default memo(PasswordInput)
