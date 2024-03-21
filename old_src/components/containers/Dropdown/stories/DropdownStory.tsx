import { StoryObj } from '@storybook/react';
import { Dropdown } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { Button } from '../../../form';
import React, { useState } from 'react';
import { Icon } from '../../../typography';
import { DropdownRadioItem } from '../components';

export const DropdownStory: StoryObj<typeof Dropdown> = {
  name: 'Default Dropdown',
  storyName: 'Default Dropdown',
  render: () => {
    const [checkboxValue, setCheckboxValue] = useState(false);
    const [view, setView] = useState('list');

    return (
      <>
        <Dropdown
          content={
            <Dropdown.Menu>
              <Dropdown.ChildMenu label="Create New Document">
                <Dropdown.Action label="Create Word document" />
                <Dropdown.Action label="Create Excel document" />
                <Dropdown.Action label="Create PowerPoint document" />
                <Dropdown.Divider />
                <Dropdown.ChildMenu icon={<Icon i="post_add" />} label="Create from template">
                  <Dropdown.Action label="Template A" />
                  <Dropdown.Action label="Template B" />
                </Dropdown.ChildMenu>
              </Dropdown.ChildMenu>
              <Dropdown.Action icon={<Icon i="cut" />} label="Cut" onClick={() => alert('first')} />
              <Dropdown.Action
                icon={<Icon i="content_copy" />}
                label="Copy"
                disabled={true}
                hintText="Cmd+C"
                onClick={() => alert('second')}
              />
              <Dropdown.Action
                icon={<Icon i="content_paste" />}
                label="Paste"
                hintText="Cmd+V"
                onClick={() => alert('third')}
              />
              <Dropdown.Checkbox
                checked={checkboxValue}
                onChange={setCheckboxValue}
                label="Allow Edit"
              />
              <Dropdown.Divider />
              <Dropdown.RadioList value={view} onChange={setView}>
                <DropdownRadioItem value="list" label="List" />
                <DropdownRadioItem value="table" label="Table" disabled />
                <DropdownRadioItem value="grid" label="Grid" />
              </Dropdown.RadioList>
            </Dropdown.Menu>
          }>
          <Button>Click on me</Button>
        </Dropdown>
      </>
    );
  },
  decorators: [StorybookDecorator]
};