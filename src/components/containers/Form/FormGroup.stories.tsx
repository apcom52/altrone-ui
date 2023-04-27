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
    variant: { control: 'select' },
    align: { control: 'select' },
    weights: { control: 'array' }
  }
};

export default meta;
