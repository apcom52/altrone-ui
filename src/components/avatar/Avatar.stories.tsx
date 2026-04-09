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
  args: {
    firstName: 'Alexander',
    lastName: 'Perevezentsev',
  },
  argTypes: {
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
    size: {
      control: 'select',
      options: ['mini', 's', undefined, 'l', 'xl'],
    },
  },
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

// Team members used across stories
const TEAM = [
  { firstName: 'Alice', lastName: 'Morgan', backgroundColor: '#6366f1' },
  { firstName: 'Ben', lastName: 'Carter', backgroundColor: '#f59e0b' },
  { firstName: 'Clara', lastName: 'Diaz', backgroundColor: '#10b981' },
  { firstName: 'David', lastName: 'Lee', backgroundColor: '#ef4444' },
  { firstName: 'Eva', lastName: 'Novak', backgroundColor: '#8b5cf6' },
  { firstName: 'Frank', lastName: 'Olsen', backgroundColor: '#06b6d4' },
  { firstName: 'Grace', lastName: 'Kim', backgroundColor: '#f97316' },
  { firstName: 'Hugo', lastName: 'Blanc', backgroundColor: '#84cc16' },
];

export const SizesStory: StoryObj<typeof Avatar> = {
  name: 'Sizes',
  render: () => (
    <Flex direction="vertical" gap="l">
      <Text size={5} weight="bold" block>
        All sizes
      </Text>
      <Flex gap="m" align="center">
        <Avatar firstName="Alex" lastName="Morgan" size="mini" />
        <Avatar firstName="Alex" lastName="Morgan" size="s" />
        <Avatar firstName="Alex" lastName="Morgan" />
        <Avatar firstName="Alex" lastName="Morgan" size="l" />
        <Avatar firstName="Alex" lastName="Morgan" size="xl" />
      </Flex>
      <Flex gap="m" align="center">
        <Text size={2} color="muted">mini</Text>
        <Text size={2} color="muted">s</Text>
        <Text size={2} color="muted">m</Text>
        <Text size={2} color="muted">l</Text>
        <Text size={2} color="muted">xl</Text>
      </Flex>
    </Flex>
  ),
};

export const AutoContrastStory: StoryObj<typeof Avatar> = {
  name: 'Auto-contrast text color',
  render: () => (
    <Flex direction="vertical" gap="l">
      <Text size={5} weight="bold" block>
        Dark backgrounds → white text
      </Text>
      <Flex gap="m" wrap="wrap">
        <Avatar firstName="Alice" lastName="Blue" backgroundColor="#1e3a5f" />
        <Avatar firstName="Bob" lastName="Purple" backgroundColor="#4a1d96" />
        <Avatar firstName="Carol" lastName="Green" backgroundColor="#064e3b" />
        <Avatar firstName="Dan" lastName="Red" backgroundColor="#7f1d1d" />
        <Avatar firstName="Eva" lastName="Gray" backgroundColor="#1f2937" />
        <Avatar firstName="Frank" lastName="Teal" backgroundColor="#134e4a" />
      </Flex>
      <Text size={5} weight="bold" block>
        Light backgrounds → black text
      </Text>
      <Flex gap="m" wrap="wrap">
        <Avatar firstName="Alice" lastName="Yellow" backgroundColor="#fef08a" />
        <Avatar firstName="Bob" lastName="Mint" backgroundColor="#bbf7d0" />
        <Avatar firstName="Carol" lastName="Sky" backgroundColor="#bae6fd" />
        <Avatar firstName="Dan" lastName="Pink" backgroundColor="#fbcfe8" />
        <Avatar firstName="Eva" lastName="Peach" backgroundColor="#fed7aa" />
        <Avatar firstName="Frank" lastName="Lavender" backgroundColor="#e9d5ff" />
      </Flex>
    </Flex>
  ),
};

export const CustomTextColorStory: StoryObj<typeof Avatar> = {
  name: 'Custom text color override',
  render: () => (
    <Flex direction="vertical" gap="l">
      <Text size={5} weight="bold" block>
        textColor prop overrides auto-contrast
      </Text>
      <Flex gap="m" align="center">
        <Avatar
          firstName="Alice"
          lastName="Gold"
          backgroundColor="#1e3a5f"
          textColor="#fbbf24"
        />
        <Avatar
          firstName="Bob"
          lastName="Coral"
          backgroundColor="#064e3b"
          textColor="#fb7185"
        />
        <Avatar
          firstName="Carol"
          lastName="Cyan"
          backgroundColor="#1f2937"
          textColor="#67e8f9"
        />
        <Avatar
          firstName="Dan"
          lastName="Lime"
          backgroundColor="#4a1d96"
          textColor="#bef264"
        />
      </Flex>
    </Flex>
  ),
};

