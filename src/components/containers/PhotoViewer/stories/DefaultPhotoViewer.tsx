import { StoryObj } from '@storybook/react';
import { PhotoViewer } from '../index';
import { StorybookBackgroundDecorator } from '../../../../storybook/StorybookPlayground';
import { useState } from 'react';
import { ButtonContainer } from '../../ButtonContainer';
import { Button } from '../../../button';

export const DefaultPhotoViewer: StoryObj<typeof PhotoViewer> = {
  name: 'Default Form',
  render: ({ ...args }) => {
    const [visible, setVisible] = useState(false);

    return (
      <ButtonContainer>
        <Button onClick={() => setVisible(true)}>Open PhotoViewer</Button>
        {visible && <PhotoViewer {...args} onClose={() => setVisible(false)} />}
      </ButtonContainer>
    );
  },
  decorators: [StorybookBackgroundDecorator]
};
