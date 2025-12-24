import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook/index.ts';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex/index.ts';
import { Text } from '../text/index.ts';
import { AlertProvider } from './AlertProvider.tsx';
import { showAlert } from './alert.ts';
import { Button } from 'components/button/index.ts';

const story: Meta<typeof AlertProvider> = {
  title: 'Components/Display/Alerts',
  component: AlertProvider,
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

export const AlertProviderStory: StoryObj<typeof Flex> = {
  name: 'Using Alerts',
  render: () => {
    const handleAsyncAlert = async () => {
      console.log('Async alert');
      await showAlert({
        title: 'Async alert',
        message: 'This is an async alert',
      });
      console.log('Async alert resolved');
    };

    return (
      <Flex direction="vertical" gap="l">
        <Text size={5} weight="bold" block>
          Using alerts
        </Text>
        <Flex gap="s">
          <Button onClick={() => showAlert({})} label="Alert #1" />
          <Button
            onClick={() =>
              showAlert({
                title: 'Access denied',
                message: 'You do not have permission to perform this action.',
              })
            }
            label="Alert #2"
          />
          <Button
            onClick={() =>
              showAlert({
                title: 'Сессия истекла',
                message:
                  'Ваша сессия была завершена из-за длительного бездействия. Пожалуйста, войдите в систему заново.',
                okText: 'Понятно',
              })
            }
            label="Alert #3"
          />
          <Button onClick={handleAsyncAlert} label="Alert #4 (async)" />
        </Flex>
      </Flex>
    );
  },
};

export default story;
