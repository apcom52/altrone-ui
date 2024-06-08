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
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';

const story: Meta<typeof Dropdown> = {
  title: 'Components/Containers/Dropdown',
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
      <Flex direction="vertical" gap="l">
        <Text.Heading role={TextHeadingRoles.inner}>
          Basic Dropdowns
        </Text.Heading>
        <Flex direction="horizontal" gap="l">
          <Dropdown
            placement="bottom"
            data-testid="dropdown-1"
            content={
              <Dropdown.Menu>
                <Dropdown.Action
                  icon={<Icon i="account_tree" />}
                  label="View branches"
                  data-testid="action-1"
                />
                <Dropdown.Action
                  icon={<Icon i="add" />}
                  label="Create a new branch"
                  onClick={() => console.log('created')}
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
            <Button label="All branches" data-testid="button-1" />
          </Dropdown>
          <Dropdown
            placement="bottom"
            data-testid="dropdown-2"
            content={
              <Dropdown.Menu>
                <Dropdown.RadioList
                  label="Display as"
                  value={displayAs}
                  onChange={setDisplayAs}
                >
                  <Dropdown.RadioItem
                    value="table"
                    data-testid="radio-1"
                    label="Table"
                  />
                  <Dropdown.RadioItem
                    value="list"
                    data-testid="radio-2"
                    label="List"
                  />
                  <Dropdown.RadioItem
                    value="grid"
                    data-testid="radio-3"
                    label="Grid"
                  />
                </Dropdown.RadioList>
                <Divider />
                <Dropdown.Checkbox
                  checked={showHiddenItems}
                  onChange={setShowHiddenItems}
                  label="Show closed tickets"
                  data-testid="checkbox-1"
                />
              </Dropdown.Menu>
            }
          >
            {({ opened }) => (
              <Button
                label="Visibility Settings"
                data-testid="button-2"
                rightIcon={<Icon i={opened ? 'expand_less' : 'expand_more'} />}
              />
            )}
          </Dropdown>
          <Dropdown
            placement="bottom"
            data-testid="dropdown-3"
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
                <Dropdown.ChildMenu data-testid="child-1" label="Recent opened">
                  <Dropdown.Action
                    icon={<Icon i="add" />}
                    label="Inner child action"
                    data-testid="child-action-1"
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
            <Button label="File" data-testid="button-3" />
          </Dropdown>
          <Dropdown
            placement="bottom"
            data-testid="dropdown-4"
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

    await step(
      'Opening simple dropdown and has to close after clicking on action',
      async () => {
        await userEvent.click(canvas.getByTestId('button-1'));
        expect(canvas.getByTestId('dropdown-1')).toBeInTheDocument();
        await userEvent.click(canvas.getByTestId('action-1'));
        expect(canvas.queryByTestId('dropdown-1')).not.toBeInTheDocument();
      },
    );

    await step('Checkbox action', async () => {
      await userEvent.click(canvas.getByTestId('button-2'));
      expect(canvas.getByTestId('dropdown-2')).toBeInTheDocument();
      expect(canvas.getByTestId('checkbox-1')).toHaveAttribute(
        'aria-checked',
        'false',
      );
      await userEvent.click(canvas.getByTestId('checkbox-1'));
      expect(canvas.getByTestId('checkbox-1')).toHaveAttribute(
        'aria-checked',
        'true',
      );
    });

    await step('Radio action', async () => {
      expect(canvas.getByTestId('radio-1')).toBeInTheDocument();
      expect(canvas.getByTestId('radio-1')).toHaveAttribute(
        'aria-checked',
        'true',
      );
      expect(canvas.getByTestId('radio-2')).toHaveAttribute(
        'aria-checked',
        'false',
      );
      expect(canvas.getByTestId('radio-3')).toHaveAttribute(
        'aria-checked',
        'false',
      );
      await userEvent.click(canvas.getByTestId('radio-2'));
      expect(canvas.getByTestId('radio-1')).toHaveAttribute(
        'aria-checked',
        'false',
      );
      expect(canvas.getByTestId('radio-2')).toHaveAttribute(
        'aria-checked',
        'true',
      );
      expect(canvas.getByTestId('radio-3')).toHaveAttribute(
        'aria-checked',
        'false',
      );
      await userEvent.click(canvas.getByTestId('radio-3'));
      expect(canvas.getByTestId('radio-1')).toHaveAttribute(
        'aria-checked',
        'false',
      );
      expect(canvas.getByTestId('radio-2')).toHaveAttribute(
        'aria-checked',
        'false',
      );
      expect(canvas.getByTestId('radio-3')).toHaveAttribute(
        'aria-checked',
        'true',
      );
    });

    await step('Child dropdowns', async () => {
      await userEvent.click(canvas.getByTestId('button-3'));
      expect(canvas.getByTestId('dropdown-3')).toBeInTheDocument();
      expect(canvas.queryByText('Inner child action')).not.toBeInTheDocument();
      await userEvent.click(canvas.getByText('Recent opened'));
      expect(canvas.queryByText('Inner child action')).toBeInTheDocument();
      await userEvent.click(canvas.getByText('Inner child action'));
      expect(canvas.queryByTestId('dropdown-3')).not.toBeInTheDocument();
      expect(canvas.queryByText('Inner child action')).not.toBeInTheDocument();
    });
  },
};

export default story;
