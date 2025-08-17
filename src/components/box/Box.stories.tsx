import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook/index.ts';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex/index.ts';
import { Text } from '../text/index.ts';
import { Box } from './Box.tsx';
import { Form } from 'components/form/Form.tsx';
import { Radio } from 'components/radio/Radio.tsx';
import { Checkbox } from 'components/checkbox/Checkbox.tsx';
import { useState } from 'react';
import { BoxInteraction, BoxSurface } from './Box.types.ts';

const story: Meta<typeof Box> = {
  title: 'Components/Layout/Box',
  component: Box,
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

export const BoxStory: StoryObj<typeof Flex> = {
  name: 'Using Box',
  render: () => {
    const [surface, setSurface] = useState<BoxSurface>('solid');
    const [interactionEffects, setInteractionEffects] = useState<
      BoxInteraction[]
    >([]);

    return (
      <Flex direction="horizontal" gap="xl">
        <Flex direction="vertical" gap="l">
          <Text.Heading role="inner">Examples</Text.Heading>
          <Flex direction="horizontal" gap="l" wrap>
            <Box
              width="100px"
              height="100px"
              alignX="center"
              alignY="center"
              radius="none"
              surface={surface}
              interaction={interactionEffects}
            >
              Basic
            </Box>
            <Box
              width="50px"
              height="100px"
              alignX="center"
              alignY="center"
              radius="mini"
              surface={surface}
              interaction={interactionEffects}
              focusable
            >
              Mini
            </Box>
            <Box
              width="50px"
              height="50px"
              alignX="center"
              alignY="center"
              radius="s"
              surface={surface}
              interaction={interactionEffects}
            >
              Small
            </Box>
            <Box
              width="100px"
              height="50px"
              alignX="start"
              alignY="center"
              radius="m"
              surface={surface}
              interaction={interactionEffects}
              cursor="pointer"
            >
              Medium
            </Box>
            <Box
              width="100px"
              height="100px"
              alignX="center"
              alignY="start"
              radius="l"
              surface={surface}
              interaction={interactionEffects}
            >
              Large
            </Box>
            <Box
              width="150px"
              height="150px"
              alignX="center"
              alignY="end"
              radius="xl"
              surface={surface}
              interaction={interactionEffects}
            >
              XL
            </Box>
            <Box
              width="100px"
              height="100px"
              alignX="center"
              alignY="center"
              radius="circle"
              surface={surface}
              interaction={interactionEffects}
            >
              Circle
            </Box>
          </Flex>
          <Flex direction="horizontal" gap="l" wrap>
            <Box
              width="80px"
              height="80px"
              alignX="center"
              alignY="center"
              radius="l"
              surface={surface}
              interaction={interactionEffects}
              shadow="none"
            >
              None
            </Box>
            <Box
              width="80px"
              height="80px"
              alignX="center"
              alignY="center"
              radius="l"
              surface={surface}
              interaction={interactionEffects}
              shadow="inset"
            >
              inset
            </Box>
            <Box
              width="80px"
              height="80px"
              alignX="center"
              alignY="center"
              radius="l"
              surface={surface}
              interaction={interactionEffects}
              shadow="1"
            >
              S-1
            </Box>
            <Box
              width="80px"
              height="80px"
              alignX="center"
              alignY="center"
              radius="l"
              surface={surface}
              interaction={interactionEffects}
              shadow="2"
            >
              S-2
            </Box>
            <Box
              width="80px"
              height="80px"
              alignX="center"
              alignY="center"
              radius="l"
              surface={surface}
              interaction={interactionEffects}
              shadow="3"
            >
              S-3
            </Box>
            <Box
              width="80px"
              height="80px"
              alignX="center"
              alignY="center"
              radius="l"
              surface={surface}
              interaction={interactionEffects}
              shadow="4"
            >
              S-4
            </Box>
            <Box
              width="80px"
              height="80px"
              alignX="center"
              alignY="center"
              radius="l"
              surface={surface}
              interaction={interactionEffects}
              shadow="5"
            >
              S-5
            </Box>
          </Flex>
          <Flex direction="horizontal" gap="l" wrap>
            <Box
              as="button"
              width="120px"
              height="40px"
              alignX="center"
              alignY="center"
              radius="l"
              interaction={interactionEffects}
              shadow="1"
            >
              Action
            </Box>
            <Box
              as="input"
              width="220px"
              height="64px"
              alignX="center"
              alignY="center"
              radius="l"
              interaction={interactionEffects}
              shadow="1"
            >
              Input
            </Box>
          </Flex>
        </Flex>
        <Flex direction="vertical" gap="l">
          <Text.Heading role="inner">Configuration</Text.Heading>
          <Form>
            <Form.Field label="Surface">
              <Radio
                value={surface}
                onChange={(value) => setSurface(value as BoxSurface)}
              >
                <Radio.Item value="solid">Solid</Radio.Item>
                <Radio.Item value="accent">Accent</Radio.Item>
                <Radio.Item value="accent-faded">Accent (faded)</Radio.Item>
                <Radio.Item value="accent-translucent">
                  Accent (translucent)
                </Radio.Item>
                <Radio.Item value="danger">Danger</Radio.Item>
                <Radio.Item value="dummy">Dummy</Radio.Item>
                <Radio.Item value="translucent">Translucent</Radio.Item>
                <Radio.Item value="transparent">Transparent</Radio.Item>
              </Radio>
            </Form.Field>
            {['hover', 'press', 'focus'].map((interaction) => (
              <Form.Field key={interaction} label={interaction.toUpperCase()}>
                <Flex wrap gap="m">
                  {['glow', 'outline', 'background', 'shadow', 'scale'].map(
                    (effect) => (
                      <Checkbox
                        key={`${interaction}:${effect}`}
                        checked={interactionEffects.includes(
                          `${interaction}:${effect}`
                        )}
                        onChange={(state) => {
                          const effectName = `${interaction}:${effect}`;
                          if (state) {
                            setInteractionEffects((old) => [
                              ...old,
                              effectName,
                            ]);
                          } else {
                            setInteractionEffects((old) => {
                              return old.filter(
                                (effect) => effect !== effectName
                              );
                            });
                          }
                        }}
                      >
                        {interaction} {effect}
                      </Checkbox>
                    )
                  )}
                </Flex>
              </Form.Field>
            ))}
          </Form>
        </Flex>
      </Flex>
    );
  },
};

export default story;
