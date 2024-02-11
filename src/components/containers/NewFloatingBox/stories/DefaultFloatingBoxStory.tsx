import { StoryObj } from '@storybook/react';
import { FloatingBox } from '../index';
import { StorybookBackgroundDecorator } from '../../../../storybook/StorybookPlayground';
import { Button, TextInput } from '../../../form';
import { ButtonContainer } from '../../ButtonContainer';

export const DefaultFloatingBoxStory: StoryObj<typeof FloatingBox> = {
  name: 'Default Floating Box',
  render: ({ ...args }) => {
    return (
      <ButtonContainer>
        <FloatingBox
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
        </FloatingBox>
        <FloatingBox
          content={<p>Hello, world!</p>}
          trigger="hover"
          title="FloatingBox with hover trigger"
          useRootContainer>
          <Button>Hover on me</Button>
        </FloatingBox>
        <FloatingBox
          content={<p>Hello, world!</p>}
          trigger="focus"
          title="FloatingBox with focus trigger"
          useRootContainer>
          <Button>Focus me</Button>
        </FloatingBox>
      </ButtonContainer>
    );
  },
  decorators: [StorybookBackgroundDecorator]
};
