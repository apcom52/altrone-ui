import { Meta } from '@storybook/react';
import { Button } from './index';
import { SB_ROLES, SB_SIZE } from '../../../storybook/Storybook.constants';
import { Role, Size } from '../../../types';

export {
  DefaultButtonStory,
  BorderedButtonStory,
  TransparentButtonStory,
  TextButtonStory
} from './stories';

/**
 * This component is used to make clickable actions on the page
 */
const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Forms/Button',
  tags: ['autodocs'],
  args: {
    children: 'Action',
    role: Role.default,
    size: Size.medium,
    fluid: false,
    loading: false,
    progress: undefined
  },
  argTypes: {
    children: { description: 'Content of the button' },
    onClick: { description: 'Callback fires when user clicks on the button' },
    role: { control: 'select', options: SB_ROLES, description: 'Role of the button' },
    variant: { control: false, description: 'Variant of style' },
    href: { description: 'Makes button as a link' },
    target: { description: 'Change target attribute for link-button' },
    fluid: { description: 'If true the button will take full width of the parent component. ' },
    leftIcon: { control: false, description: 'Adds an icon to the left side of the button' },
    rightIcon: { control: false, description: 'Adds an icon to the right side of the button' },
    size: { control: 'select', options: SB_SIZE, description: 'Size of the button' },
    dropdown: { description: 'If passed shows a dropdown when user clicked on the button' },
    isIcon: {
      description:
        'Use this prop in cases when your children contains only icon to correct styles for the button'
    },
    indicator: { description: 'Adds indicator to the button' },
    loading: { description: 'Hides button content and show loading animation' },
    progress: { description: 'Shows a thin progress bar below the button content' },
    disabled: { description: 'Marks the button as disabled' },
    type: { description: 'Change type of the button. This changes type attribute for button tag' },
    elevation: { control: 'select', description: 'Shadows of the button' },
    className: { description: 'Custom CSS class' }
  }
};

export default meta;
