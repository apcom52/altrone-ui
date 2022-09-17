import {withAltrone} from "../../hocs";
import {Theme} from "../../types";
import {Button} from "./Button";

const Template = ({component, dark, ...args}) => {
  return withAltrone(component, {
    theme: dark ? Theme.dark : Theme.light
  })(args)
}

export const ButtonExample = Template.bind({})
ButtonExample.args = {
  component: Button,
  children: 'Action button',
  dark: false
}

export default {
  component: ButtonExample,
  title: 'Button'
}