import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook/index.ts';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex/index.ts';
import { Text } from '../text/index.ts';
import { Box } from './Box.tsx';

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
    return (
      <Flex direction="vertical" gap="l">
        <Text.Heading role="inner">Using Box</Text.Heading>
        <Flex direction="horizontal" gap="l">
          <Box width="100px" height="100px" align="center" justify="center">
            Basic box
          </Box>
          <Box
            radius="xl"
            width="100px"
            height="100px"
            align="center"
            justify="center"
          >
            Rounded box
          </Box>
          <Box
            radius="circle"
            width="100px"
            height="100px"
            align="center"
            surface="translucent"
            justify="center"
          >
            Circle
          </Box>
          <Box
            surface="translucent"
            width="100px"
            radius="m"
            height="100px"
            align="end"
            justify="end"
          >
            Translucent box
          </Box>
          <Box
            surface="transparent"
            width="100px"
            height="100px"
            align="center"
            justify="center"
          >
            Transparent box
          </Box>
        </Flex>
        <Text.Heading role="inner">Interactive boxes</Text.Heading>
        <Flex direction="horizontal" gap="l">
          <Box width="200px" height="200px" align="center" justify="center">
            <Box
              width="100px"
              height="40px"
              align="center"
              justify="center"
              radius="m"
            >
              Click me
            </Box>
          </Box>
          <Box
            radius="xl"
            width="200px"
            height="200px"
            align="center"
            justify="center"
          >
            Rounded box
          </Box>
          <Box
            surface="translucent"
            width="200px"
            radius="m"
            height="200px"
            align="end"
            justify="end"
          >
            <Box
              width="100px"
              height="40px"
              align="center"
              justify="center"
              radius="m"
              surface="translucent"
            >
              Click me
            </Box>
          </Box>
          <Box
            surface="transparent"
            width="200px"
            height="200px"
            align="center"
            justify="center"
          >
            Transparent box
          </Box>
        </Flex>
        <Text.Heading role="inner">Different shadows</Text.Heading>
        <Flex direction="horizontal" gap="l">
          <Box
            width="100px"
            height="100px"
            align="center"
            justify="center"
            shadow="none"
          >
            Shadow-0
          </Box>
          <Box
            width="100px"
            height="100px"
            align="center"
            justify="center"
            shadow="1"
          >
            Shadow-1
          </Box>
          <Box
            width="100px"
            height="100px"
            align="center"
            justify="center"
            shadow="2"
          >
            Shadow-2
          </Box>
          <Box
            width="100px"
            height="100px"
            align="center"
            justify="center"
            shadow="3"
          >
            Shadow-3
          </Box>
          <Box
            width="100px"
            height="100px"
            align="center"
            justify="center"
            shadow="4"
          >
            Shadow-4
          </Box>
          <Box
            width="100px"
            height="100px"
            align="center"
            justify="center"
            shadow="5"
          >
            Shadow-5
          </Box>
          <Box
            width="100px"
            height="100px"
            align="center"
            justify="center"
            shadow="6"
          >
            Shadow-6
          </Box>
        </Flex>
      </Flex>
    );
  },
};

export default story;
