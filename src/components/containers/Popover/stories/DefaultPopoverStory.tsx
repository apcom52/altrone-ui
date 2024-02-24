import { StoryObj } from '@storybook/react';
import { Popover } from '../index';
import { StorybookBackgroundDecorator } from '../../../../storybook/StorybookPlayground';
import { Button, TextInput } from '../../../form';
import { ButtonContainer } from '../../ButtonContainer';

export const DefaultPopoverStory: StoryObj<typeof Popover> = {
  name: 'Default Floating Box',
  render: ({ ...args }) => {
    return (
      <ButtonContainer>
        <Popover
          content={
            <>
              <p>Hello, world!</p>
              <TextInput value="" onChange={() => null} />
            </>
          }
          trigger="click"
          title=""
          useRootContainer>
          <Button>Click here</Button>
        </Popover>
        <Popover
          content={<p>Hello, world!</p>}
          trigger="hover"
          title="Popover with hover trigger"
          useRootContainer>
          <Button>Hover on me</Button>
        </Popover>
        <Popover
          content={<p>Hello, world!</p>}
          trigger="focus"
          title="Popover with focus trigger"
          useRootContainer>
          <Button>Focus me</Button>
        </Popover>
      </ButtonContainer>
    );
  },
  decorators: [StorybookBackgroundDecorator]
};
