import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook/index.ts';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex/index.ts';
import { Text } from '../text/index.ts';
import { DialogProvider } from './DialogProvider.tsx';
import { showAlert, showConfirm, showPrompt } from './dialog.ts';
import { Button } from 'components/button/index.ts';

const story: Meta<typeof DialogProvider> = {
  title: 'Components/Display/Dialogs',
  component: DialogProvider,
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

export const DialogProviderStory: StoryObj<typeof Flex> = {
  name: 'Using Dialogs',
  render: () => {
    const handleAsyncAlert = async () => {
      console.log('Async alert');
      await showAlert({
        title: 'Async alert',
        message: 'This is an async alert',
      });
      console.log('Async alert resolved');
    };

    const handleAsyncConfirm = async () => {
      console.log('Async confirm');
      const result = await showConfirm({
        title: 'Удалить запись?',
        message:
          'Вы уверены, что хотите удалить эту запись? Это действие не может быть отменено.',
        confirmText: 'Удалить',
        rejectText: 'Отменить',
        danger: true,
      });
      console.log('Async confirm resolved', result);
    };

    const handleAsyncPrompt = async () => {
      console.log('Async prompt');
      const result = await showPrompt({
        title: 'Your age',
        message: 'Please enter your age',
        placeholder: 'Enter your age',
        inputType: 'number',
      });
      console.log('Async prompt resolved', result);
    };

    return (
      <Flex direction="vertical" gap="l">
        <Text size={5} weight="bold" block>
          Using dialogs
        </Text>
        <Flex gap="s">
          <Button onClick={() => showAlert()} label="Alert #1" />
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
        <Flex gap="s">
          <Button onClick={() => showConfirm()} label="Confirm #1" />
          <Button
            onClick={() =>
              showConfirm({
                title: 'Are you sure?',
                message: 'This action cannot be undone.',
                confirmText: 'Yes',
                rejectText: 'No',
              })
            }
            label="Confirm #2"
          />
          <Button
            onClick={() =>
              showConfirm({
                title: 'Сессия истекла',
                message:
                  'Ваша сессия была завершена из-за длительного бездействия. Пожалуйста, войдите в систему заново.',
                confirmText: 'Понятно',
                rejectText: 'Отмена',
              })
            }
            label="Confirm #3"
          />
          <Button onClick={handleAsyncConfirm} label="Confirm #4 (async)" />
        </Flex>
        <Flex gap="s">
          <Button onClick={() => showPrompt()} label="Prompt #1" />
          <Button
            onClick={() =>
              showPrompt({
                title: 'Input your value',
                message: 'This is a prompt',
                inputType: 'string',
              })
            }
            label="Prompt String"
          />
          <Button
            onClick={() =>
              showPrompt({
                title: 'Input your value',
                message: 'This is a prompt',
                inputType: 'number',
              })
            }
            label="Prompt Number"
          />
          <Button
            onClick={() =>
              showPrompt({
                title: 'Input your value',
                message: 'This is a prompt',
                inputType: 'password',
              })
            }
            label="Prompt Password"
          />
          <Button
            onClick={() =>
              showPrompt({
                title: 'Input your value',
                message: 'This is a prompt',
                inputType: 'text',
                placeholder: 'Enter your poem',
                confirmText: 'Post poem',
                cancelText: 'Decline',
              })
            }
            label="Prompt Text"
          />
          <Button onClick={handleAsyncPrompt} label="Prompt #4 (async)" />
        </Flex>
      </Flex>
    );
  },
};

export default story;
