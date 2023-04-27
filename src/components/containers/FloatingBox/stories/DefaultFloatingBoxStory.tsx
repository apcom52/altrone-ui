import { StoryObj } from '@storybook/react';
import { FloatingBox } from '../index';
import { StorybookBackgroundDecorator } from '../../../../storybook/StorybookPlayground';
import { Button } from '../../../button';
import { Align, Role } from '../../../../types';
import { useRef, useState } from 'react';
import { ButtonContainer } from '../../ButtonContainer';
import { Heading, Paragraph } from '../../../typography';

export const DefaultFloatingBoxStory: StoryObj<typeof FloatingBox> = {
  name: 'Default Floating Box',
  render: ({ ...args }) => {
    const [visible, setVisible] = useState(false);
    const buttonRef = useRef(null);

    return (
      <ButtonContainer align={Align.center}>
        <Button ref={buttonRef} onClick={() => setVisible(true)}>
          Show Floating Box
        </Button>
        {visible && (
          <FloatingBox
            {...args}
            onClose={() => setVisible(false)}
            targetElement={buttonRef.current}>
            <Heading level={6}>Confirm your action</Heading>
            <Paragraph>Are you really want to delete this item?</Paragraph>
            <ButtonContainer align={Align.end}>
              <Button>Cancel</Button>
              <Button role={Role.danger}>Delete</Button>
            </ButtonContainer>
          </FloatingBox>
        )}
      </ButtonContainer>
    );
  },
  decorators: [StorybookBackgroundDecorator]
};
