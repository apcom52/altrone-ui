import { StoryObj } from '@storybook/react';
import { Button, ButtonVariant } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { ButtonContainer } from '../../../containers';
import { Icon } from '../../../typography';

export const DefaultButtonStory: StoryObj<typeof Button> = {
  name: 'Default Button',
  storyName: 'Default DataTable',
  render: ({ ...args }) => {
    return (
      <ButtonContainer>
        <Button {...args} variant={ButtonVariant.default} />
        <Button {...args} variant={ButtonVariant.default} isIcon>
          <Icon i="add" />
        </Button>
        <Button {...args} variant={ButtonVariant.default} leftIcon={<Icon i="search" />} />
        <Button {...args} variant={ButtonVariant.default} rightIcon={<Icon i="search" />} />
        <Button
          {...args}
          variant={ButtonVariant.default}
          leftIcon={<Icon i="add" />}
          rightIcon={<Icon i="search" />}
        />
        <Button
          {...args}
          variant={ButtonVariant.default}
          rightIcon={<Icon i="more_horiz" />}
          dropdown={[
            { title: 'Action 1', onClick: () => null },
            { title: 'Action 2', onClick: () => null },
            { title: 'Action 3', onClick: () => null }
          ]}>
          More actions
        </Button>
      </ButtonContainer>
    );
  },
  decorators: [StorybookDecorator]
};
