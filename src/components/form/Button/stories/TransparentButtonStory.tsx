import { StoryObj } from '@storybook/react';
import { Button, ButtonVariant } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { Icon } from '../../../typography';
import { ButtonContainer } from '../../../containers';

export const TransparentButtonStory: StoryObj<typeof Button> = {
  storyName: 'Transparent variant',
  render: ({ ...args }) => {
    return (
      <ButtonContainer>
        <Button {...args} variant={ButtonVariant.transparent} />
        <Button {...args} variant={ButtonVariant.transparent} isIcon>
          <Icon i="add" />
        </Button>
        <Button {...args} variant={ButtonVariant.transparent} leftIcon={<Icon i="search" />} />
        <Button {...args} variant={ButtonVariant.transparent} rightIcon={<Icon i="search" />} />
        <Button
          {...args}
          variant={ButtonVariant.transparent}
          leftIcon={<Icon i="add" />}
          rightIcon={<Icon i="search" />}
        />
      </ButtonContainer>
    );
  },
  decorators: [StorybookDecorator]
};
