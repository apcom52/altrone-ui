import { StoryObj } from '@storybook/react';
import { ButtonContainer } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { Icon } from '../../../icons';
import { Button } from '../../../button';
import { Role } from '../../../../types';

export const DefaultButtonContainerStory: StoryObj<typeof ButtonContainer> = {
  name: 'Default Button',
  storyName: 'Default DataTable',
  render: ({ ...args }) => {
    return (
      <ButtonContainer {...args}>
        <Button leftIcon={<Icon i="add" />}>Create</Button>
        <Button leftIcon={<Icon i="edit" />}>Edit</Button>
        <Button leftIcon={<Icon i="delete" />} role={Role.danger}>
          Delete
        </Button>
      </ButtonContainer>
    );
  },
  decorators: [StorybookDecorator]
};
