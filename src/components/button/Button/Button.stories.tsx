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

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Actions/Button',
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
    role: { control: 'select', options: SB_ROLES },
    size: { control: 'select', options: SB_SIZE },
    variant: { control: false },
    leftIcon: { control: false },
    rightIcon: { control: false },
    elevation: { control: 'select' }
  }
};

export default meta;
