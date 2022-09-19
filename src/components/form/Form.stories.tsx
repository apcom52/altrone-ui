import {withAltrone} from "../../hocs";
import {Theme} from "../../types";
import {TextInput} from "./index";

const Template = ({component, dark, ...args}) => {
  return withAltrone(component, {
    theme: dark ? Theme.dark : Theme.light
  })(args)
}

export const ControlExample = Template.bind({})
ControlExample.args = {
  component: TextInput,
  placeholder: 'Type something'
}

export default {
  component: ControlExample,
  title: 'Forms',
}