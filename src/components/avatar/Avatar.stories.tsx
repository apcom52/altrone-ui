import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook/index.ts';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex/index.ts';
import { Text } from '../text/index.ts';
import { Avatar } from './Avatar.tsx';

const story: Meta<typeof Avatar> = {
  title: 'Components/Atoms/Avatar',
  component: Avatar,
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

export const AvatarStory: StoryObj<typeof Flex> = {
  name: 'Using Avatar',
  render: () => {
    return (
      <Flex direction="vertical" gap="l">
        <Text size={5} weight="bold" block>
          Using avatars
        </Text>
        <Flex gap="m">
          <Avatar firstName="Alexander" lastName="Perevezentsev" />
          <Avatar firstName="Julia" color="#E91E63" lastName="Isakova" />
          <Avatar firstName="Maria" color="#9C27B0" />
          <Avatar firstName="Nick" color="#2196F3" />
          <Avatar
            firstName="Александр"
            lastName="Перевезенцев"
            color="#FF9800"
          />
          <Avatar
            firstName="Nino"
            lastName="Kobakhidze"
            imageSrc="https://i.pravatar.cc/40?img=21"
            color="#FF9800"
          />
          <Avatar
            firstName="Artur"
            lastName="Doyle"
            imageSrc="https://i.pravatar.cc/40?img=4"
            color="#FFEB3B"
          />
          <Avatar
            firstName="Laura"
            lastName="Bite"
            imageSrc="https://i.pravatar.cc/40?img=30"
            color="#FF5722"
          />
        </Flex>
        <Text size={5} weight="bold" block>
          Mini avatars
        </Text>
        <Flex gap="m">
          <Avatar firstName="Alexander" lastName="Perevezentsev" size="mini" />
          <Avatar
            firstName="Julia"
            color="#E91E63"
            lastName="Isakova"
            size="mini"
          />
          <Avatar firstName="Maria" color="#9C27B0" size="mini" />
          <Avatar firstName="Nick" color="#2196F3" size="mini" />
          <Avatar
            firstName="Nino"
            lastName="Kobakhidze"
            imageSrc="https://i.pravatar.cc/32?img=21"
            color="#FF9800"
            size="mini"
          />
          <Avatar
            firstName="Artur"
            lastName="Doyle"
            imageSrc="https://i.pravatar.cc/32?img=4"
            color="#FFEB3B"
            size="mini"
          />
          <Avatar
            firstName="Laura"
            lastName="Bite"
            imageSrc="https://i.pravatar.cc/32?img=30"
            color="#FF5722"
            size="mini"
          />
        </Flex>
        <Text size={5} weight="bold" block>
          Small avatars
        </Text>
        <Flex gap="m">
          <Avatar firstName="Alexander" lastName="Perevezentsev" size="s" />
          <Avatar
            firstName="Julia"
            color="#E91E63"
            lastName="Isakova"
            size="s"
          />
          <Avatar firstName="Maria" color="#9C27B0" size="s" />
          <Avatar firstName="Nick" color="#2196F3" size="s" />
          <Avatar
            firstName="Nino"
            lastName="Kobakhidze"
            imageSrc="https://i.pravatar.cc/32?img=21"
            color="#FF9800"
            size="s"
          />
          <Avatar
            firstName="Artur"
            lastName="Doyle"
            imageSrc="https://i.pravatar.cc/32?img=4"
            color="#FFEB3B"
            size="s"
          />
          <Avatar
            firstName="Laura"
            lastName="Bite"
            imageSrc="https://i.pravatar.cc/32?img=30"
            color="#FF5722"
            size="s"
          />
        </Flex>
        <Text size={5} weight="bold" block>
          Big avatars
        </Text>
        <Flex gap="m">
          <Avatar firstName="Alexander" lastName="Perevezentsev" size="l" />
          <Avatar
            firstName="Julia"
            color="#E91E63"
            lastName="Isakova"
            size="l"
          />
          <Avatar firstName="Maria" color="#9C27B0" size="l" />
          <Avatar firstName="Nick" color="#2196F3" size="l" />
          <Avatar
            firstName="Nino"
            lastName="Kobakhidze"
            imageSrc="https://i.pravatar.cc/56?img=21"
            color="#FF9800"
            size="l"
          />
          <Avatar
            firstName="Artur"
            lastName="Doyle"
            imageSrc="https://i.pravatar.cc/56?img=4"
            color="#FFEB3B"
            size="l"
          />
          <Avatar
            firstName="Laura"
            lastName="Bite"
            imageSrc="https://i.pravatar.cc/56?img=30"
            color="#FF5722"
            size="l"
          />
        </Flex>
        <Text size={5} weight="bold" block>
          xl avatars
        </Text>
        <Flex gap="m">
          <Avatar firstName="Alexander" lastName="Perevezentsev" size="xl" />
          <Avatar
            firstName="Julia"
            color="#E91E63"
            lastName="Isakova"
            size="xl"
          />
          <Avatar firstName="Maria" color="#9C27B0" size="xl" />
          <Avatar firstName="Nick" color="#2196F3" size="xl" />
          <Avatar
            firstName="Nino"
            lastName="Kobakhidze"
            imageSrc="https://i.pravatar.cc/32?img=21"
            color="#FF9800"
            size="xl"
          />
          <Avatar
            firstName="Artur"
            lastName="Doyle"
            imageSrc="https://i.pravatar.cc/32?img=4"
            color="#FFEB3B"
            size="xl"
          />
          <Avatar
            firstName="Laura"
            lastName="Bite"
            imageSrc="https://i.pravatar.cc/32?img=30"
            color="#FF5722"
            size="xl"
          />
        </Flex>
      </Flex>
    );
  },
};

export default story;
