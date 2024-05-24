import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { Align, Gap } from '../../types';
import { Text, TextHeadingRoles } from '../text';
import { Toolbar } from './Toolbar.tsx';
import { Icon } from '../icon';
import { Search } from '../search';

const story: Meta<typeof Toolbar> = {
  title: 'Components/Containers/Toolbar',
  component: Toolbar,
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

export const ToolbarStory: StoryObj<typeof Toolbar> = {
  name: 'Using Toolbar',
  render: () => {
    return (
      <Flex gap={Gap.large}>
        <Text.Heading role={TextHeadingRoles.inner}>Basic Toolbar</Text.Heading>
        <Toolbar>
          <Toolbar.Action icon={<Icon i="settings" />} label="General" />
          <Toolbar.Action icon={<Icon i="content_copy" />} label="Tabs" />
          <Toolbar.Action icon={<Icon i="input" />} label="Autofill" />
          <Toolbar.Action icon={<Icon i="key" />} label="Passwords" />
          <Toolbar.Action icon={<Icon i="search" />} label="Search" />
          <Toolbar.Action icon={<Icon i="lock" />} label="Security" />
          <Toolbar.Action icon={<Icon i="back_hand" />} label="Privacy" />
          <Toolbar.Action icon={<Icon i="public" />} label="Websites" />
          <Toolbar.Action icon={<Icon i="extension" />} label="Extensions" />
          <Toolbar.Action
            icon={<Icon i="settings_suggest" />}
            label="Advanced"
          />
        </Toolbar>
        <Text.Heading role={TextHeadingRoles.inner}>
          Compact Toolbar
        </Text.Heading>
        <Toolbar compact>
          <Toolbar.Action icon={<Icon i="settings" />} label="General" />
          <Toolbar.Action icon={<Icon i="content_copy" />} label="Tabs" />
          <Toolbar.Action icon={<Icon i="input" />} label="Autofill" />
          <Toolbar.Action icon={<Icon i="key" />} label="Passwords" />
          <Toolbar.Action icon={<Icon i="search" />} label="Search" />
          <Toolbar.Action icon={<Icon i="lock" />} label="Security" />
          <Toolbar.Action icon={<Icon i="back_hand" />} label="Privacy" />
          <Toolbar.Action icon={<Icon i="public" />} label="Websites" />
          <Toolbar.Action icon={<Icon i="extension" />} label="Extensions" />
          <Toolbar.Action
            icon={<Icon i="settings_suggest" />}
            label="Advanced"
          />
        </Toolbar>
        <Text.Heading role={TextHeadingRoles.inner}>
          Toolbar with custom components
        </Text.Heading>
        <Toolbar align={Align.between}>
          <Toolbar.Group>
            <Toolbar.Action icon={<Icon i="settings" />} label="General" />
            <Toolbar.Action icon={<Icon i="content_copy" />} label="Tabs" />
            <Toolbar.Action icon={<Icon i="input" />} label="Autofill" />
            <Toolbar.Action icon={<Icon i="key" />} label="Passwords" />
            <Toolbar.Action icon={<Icon i="search" />} label="Search" />
          </Toolbar.Group>

          <Toolbar.Group>
            <Toolbar.Action icon={<Icon i="lock" />} label="Security" />
            <Toolbar.Action icon={<Icon i="back_hand" />} label="Privacy" />
            <Toolbar.Action icon={<Icon i="public" />} label="Websites" />
          </Toolbar.Group>

          <Toolbar.Group>
            <Toolbar.Action icon={<Icon i="extension" />} label="Extensions" />
            <Toolbar.Action
              icon={<Icon i="settings_suggest" />}
              label="Advanced"
            />
          </Toolbar.Group>

          <Toolbar.Action label="Search" showLabel={false}>
            <Search getSuggestions={() => []} />
          </Toolbar.Action>
        </Toolbar>

        <Text.Heading role={TextHeadingRoles.inner}>
          Compact Toolbar with custom components
        </Text.Heading>
        <Toolbar align={Align.between} compact>
          <Toolbar.Group>
            <Toolbar.Action icon={<Icon i="settings" />} label="General" />
            <Toolbar.Action icon={<Icon i="content_copy" />} label="Tabs" />
            <Toolbar.Action icon={<Icon i="input" />} label="Autofill" />
            <Toolbar.Action icon={<Icon i="key" />} label="Passwords" />
            <Toolbar.Action icon={<Icon i="search" />} label="Search" />
          </Toolbar.Group>

          <Toolbar.Group>
            <Toolbar.Action icon={<Icon i="lock" />} label="Security" />
            <Toolbar.Action
              icon={<Icon i="back_hand" />}
              label="Privacy"
              showLabel={false}
            />
            <Toolbar.Action icon={<Icon i="public" />} label="Websites" />
          </Toolbar.Group>

          <Toolbar.Group>
            <Toolbar.Action icon={<Icon i="extension" />} label="Extensions" />
            <Toolbar.Action
              icon={<Icon i="settings_suggest" />}
              label="Advanced"
            />
          </Toolbar.Group>

          <Toolbar.Action label="Search" showLabel={false}>
            <Search getSuggestions={() => []} />
          </Toolbar.Action>
        </Toolbar>
      </Flex>
    );
  },
};

export default story;
