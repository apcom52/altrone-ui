import {withAltrone} from "../../hocs";
import {Theme} from "../../types";
import {Button} from "./Button";
import {ButtonSize, ButtonStyle, ButtonVariant} from "./Button/Button";
import {Icon} from "../icons";

const Template = ({component, dark, leftIcon, rightIcon, ...args}) => {
  const _leftIcon = leftIcon ? <Icon i={leftIcon} /> : null
  const _rightIcon = rightIcon ? <Icon i={rightIcon} /> : null

  return withAltrone(component, {
    theme: dark ? Theme.dark : Theme.light
  })({
    ...args,
    leftIcon: _leftIcon,
    rightIcon: _rightIcon
  })
}

export const ButtonExample = Template.bind({})
ButtonExample.args = {
  component: Button,
  children: 'Action button',
  disabled: false,
  style: ButtonStyle.default,
  size: ButtonSize.medium,
  leftIcon: '',
  rightIcon: '',
  href: '',
  dark: false,
  fluid: false,
}

ButtonExample.argTypes = {
  style: {
    control: 'select',
    options: [ButtonStyle.default, ButtonStyle.primary, ButtonStyle.success, ButtonStyle.danger]
  },
  variant: {
    control: 'select',
    options: [ButtonVariant.default, ButtonVariant.borders, ButtonVariant.transparent, ButtonVariant.text]
  },
  size: {
    control: 'select',
    options: ['small', 'medium', 'large', 'xlarge']
  }
}

export default {
  component: ButtonExample,
  title: 'Button',
  parameters: {
    style: [
      { name: 'default', value: ButtonStyle.default },
      { name: 'primary', value: ButtonStyle.primary },
      { name: 'success', value: ButtonStyle.success },
      { name: 'danger', value: ButtonStyle.danger },
    ]
  }
}