import { StoryObj } from '@storybook/react';
import { Button, ButtonVariant } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { Icon } from '../../../icons';
import { ButtonContainer } from '../../../containers';

export const BorderedButtonStory: StoryObj<typeof Button> = {
  storyName: 'Bordered variant',
  render: ({ ...args }) => {
    return (
      <ButtonContainer>
        <Button {...args} variant={ButtonVariant.borders} />
        <Button {...args} variant={ButtonVariant.borders} isIcon>
          <Icon i="add" />
        </Button>
        <Button {...args} variant={ButtonVariant.borders} leftIcon={<Icon i="search" />} />
        <Button {...args} variant={ButtonVariant.borders} rightIcon={<Icon i="search" />} />
        <Button
          {...args}
          variant={ButtonVariant.borders}
          leftIcon={<Icon i="add" />}
          rightIcon={<Icon i="search" />}
        />
      </ButtonContainer>
    );
  },
  decorators: [StorybookDecorator]
};
