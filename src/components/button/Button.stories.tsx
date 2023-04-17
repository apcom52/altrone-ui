import { Altrone } from '../../hocs';
import { Role, Size, Theme } from '../../types';
import { Button, ButtonVariant } from './Button';
import { Icon } from '../icons';

const Template = ({
  Component,
  dark,
  leftIcon,
  rightIcon,
  indicator = false,
  indicatorPosition,
  indicatorValue,
  ...args
}) => {
  const _leftIcon = leftIcon ? <Icon i={leftIcon} /> : null;
  const _rightIcon = rightIcon ? <Icon i={rightIcon} /> : null;

  return (
    <Altrone theme={dark ? Theme.dark : Theme.light}>
      <Component
        {...args}
        leftIcon={_leftIcon}
        rightIcon={_rightIcon}
        indicator={
          indicator && {
            position: indicatorPosition,
            value: indicatorValue
          }
        }
      />
    </Altrone>
  );
};

export const ButtonExample = Template.bind({});
ButtonExample.args = {
  Component: Button,
  children: 'Action button',
  disabled: false,
  role: Role.default,
  size: Size.medium,
  leftIcon: '',
  rightIcon: '',
  href: '',
  dark: false,
  fluid: false,
  indicator: false,
  indicatorValue: '',
  indicatorPosition: 'corner',
  loading: false,
  progress: undefined
};

export const ButtonIconExample = Template.bind({});
ButtonIconExample.args = {
  Component: Button,
  children: <Icon i="check" />,
  disabled: false,
  leftIcon: '',
  rightIcon: '',
  href: '',
  dark: false,
  fluid: false,
  isIcon: true,
  loading: false,
  progress: undefined
};

export const ButtonDropdownExample = Template.bind({});
ButtonDropdownExample.args = {
  Component: Button,
  children: 'Button with dropdown actions',
  dark: false,
  loading: false,
  progress: undefined,
  dropdown: [
    {
      title: 'Settings',
      icon: <Icon i="settings" />,
      onClick: () => alert('action 1')
    },
    {
      title: 'Shopping cart with very long label',
      icon: <Icon i="add_shopping_cart" />,
      onClick: () => alert('action 2')
    },
    {
      title: 'Shopping cart with very long label very very very long label',
      icon: <Icon i="add_shopping_cart" />,
      hint: 'Ctrl+V',
      onClick: () => alert('action 2')
    },
    {
      title: 'Remove item',
      icon: <Icon i="delete" />,
      onClick: () => alert('action 2'),
      danger: true
    },
    {
      title: 'Log out',
      children: [
        {
          title: 'Shopping cart with very long label very very very long label',
          icon: <Icon i="add_shopping_cart" />,
          hint: 'Ctrl+V',
          onClick: () => alert('child action')
        },
        {
          title: 'Disabled item',
          onClick: () => null,
          disabled: true
        }
      ]
    }
  ]
};

ButtonExample.argTypes = {
  role: {
    control: 'select',
    options: [Role.default, Role.primary, Role.success, Role.danger]
  },
  variant: {
    control: 'select',
    options: [
      ButtonVariant.default,
      ButtonVariant.borders,
      ButtonVariant.transparent,
      ButtonVariant.text
    ]
  },
  size: {
    control: 'select',
    options: ['small', 'medium', 'large']
  },
  indicatorPosition: {
    control: 'select',
    options: ['corner', 'baseline']
  }
};

ButtonIconExample.argTypes = {
  role: {
    control: 'select',
    options: [Role.default, Role.primary, Role.success, Role.danger]
  },
  variant: {
    control: 'select',
    options: [
      ButtonVariant.default,
      ButtonVariant.borders,
      ButtonVariant.transparent,
      ButtonVariant.text
    ]
  },
  size: {
    control: 'select',
    options: ['small', 'medium', 'large']
  }
};

// export const ButtonVariantsExample = (args) => <ButtonVariantsStory {...args} />;
// ButtonVariantsExample.argTypes = {
//   dark: {
//     control: 'switcher'
//   }
// };

export default {
  component: ButtonExample,
  title: 'Actions',
  decorators: [
    (Story) => (
      <Altrone>
        <Story />
      </Altrone>
    )
  ]
};
