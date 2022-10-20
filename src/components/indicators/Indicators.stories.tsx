import {withAltrone} from "../../hocs";
import {Role, Size, Theme} from "../../types";
import {Progress} from "./Progress";
import {ProgressVariant} from "./Progress/Progress";

const Template = ({component, dark, ...args}) => {
  return withAltrone(component, {
    theme: dark ? Theme.dark : Theme.light
  })({
    ...args,
  })
}

export const ProgressExample = Template.bind({})
ProgressExample.args = {
  component: Progress,
  value: 30,
  max: 100,
  dark: false,
}
ProgressExample.argTypes = {
  variant: {
    control: 'select',
    options: [ProgressVariant.default, ProgressVariant.segmented]
  },
  size: {
    control: 'select',
    options: [Size.small, Size.medium, Size.large]
  },
  role: {
    control: 'select',
    options: [Role.default, Role.primary, Role.success, Role.danger]
  }
}

export default {
  component: ProgressExample,
  title: 'Indicators',
}