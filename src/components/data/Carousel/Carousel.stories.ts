import { Carousel } from './index';
import { Meta } from '@storybook/react';

export { DefaultCarousel } from './stories';

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  title: 'Data/Carousel',
  tags: ['autodocs'],
  args: {
    data: [
      {
        src: 'https://512pixels.net/downloads/macos-wallpapers-thumbs/10-5--thumb.png'
      },
      {
        src: 'https://512pixels.net/downloads/macos-wallpapers-thumbs/10-7--thumb.png'
      },
      {
        src: 'https://512pixels.net/downloads/macos-wallpapers-thumbs/10-8--thumb.jpg'
      },
      {
        src: 'https://512pixels.net/downloads/macos-wallpapers-thumbs/10-9--thumb.jpg'
      },
      {
        src: 'https://512pixels.net/downloads/macos-wallpapers-thumbs/10-10--thumb.jpg'
      },
      {
        src: 'https://512pixels.net/downloads/macos-wallpapers-thumbs/10-11--thumb.jpg'
      },
      {
        src: 'https://512pixels.net/downloads/macos-wallpapers-thumbs/10-12--thumb.jpg'
      },
      {
        src: 'https://512pixels.net/downloads/macos-wallpapers-thumbs/10-14-Day-Thumb.jpg'
      }
    ],
    duration: undefined
  },
  argTypes: {}
};

export default meta;
