import { StoryObj } from '@storybook/react';
import { Draggable } from '../index';
import { StorybookBackgroundDecorator } from '../../../../storybook/StorybookPlayground';

export const DefaultDraggableStory: StoryObj<typeof Draggable> = {
  name: 'Default Button',
  storyName: 'Default DataTable',
  render: ({ ...args }) => {
    return (
      <Draggable {...args}>
        <img
          style={{
            width: 450,
            height: 'auto',
            background: 'white',
            borderRadius: 12,
            boxShadow: 'var(--floatingElevation)'
          }}
          src="https://c4.wallpaperflare.com/wallpaper/54/779/831/national-park-cathedral-rocks-tunnel-view-california-wallpaper-preview.jpg"
        />
      </Draggable>
    );
  },
  decorators: [StorybookBackgroundDecorator]
};
