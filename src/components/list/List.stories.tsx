import {withAltrone} from "../../hocs";
import {Chips} from "./Chips";
import {Direction, Theme} from "../../types";

const Template = ({component, dark, leftIcon, rightIcon, ...args}) => {
  return withAltrone(component, {
    theme: dark ? Theme.dark : Theme.light
  })({
    ...args,
  })
}

export const ChipsExample = Template.bind({})
ChipsExample.args = {
  component: Chips,
  options: [{
    label: 'North America',
    value: 0
  }, {
    label: 'South America',
    value: 1
  }, {
    label: 'Europe',
    value: 2
  }, {
    label: 'Asia',
    value: 3
  }, {
    label: 'Africa',
    value: 4
  }, {
    label: 'Australia',
    value: 5
  }],
  value: [1, 3],
  dark: false,
}
ChipsExample.argTypes = {
  direction: {
    control: 'select',
    options: [Direction.horizontal, Direction.vertical]
  }
}

export default {
  component: ChipsExample,
  title: 'Lists',
}