export const TeamRosterStory: StoryObj<typeof Avatar> = {
  name: 'Team roster',
  render: () => (
    <Flex direction="vertical" gap="m" style={{ maxWidth: 320 }}>
      <Text size={5} weight="bold" block>
        Design team
      </Text>
      {TEAM.slice(0, 5).map((member) => (
        <Flex
          key={member.firstName}
          gap="m"
          align="center"
          style={{ padding: '6px 0' }}
        >
          <Avatar
            firstName={member.firstName}
            lastName={member.lastName}
            backgroundColor={member.backgroundColor}
          />
          <Flex direction="vertical" gap="xs">
            <Text weight="medium">
              {member.firstName} {member.lastName}
            </Text>
            <Text size={3} color="muted">
              Product Designer
            </Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
};

export const StackedGroupStory: StoryObj<typeof Avatar> = {
  name: 'Stacked group',
  render: () => (
    <Flex direction="vertical" gap="xl">
      <Flex direction="vertical" gap="s">
        <Text size={5} weight="bold" block>
          Project participants
        </Text>
        <Text size={3} color="muted" block>
          8 members
        </Text>
        <Flex
          align="center"
          style={{ paddingLeft: 12 }}
        >
          {TEAM.map((member, i) => (
            <Avatar
              key={member.firstName}
              firstName={member.firstName}
              lastName={member.lastName}
              backgroundColor={member.backgroundColor}
              style={{ marginLeft: -12, boxShadow: '0 0 0 2px var(--background-1)' }}
              title={`${member.firstName} ${member.lastName}`}
            />
          ))}
        </Flex>
      </Flex>

      <Flex direction="vertical" gap="s">
        <Text size={5} weight="bold" block>
          Small stacked group
        </Text>
        <Flex
          align="center"
          style={{ paddingLeft: 8 }}
        >
          {TEAM.slice(0, 4).map((member) => (
            <Avatar
              key={member.firstName}
              firstName={member.firstName}
              lastName={member.lastName}
              backgroundColor={member.backgroundColor}
              size="s"
              style={{ marginLeft: -8, boxShadow: '0 0 0 2px var(--background-1)' }}
              title={`${member.firstName} ${member.lastName}`}
            />
          ))}
          <Avatar
            firstName="+4"
            lastName=""
            size="s"
            style={{ marginLeft: -8, boxShadow: '0 0 0 2px var(--background-1)' }}
          />
        </Flex>
      </Flex>
    </Flex>
  ),
};

export const WithPhotoStory: StoryObj<typeof Avatar> = {
  name: 'With photo & fallback',
  render: () => (
    <Flex direction="vertical" gap="l">
      <Text size={5} weight="bold" block>
        With photos
      </Text>
      <Flex gap="m" align="center">
        <Avatar
          firstName="Nino"
          lastName="Kobakhidze"
          imageSrc="https://i.pravatar.cc/48?img=21"
          size="xl"
        />
        <Avatar
          firstName="Artur"
          lastName="Doyle"
          imageSrc="https://i.pravatar.cc/48?img=4"
          size="xl"
        />
        <Avatar
          firstName="Laura"
          lastName="Bite"
          imageSrc="https://i.pravatar.cc/48?img=30"
          size="xl"
        />
      </Flex>
      <Text size={5} weight="bold" block>
        Broken URL → falls back to initials
      </Text>
      <Flex gap="m" align="center">
        <Avatar
          firstName="Nino"
          lastName="Kobakhidze"
          imageSrc="https://broken.url/image.jpg"
          backgroundColor="#f59e0b"
          size="xl"
        />
        <Avatar
          firstName="Artur"
          lastName="Doyle"
          imageSrc="https://broken.url/image.jpg"
          backgroundColor="#6366f1"
          size="xl"
        />
      </Flex>
    </Flex>
  ),
};

export default story;
