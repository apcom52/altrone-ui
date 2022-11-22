import {withAltrone} from "../../hocs";
import {Role, Size, Theme} from "../../types";
import {Button} from "./Button";
import {ButtonVariant} from "./Button/Button";
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
  role: Role.default,
  size: Size.medium,
  leftIcon: '',
  rightIcon: '',
  href: '',
  dark: false,
  fluid: false,
}

export const ButtonIconExample = Template.bind({})
ButtonIconExample.args = {
  component: Button,
  children: <Icon i='check' />,
  disabled: false,
  leftIcon: '',
  rightIcon: '',
  href: '',
  dark: false,
  fluid: false,
  isIcon: true
}

export const ButtonDropdownExample = Template.bind({})
ButtonDropdownExample.args = {
  component: Button,
  children: 'Button with dropdown actions',
  dark: false,
  dropdown: [{
    title: 'Settings',
    icon: <Icon i='settings' />,
    onClick: () => alert('action 1')
  }, {
    title: 'Shopping cart with very long label',
    icon: <Icon i='add_shopping_cart' />,
    onClick: () => alert('action 2')
  }, {
    title: 'Shopping cart with very long label very very very long label',
    icon: <Icon i='add_shopping_cart' />,
    hint: 'Ctrl+V',
    onClick: () => alert('action 2')
  }, {
    title: 'Remove item',
    icon: <Icon i='delete' />,
    onClick: () => alert('action 2'),
    danger: true
  }, {
    title: 'Log out',
    children: [{
      title: 'Shopping cart with very long label very very very long label',
      icon: <Icon i='add_shopping_cart' />,
      hint: 'Ctrl+V',
      onClick: () => alert('child action'),
    }, {
      title: 'Disabled item',
      onClick: () => null,
      disabled: true
    }]
  }]
}

ButtonExample.argTypes = {
  role: {
    control: 'select',
    options: [Role.default, Role.primary, Role.success, Role.danger]
  },
  variant: {
    control: 'select',
    options: [ButtonVariant.default, ButtonVariant.borders, ButtonVariant.transparent, ButtonVariant.text]
  },
  size: {
    control: 'select',
    options: ['small', 'medium', 'large']
  }
}

ButtonIconExample.argTypes = {
  role: {
    control: 'select',
    options: [Role.default, Role.primary, Role.success, Role.danger]
  },
  variant: {
    control: 'select',
    options: [ButtonVariant.default, ButtonVariant.borders, ButtonVariant.transparent, ButtonVariant.text]
  },
  size: {
    control: 'select',
    options: ['small', 'medium', 'large']
  }
}

export default {
  component: ButtonExample,
  title: 'Button',
}