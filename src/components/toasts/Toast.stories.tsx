import { Meta, StoryObj } from '@storybook/react';
import { Button, Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { Toast, useToast } from './Toast.tsx';

const story: Meta<typeof Toast> = {
  title: 'Components/Display/Toast',
  component: Toast,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
  parameters: {},
};

export const FlexLayout: StoryObj<typeof Flex> = {
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

export default story;
