import { Meta } from '@storybook/react';
import { Message } from './index';
import Icon from '../Icon/Icon';
import { Role } from '../../../types';
import { Paragraph } from '../Paragraph';

export { DefaultMessageStory } from './stories';

const meta: Meta<typeof Message> = {
  component: Message,
  title: 'Typography/Message',
  tags: ['autodocs'],
  args: {
    title: 'Information',
    role: Role.default,
    IconComponent: <Icon i="info" />,
    children: (
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aspernatur beatae dicta
        dolor dolore nihil numquam optio quaerat, quia quibusdam quidem ratione reiciendis sapiente
        similique sit, tempora veritatis? Delectus, nulla?
      </Paragraph>
    )
  },
  argTypes: {
    title: { description: 'Title of the message' },
    role: {
      control: 'select',
      description: 'Role of the message. Changes background and foreground colors of the message'
    },
    IconComponent: { description: 'Icon of the message' },
    className: { description: 'Custom CSS class' },
    elevation: { control: 'select', description: 'Shadows of your message' }
  }
};

export default meta;
