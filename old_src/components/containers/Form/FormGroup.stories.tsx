import { Meta } from '@storybook/react';
import { FormGroup, FormGroupVariant } from './index';
import { Align } from '../../../types';

export { FormGroupStory } from './stories';

const meta: Meta<typeof FormGroup> = {
  component: FormGroup,
  title: 'Containers/Form/FormGroup',
  tags: ['autodocs'],
  args: {
    variant: FormGroupVariant.default,
    align: Align.start
  },
  argTypes: {
    variant: { control: 'select', description: 'Variant of the group' },
    align: { control: 'select', description: 'Alignment of the group' },
    weights: {
      control: 'array',
      description:
        'The width of the child elements. Numbers set flex-grow property for every child element. '
    }
  }
};

export default meta;
