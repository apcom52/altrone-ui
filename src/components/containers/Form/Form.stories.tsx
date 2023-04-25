import { Meta } from '@storybook/react';
import { Form } from './index';

export { DefaultFormStory, LinearFormStory, RowFormStory, FormGroupStory } from './stories';

const meta: Meta<typeof Form> = {
  component: Form,
  title: 'Containers/Form',
  tags: ['autodocs'],
  args: {},
  argTypes: {}
};

export default meta;
