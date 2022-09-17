import {withAltrone} from "../../hocs";
import {Theme} from "../../types";
import {Button} from "./Button";
import {ButtonStyle, ButtonVariant} from "./Button/Button";

const Template = ({component, dark, ...args}) => {
  return withAltrone(component, {
    theme: dark ? Theme.dark : Theme.light
  })(args)
}

export const ButtonExample = Template.bind({})
ButtonExample.args = {
  component: Button,
  children: 'Action button',
  disabled: false,
  style: ButtonStyle.default,
  dark: false
}

ButtonExample.argTypes = {
  style: {
    control: 'select',
    options: [ButtonStyle.default, ButtonStyle.primary, ButtonStyle.success, ButtonStyle.danger]
  },
  variant: {
    control: 'select',
    options: [ButtonVariant.default, ButtonVariant.borders, ButtonVariant.transparent, ButtonVariant.text]
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