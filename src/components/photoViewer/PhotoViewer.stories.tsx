import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { PhotoViewer } from './PhotoViewer.tsx';

const story: Meta<typeof PhotoViewer> = {
  title: 'Components/Display/PhotoViewer',
  component: PhotoViewer,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

export const TextInputStory: StoryObj<typeof Flex> = {
  name: 'Using PasswordInput',
  render: () => {
    return (
      <PhotoViewer onClose={() => null}>
        <PhotoViewer.Image
          src="https://512pixels.net/downloads/macos-wallpapers-thumbs/10-9--thumb.jpg"
          caption="10.9 Maverics"
          description={`Mavericks are individuals who think and act independently, often challenging the status quo with their unconventional ideas and actions. Known for their pioneering spirit, mavericks are typically driven by a strong sense of individuality and a desire to innovate. They are not afraid to take risks or go against the grain, which often leads to groundbreaking achievements and significant advancements in various fields. In business, mavericks are seen as visionary leaders who can transform industries by introducing disruptive technologies and novel strategies. Their unique perspective and willingness to defy norms can inspire teams, foster creativity, and drive progress.

The term "maverick" has its origins in the 19th century, named after Samuel Maverick, a Texas rancher who refused to brand his cattle like other ranchers. This act of nonconformity earned him a reputation for independence, and the term has since evolved to describe anyone who exhibits similar traits of defiance and innovation. In contemporary culture, mavericks are celebrated in various domains, from tech entrepreneurs like Steve Jobs to political figures like Bernie Sanders. Their contributions often challenge existing paradigms, leading to substantial cultural, technological, and social shifts. Despite facing criticism and resistance, mavericks' relentless pursuit of their vision frequently results in transformative outcomes that reshape the world around them.`}
        />
        <PhotoViewer.Image
          src="https://512pixels.net/downloads/macos-wallpapers-thumbs/10-10--thumb.jpg"
          caption="10.10 Yosemite"
        />
        <PhotoViewer.Image
          src="https://512pixels.net/downloads/macos-wallpapers-thumbs/10-11--thumb.jpg"
          caption="10.11 El Capitan"
        />
        <PhotoViewer.Image
          src="https://512pixels.net/downloads/macos-wallpapers-thumbs/10-12--thumb.jpg"
          caption="10.12 Sierra"
        />
        <PhotoViewer.Image
          src="https://512pixels.net/downloads/macos-wallpapers-thumbs/10-13--thumb.jpg"
          caption="10.13 High Sierra"
        />
        <PhotoViewer.Image
          src="https://512pixels.net/downloads/macos-wallpapers-thumbs/10-14--thumb.jpg"
          caption="10.14 Mojave"
        />
        <PhotoViewer.Image
          src="https://512pixels.net/downloads/macos-wallpapers-thumbs/10-15--thumb.jpg"
          caption="10.15 Catalina"
        />
        <PhotoViewer.Image
          src="https://512pixels.net/wp-content/uploads/2020/06/11-0-Day-thumbnail.jpg"
          caption="11 Big Sur"
        />
        <PhotoViewer.Image
          src="https://512pixels.net/wp-content/uploads/2021/06/12-Light-thumbnail.jpg"
          caption="12 Monterey"
        />
        <PhotoViewer.Image
          src="https://512pixels.net/wp-content/uploads/2022/06/13-Ventura-Light-thumb-1500x1500.jpg"
          caption="13 Ventura"
        />
        <PhotoViewer.Image
          src="https://512pixels.net/wp-content/uploads/2023/06/14-Sonoma-Light-thumb-1500x1500.jpg"
          caption="14 Sonoma"
        />
      </PhotoViewer>
    );
  },
};

export default story;
