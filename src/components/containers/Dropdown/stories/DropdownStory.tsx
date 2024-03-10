import { StoryObj } from '@storybook/react';
import { Dropdown } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { Button } from '../../../form';
import React, { useState } from 'react';
import { Icon } from '../../../typography';

export const DropdownStory: StoryObj<typeof Dropdown> = {
  name: 'Default Dropdown',
  storyName: 'Default Dropdown',
  render: ({ ...args }) => {
    const [checkboxValue, setCheckboxValue] = useState(false);

    return (
      <>
        <Dropdown
          content={
            <Dropdown.Menu>
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
            </Dropdown.Menu>
          }>
          <Button>Click on me</Button>
        </Dropdown>
      </>
    );
  },
  decorators: [StorybookDecorator]
};
