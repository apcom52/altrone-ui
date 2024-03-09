import { StoryObj } from '@storybook/react';
import { Dropdown } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { Button } from '../../../form';
import { DropdownAction } from '../components/DropdownAction';
import { DropdownMenu } from '../components/DropdownMenu';
import React from 'react';
import { Icon } from '../../../typography';

export const DropdownStory: StoryObj<typeof Dropdown> = {
  name: 'Default Dropdown',
  storyName: 'Default Dropdown',
  render: ({ ...args }) => {
    return (
      <>
        <Dropdown
          content={
            <DropdownMenu>
              <DropdownAction icon={<Icon i="cut" />} label="Cut" onClick={() => alert('first')} />
              <DropdownAction
                icon={<Icon i="content_copy" />}
                label="Copy"
                disabled={true}
                hintText="Cmd+C"
                onClick={() => alert('second')}
              />
              <DropdownAction
                icon={<Icon i="content_paste" />}
                label="Paste"
                hintText="Cmd+V"
                onClick={() => alert('third')}
              />
            </DropdownMenu>
          }>
          <Button>Click on me</Button>
        </Dropdown>
      </>
    );
  },
  decorators: [StorybookDecorator]
};
