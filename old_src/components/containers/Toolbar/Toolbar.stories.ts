import { Meta } from '@storybook/react';
import { Toolbar } from './index';

export {
  DefaultToolbarStory,
  DefaultToolbarWithLabels,
  CompactToolbarStory,
  ToolbarWithCustomComponents
} from './stories';

const meta: Meta<typeof Toolbar> = {
  component: Toolbar,
  title: 'Containers/Toolbar',
  tags: ['autodocs'],
  args: {
    defaultPosition: {
      x: 80,
      y: 100
    }
  },
  argTypes: {
    children: { description: 'Child group containers and actions' },
    variant: { description: 'Variant of the toolbar', control: 'select' },
    floated: { description: 'Makes position of the toolbar as fixed' },
    menu: { description: 'Adds the menu to the toolbar. Only available for default variant' },
    offset: { description: 'Default offset (from window boundaries) for floated toolbars' },
    width: { description: 'Width of the toolbar' },
    surface: { description: 'Surface of the toolbar', control: 'select' },
    elevation: { description: 'Shadows of the toolbar', control: 'select' },
    defaultPosition: { description: 'Default position for toolbar (for floated toolbars)' },
    className: { description: 'Custom CSS class' }
  }
};

export default meta;
