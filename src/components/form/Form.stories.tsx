import {withAltrone} from "../../hocs";
import {Theme} from "../../types";
import {TextInput} from "./index";
import {Icon} from "../icons";
import {InputIslandType} from "./TextInput/TextInput";

const Template = ({component, dark, ...args}) => {
  return withAltrone(component, {
    theme: dark ? Theme.dark : Theme.light
  })(args)
}

export const TextInputExample = Template.bind({})
TextInputExample.args = {
  component: TextInput,
  placeholder: 'Type something',
  dark: false
}

export const TextInputWithLeftIslandExample = Template.bind({})
TextInputWithLeftIslandExample.args = {
  component: TextInput,
  placeholder: 'Type something',
  prefix: 'search:',
  dark: false
}

export const TextInputWithRightIslandExample = Template.bind({})
TextInputWithRightIslandExample.args = {
  component: TextInput,
  placeholder: 'Type something',
  rightIcon: <Icon i='search' />,
  dark: false
}

export const TextInputWithBothIslandsExample = Template.bind({})
TextInputWithBothIslandsExample.args = {
  component: TextInput,
  placeholder: 'Type something',
  leftIsland: {
    type: InputIslandType.components,
    content: <b>{'q>:'}</b>
  },
  rightIsland: {
    type: InputIslandType.actions,
    content: [{
      title: 'Decrease',
      icon: <Icon i='keyboard_arrow_down' />,
      onClick: () => alert('Decrease clicked')
    }, {
      title: 'Increase',
      icon: <Icon i='keyboard_arrow_up' />,
      onClick: () => alert('Increase clicked')
    }]
  },
  dark: false
}

export default {
  component: TextInputExample,
  title: 'Forms',
}