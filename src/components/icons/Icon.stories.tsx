import {withAltrone} from "../../hocs";
import {Theme} from "../../types";
import {Icon} from "./index";
import {ButtonStyle} from "../button/Button/Button";
import {ButtonExample} from "../button/Button.stories";

const Template = ({component, dark, ...args}) => {
  return withAltrone(component, {
    theme: dark ? Theme.dark : Theme.light
  })(args)
}

export const IconExample = Template.bind({})
IconExample.args = {
  component: Icon,
  i: 'face',
  size: 32,
  dark: false,
  style: 'outlined',
  padding: 0
}

IconExample.argTypes = {
  style: {
    control: 'select',
    options: ['outlined', 'rounded', 'sharp']
  }
}

export default {
  component: IconExample,
  title: 'Icons',
}