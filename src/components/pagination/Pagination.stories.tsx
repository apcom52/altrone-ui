import { Meta, StoryObj } from '@storybook/react';
import { Flex, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Pagination } from './Pagination.tsx';
import { useState } from 'react';
import { userEvent, within, expect } from '@storybook/test';
import { AsyncUtils } from '../../utils';

const story: Meta<typeof Pagination> = {
  title: 'Components/Navigation/Pagination',
  component: Pagination,
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

export const PaginationStory: StoryObj<typeof Pagination> = {
  name: 'Using Flex',
  render: () => {
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(5);
    const [page3, setPage3] = useState(1);

    return (
      <Flex direction="vertical" gap="l">
        <Text.Heading role="inner">Pagination</Text.Heading>
        <Flex direction="horizontal" gap="m">
          <Pagination
            data-testid="pagination"
            currentPage={page1}
            totalPages={5}
            setPage={setPage1}
          />
          <Pagination currentPage={page2} totalPages={120} setPage={setPage2} />
          <Pagination currentPage={page3} totalPages={1} setPage={setPage3} />
        </Flex>
      </Flex>
    );
  },
  play: async ({ step, canvasElement }) => {
    const canvas = within(canvasElement);

    await step('Need to show popover and navigate to page', async () => {
      await userEvent.click(canvas.getByText('1 of 5'));

      const inputElement = canvas.getByLabelText('Navigate to page');

      inputElement.focus();
      await userEvent.keyboard('{ArrowRight}');
      await userEvent.keyboard('{backspace}');
      await userEvent.type(inputElement, '4');
      await userEvent.click(canvas.getByText('Navigate'));
      await AsyncUtils.timeout(1);

      await expect(canvas.getByText('4 of 5')).toBeInTheDocument();
    });

    await step('Need to work correctly with wrong inputed page', async () => {
      await userEvent.click(canvas.getByText('4 of 5'));

      const inputElement = canvas.getByLabelText('Navigate to page');

      inputElement.focus();
      await userEvent.keyboard('{ArrowRight}');
      await userEvent.keyboard('{backspace}');
      await userEvent.type(inputElement, '0');
      await userEvent.click(canvas.getByText('Navigate'));
      await AsyncUtils.timeout(1);

      await expect(canvas.getByText('1 of 5')).toBeInTheDocument();

      await userEvent.click(canvas.getByText('1 of 5'));

      canvas.getByLabelText('Navigate to page').focus();
      await userEvent.keyboard('{ArrowRight}');
      await userEvent.keyboard('{backspace}');
      await userEvent.type(inputElement, '55');
      await userEvent.click(canvas.getByText('Navigate'));
      await AsyncUtils.timeout(1);

      await expect(canvas.getByText('5 of 5')).toBeInTheDocument();
    });
  },
};

export default story;
