import { Meta, StoryObj } from '@storybook/react';
import { Divider, Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { ColorPicker } from './ColorPicker.tsx';
import { ColorPreset } from './ColorPicker.types.ts';
import { COLORS } from './COLORS.ts';
import { useState } from 'react';

const story: Meta<typeof ColorPicker> = {
  title: 'Components/Form/ColorPicker',
  component: ColorPicker,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
      },
    },
  },
};

export const ColorPickerStory: StoryObj<typeof Divider> = {
  name: 'Using ColorPicker',
  render: () => {
    const [color, setColor] = useState<string | undefined>(undefined);
    const [color2, setColor2] = useState<string | undefined>('#abcdef');
    const [color3, setColor3] = useState<string | undefined>(COLORS[8].value);

    return (
      <Flex direction="vertical" gap="l">
        <Text.Heading role="inner">Standard ColorPicker</Text.Heading>
        <Flex direction="horizontal" gap="m">
          <ColorPicker
            placeholder="With saved colors and palette"
            colorPresets={COLORS}
            value={color}
            onChange={setColor}
            clearable
          />
          <ColorPicker
            placeholder="Only palette"
            value={color2}
            onChange={setColor2}
          />
          <ColorPicker
            placeholder="Only saved colors"
            colorPresets={COLORS}
            value={color3}
            onChange={setColor3}
            allowPalette={false}
          />
        </Flex>
        <Text.Heading role="inner">Transparent ColorPicker</Text.Heading>
        <Flex direction="horizontal" gap="m">
          <ColorPicker
            placeholder="With saved colors and palette"
            colorPresets={COLORS}
            value={color}
            onChange={setColor}
            transparent
          />
        </Flex>
        <Text.Heading role="inner">Disabled state</Text.Heading>
        <Flex direction="horizontal" gap="m">
          <ColorPicker
            placeholder="Disabled state without value"
            colorPresets={COLORS}
            disabled
            onChange={() => null}
          />
          <ColorPicker
            disabled
            value="#123abc"
            onChange={() => null}
            placeholder="Disabled state with value"
          />
        </Flex>
        <Text.Heading role="inner">Readonly state</Text.Heading>
        <Flex direction="horizontal" gap="m">
          <ColorPicker
            placeholder="Disabled state without value"
            colorPresets={COLORS}
            readOnly
            onChange={() => null}
          />
          <ColorPicker
            readOnly
            value="#123abc"
            onChange={() => null}
            placeholder="Readonly state with value"
          />
        </Flex>
        <Text.Heading role="inner">Different sizes</Text.Heading>
        <Flex direction="horizontal" gap="m">
          <ColorPicker
            placeholder="With saved colors and palette"
            colorPresets={COLORS}
            value={color}
            onChange={setColor}
            size="s"
          />
          <ColorPicker
            placeholder="With saved colors and palette"
            colorPresets={COLORS}
            value={color}
            onChange={setColor}
            size="l"
          />
        </Flex>
      </Flex>
    );
  },
};

export default story;
