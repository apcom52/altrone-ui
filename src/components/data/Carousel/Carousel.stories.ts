import { Carousel } from './index';
import { Meta } from '@storybook/react';
import { CAROUSEL_DATA } from './stories';

export { DefaultCarousel } from './stories';

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  title: 'Data/Carousel',
  tags: ['autodocs'],
  args: {
    data: CAROUSEL_DATA,
    showControls: true,
    loop: false,
    imageFitting: 'cover',
    usePhotoViewer: true,
    duration: undefined
  },
  argTypes: {
    data: { description: 'Data of the carousel' },
    showControls: {
      description: 'When this prop is enabled the controls of the carousel are visible'
    },
    duration: {
      description:
        'Activates auto-switching of the slides. Minimum value is 500 ms. To disable this you have to pass `undefined` value',
      control: 'number'
    },
    imageFitting: {
      description: 'Manages with background-size prop for carousel items',
      control: 'select'
    },
    loop: {
      description: 'Actives infinite switching of the carousel'
    },
    usePhotoViewer: {
      description:
        'When this props is passed the expand button will be added to the toolbar. After clicking on this button the photo viewer with the current slide will be shown.'
    }
  }
};

export default meta;
