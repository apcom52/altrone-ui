import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from 'components';
import { useState } from 'react';
import { Direction, Gap } from '../../types';
import { Text, TextHeadingRoles } from '../text';
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
    const [value1, setValue1] = useState<FileItem | undefined>(undefined);
    const [value2, setValue2] = useState<FileItem>({
      filename: 'Mojave.jpg',
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Mesquite_Sand_Dunes_in_Death_Valley.jpg/1200px-Mesquite_Sand_Dunes_in_Death_Valley.jpg',
    });
    const [value3, setValue3] = useState<FileItem[]>([]);
    const [value4, setValue4] = useState<FileItem[]>([
      {
        filename: 'Mojave.jpg',
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Mesquite_Sand_Dunes_in_Death_Valley.jpg/1200px-Mesquite_Sand_Dunes_in_Death_Valley.jpg',
      },
      {
        filename: 'Catalina.jpg',
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Mesquite_Sand_Dunes_in_Death_Valley.jpg/1200px-Mesquite_Sand_Dunes_in_Death_Valley.jpg',
        invalid: true,
      },
      {
        filename: 'Big Sur.jpg',
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Mesquite_Sand_Dunes_in_Death_Valley.jpg/1200px-Mesquite_Sand_Dunes_in_Death_Valley.jpg',
        file: new File([], 'bigsur'),
      },
      {
        filename: 'File with a very very very long name.docx',
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Mesquite_Sand_Dunes_in_Death_Valley.jpg/1200px-Mesquite_Sand_Dunes_in_Death_Valley.jpg',
        file: new File([], 'bigsur'),
      },
    ]);

    return (
      <Flex gap={Gap.large}>
        <Text.Heading role={TextHeadingRoles.inner}>
          Basic FilePicker
        </Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <FilePicker
            url="http://localhost:4055/upload"
            method="POST"
            name="file"
            multiple={false}
            defaultValue={value1}
            onChange={setValue1}
            placeholder="Choose file"
          />
          <FilePicker
            name="your picture"
            multiple={false}
            defaultValue={value2}
            onChange={setValue2}
            placeholder="Choose file"
          />
        </Flex>
        <Text.Heading role={TextHeadingRoles.inner}>
          Multiple FilePicker
        </Text.Heading>
        <Flex direction={Direction.horizontal} gap={Gap.large}>
          <FilePicker
            name="your picture"
            multiple={true}
            defaultValue={value3}
            onChange={setValue3}
            placeholder="Choose file"
          />
          <FilePicker
            name="your picture"
            multiple={true}
            defaultValue={value4}
            onChange={setValue4}
            placeholder="Choose file"
          />
        </Flex>
      </Flex>
    );
  },
};

export default story;
