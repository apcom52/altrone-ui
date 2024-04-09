import { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Flex,
  Icon,
  Text,
  TextHeadingRoles,
  Dropdown,
} from 'components';
import { Direction, Gap } from 'types';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { expect, userEvent, within } from '@storybook/test';

const story: Meta<typeof Dropdown> = {
  title: 'Components/Display/Dropdown',
  component: Dropdown,
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

export const DropdownStory: StoryObj<typeof Dropdown> = {
  name: 'Using Dropdown',
  render: () => (
    <Flex direction={Direction.vertical} gap={Gap.large}>
      <Text.Heading role={TextHeadingRoles.inner}>Basic Dropdowns</Text.Heading>
      <Flex direction={Direction.horizontal} gap={Gap.large}>
        <Dropdown
          placement="bottom"
          data-testid="dropdown-1"
          content={
            <Dropdown.Menu>
              <Dropdown.Action
                icon={<Icon i="account_tree" />}
                label="View branches"
              />
              <Dropdown.Action
                icon={<Icon i="add" />}
                label="Create a new branch"
                hintText="⌘+A"
              />
              <Dropdown.Action
                label="Switch to another branch"
                hintText="⌘+S"
              />
              <Dropdown.Action disabled label="Compare branches" />
              <Dropdown.Action label="Refresh Branch list" />
              <Dropdown.Action
                danger
                icon={<Icon i="delete" />}
                label="Delete all branches"
                hintText="⌘+Shift+D"
              />
            </Dropdown.Menu>
          }
        >
          <Button label="All branches" data-testid="button-click" />
        </Dropdown>
        <Dropdown
          placement="bottom"
          data-testid="dropdown-1"
          content={
            <Dropdown.Menu>
              <Dropdown.RadioList>
                <Dropdown.RadioItem value="table" label="Table" />
                <Dropdown.RadioItem value="list" label="List" />
                <Dropdown.RadioItem value="grid" label="Grid" />
              </Dropdown.RadioList>
              <Dropdown.Checkbox label="Show closed tickets" />
            </Dropdown.Menu>
          }
        >
          <Button label="Visibility Settings" data-testid="button-click" />
        </Dropdown>
      </Flex>
    </Flex>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
  },
};

export default story;
