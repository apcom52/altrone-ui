import { StoryObj } from '@storybook/react';
import { Button, ButtonVariant } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { Icon } from '../../../typography';
import { ButtonContainer } from '../../../containers';

export const TextButtonStory: StoryObj<typeof Button> = {
  storyName: 'Text variant',
  render: ({ ...args }) => {
    return (
      <ButtonContainer>
        <Button {...args} variant={ButtonVariant.text} />
        <Button {...args} variant={ButtonVariant.text} isIcon>
          <Icon i="add" />
        </Button>
        <Button {...args} variant={ButtonVariant.text} leftIcon={<Icon i="search" />} />
        <Button {...args} variant={ButtonVariant.text} rightIcon={<Icon i="search" />} />
        <Button
          {...args}
          variant={ButtonVariant.text}
          leftIcon={<Icon i="add" />}
          rightIcon={<Icon i="search" />}
        />
      </ButtonContainer>
    );
  },
  decorators: [StorybookDecorator]
};
