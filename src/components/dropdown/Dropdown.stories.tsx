import { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Flex,
  Icon,
  Text,
  TextHeadingRoles,
  Dropdown,
  Divider,
} from 'components';
import { Direction, Gap } from 'types';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';

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
  render: () => {
    const [displayAs, setDisplayAs] = useState('table');
    const [priority, setPriority] = useState('');
    const [showHiddenItems, setShowHiddenItems] = useState(false);

    return (
      <Flex direction={Direction.vertical} gap={Gap.large}>
        <Text.Heading role={TextHeadingRoles.inner}>
          Basic Dropdowns
        </Text.Heading>
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
                <Dropdown.RadioList
                  label="Display as"
                  value={displayAs}
                  onChange={setDisplayAs}
                >
                  <Dropdown.RadioItem value="table" label="Table" />
                  <Dropdown.RadioItem value="list" label="List" />
                  <Dropdown.RadioItem value="grid" label="Grid" />
                </Dropdown.RadioList>
                <Divider />
                <Dropdown.Checkbox
                  checked={showHiddenItems}
                  onChange={setShowHiddenItems}
                  label="Show closed tickets"
                />
              </Dropdown.Menu>
            }
          >
            {({ opened }) => (
              <Button
                label="Visibility Settings"
                data-testid="button-click"
                rightIcon={<Icon i={opened ? 'expand_less' : 'expand_more'} />}
              />
            )}
          </Dropdown>
          <Dropdown
            placement="bottom"
            data-testid="dropdown-1"
            content={
              <Dropdown.Menu>
                <Dropdown.Action
                  icon={<Icon i="account_tree" />}
                  label="Create document"
                />
                <Dropdown.Action
                  icon={<Icon i="add" />}
                  label="Open document..."
                  hintText="⌘+A"
                />
                <Dropdown.ChildMenu label="Recent opened">
                  <Dropdown.Action
                    icon={<Icon i="add" />}
                    label="Save document"
                    hintText="⌘+A"
                  />
                  <Dropdown.Action
                    icon={<Icon i="add" />}
                    label="Save document"
                    hintText="⌘+A"
                  />
                  <Dropdown.Action
                    icon={<Icon i="add" />}
                    label="Save document"
                    hintText="⌘+A"
                  />
                </Dropdown.ChildMenu>
                <Dropdown.Action
                  icon={<Icon i="add" />}
                  label="Save document"
                  hintText="⌘+A"
                />
                <Divider />
                <Dropdown.Action
                  icon={<Icon i="add" />}
                  label="Close document"
                  hintText="⌘+A"
                />
              </Dropdown.Menu>
            }
          >
            <Button label="File" data-testid="button-click" />
          </Dropdown>
          <Dropdown
            placement="bottom"
            data-testid="dropdown-1"
            content={
              <Dropdown.Menu>
                <Dropdown.Action
                  icon={<Icon i="add" />}
                  label="Craft new quest"
                />
                <Dropdown.Action label="Scout Missions" />
                <Dropdown.Action label="Edit Timeline" />
                <Dropdown.Action label="Vanquish" />
                <Dropdown.Action label="Rest" />
                <Divider />
                <Dropdown.RadioList
                  value={priority}
                  label="Select priority"
                  onChange={setPriority}
                >
                  <Dropdown.RadioItem value="high" label="High" />
                  <Dropdown.RadioItem value="medium" label="Medium" />
                  <Dropdown.RadioItem value="low" label="Low" />
                </Dropdown.RadioList>
                <Divider />
                <Dropdown.Action label="Exit" />
              </Dropdown.Menu>
            }
          >
            <Button label="Task Orchestrator" data-testid="button-click" />
          </Dropdown>
        </Flex>
      </Flex>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
  },
};

export default story;
