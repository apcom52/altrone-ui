import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from 'components';
import { useState } from 'react';
import { Text } from '../text';
import { FilePicker } from './FilePicker.tsx';
import { FileItem } from './FilePicker.types.ts';

const story: Meta<typeof FilePicker> = {
  title: 'Components/Form/FilePicker',
  component: FilePicker,
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
  name: 'Using FilePicker',
  render: () => {
    const [value4] = useState<FileItem[]>([
      {
        filename: 'Mojave.jpg',
      },
      {
        filename: 'Catalina.jpg',
      },
      {
        filename: 'Big Sur.jpg',
      },
      {
        filename: 'File with a very very very long name.docx',
      },
    ]);

    return (
      <Flex gap="l">
        <Text.Heading role="inner">
          Basic FilePicker (with autoUpload and without)
        </Text.Heading>
        <Flex direction="horizontal" gap="l">
          <FilePicker
            url="http://localhost:4055/upload"
            method="POST"
            name="file"
            placeholder="Choose file (with autoUpload)"
          />
          <FilePicker
            url="http://localhost:4055/upload"
            method="GET"
            name="file"
            multiple={false}
            placeholder="Choose file (manual upload)"
          />
        </Flex>
        <Text.Heading role="inner">Multiple FilePicker</Text.Heading>
        <Flex direction="horizontal" gap="l">
          <FilePicker
            url="http://localhost:4055/upload"
            method="POST"
            name="file"
            placeholder="Choose file"
            multiple
          />
          <FilePicker
            defaultValue={value4}
            url="http://localhost:4055/upload"
            method="POST"
            name="file"
            placeholder="Choose file"
            multiple
          />
        </Flex>
      </Flex>
    );
  },
};

export default story;
