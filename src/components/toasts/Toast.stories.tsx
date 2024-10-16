import { Meta, StoryObj } from '@storybook/react';
import { Button, Checkbox, Dropdown, Flex, Select, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { Toast, useToast } from './Toast.tsx';
import { useBoolean } from '../../utils';
import { useState } from 'react';

const story: Meta<typeof Toast> = {
  title: 'Components/Display/Toast',
  component: Toast,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
  parameters: {},
};

export const SimpleToastsStory: StoryObj<typeof Flex> = {
  name: 'Using Toasts',
  render: (args) => {
    const { toast, success, warning, danger } = useToast();

    return (
      <Flex gap="l" direction="vertical">
        <Text.Heading role="inner">Click to show a toast message</Text.Heading>
        <Flex direction="horizontal" gap="l">
          <Button
            label="Show toast message"
            onClick={() => toast('New updates are available.')}
          />
          <Button
            label="Successful toast"
            onClick={() => success('File uploaded successfully!')}
          />
          <Button
            label="Warning toast"
            onClick={() =>
              warning('Unsaved changes will be lost. Do you want to proceed?')
            }
          />
          <Button
            label="Danger toast"
            onClick={() => danger('An error occurred. Please try again')}
          />
        </Flex>
      </Flex>
    );
  },
};

const NOTIFICATION_PLACEMENT = [
  { label: 'Top Left', value: 'top-left' },
  { label: 'Top Right', value: 'top-right' },
  { label: 'Bottom Left', value: 'bottom-left' },
  { label: 'Bottom Right', value: 'bottom-right' },
];

export const NotificationsStory: StoryObj<typeof Flex> = {
  name: 'Using Notifications',
  render: () => {
    const { value: titleVisible, setValue: setTitleVisible } = useBoolean(true);
    const { value: iconVisible, setValue: setIconVisible } = useBoolean(true);
    const { value: actionVisible, setValue: setActionVisible } =
      useBoolean(true);

    const [placement, setPlacement] = useState<
      'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | undefined
    >('top-right');

    const { sendNotification } = useToast();

    return (
      <Flex gap="l" direction="vertical">
        <Text.Heading variant="inner">
          What need to show in notification?
        </Text.Heading>
        <Flex gap="l">
          <Checkbox checked={titleVisible} onChange={setTitleVisible}>
            Title
          </Checkbox>
          <Checkbox checked={iconVisible} onChange={setIconVisible}>
            Icon
          </Checkbox>
          <Checkbox checked={actionVisible} onChange={setActionVisible}>
            Action
          </Checkbox>
        </Flex>
        <Text.Heading variant="inner">
          Where we need to show this notification?
        </Text.Heading>
        <Flex gap="l">
          <Select
            value={placement}
            onChange={setPlacement}
            options={NOTIFICATION_PLACEMENT}
          />
        </Flex>
        <Text.Heading variant="inner">Click to show</Text.Heading>
        <Flex direction="horizontal" gap="l">
          <Button
            label="Show notification"
            onClick={() =>
              sendNotification({
                message: 'New updates are available.',
                title: titleVisible ? 'New message from Karen Wok' : undefined,
                icon: iconVisible ? (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/281/281769.png"
                    width={48}
                    height={48}
                  />
                ) : undefined,
                action: actionVisible ? (
                  <Dropdown
                    content={
                      <Dropdown.Menu>
                        <Dropdown.Action label="Open" />
                        <Dropdown.Action label="Remind later" />
                        <Dropdown.Action label="Close" />
                      </Dropdown.Menu>
                    }
                  >
                    <Button label="Update" />
                  </Dropdown>
                ) : undefined,
                placement: placement ?? 'top-right',
                duration: 3000,
              })
            }
          />
        </Flex>
      </Flex>
    );
  },
};

export default story;
