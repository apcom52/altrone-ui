import { StoryObj } from '@storybook/react';
import { Popover } from '../index';
import { StorybookBackgroundDecorator } from '../../../../storybook/StorybookPlayground';
import { Button, TextInput } from '../../../form';
import { ButtonContainer } from '../../ButtonContainer';
import React, { useRef } from 'react';
import { Icon } from '../../../typography';
import button from '../../../form/Button/Button';

export const DefaultPopoverStory: StoryObj<typeof Popover> = {
  name: 'Default Popover',
  render: ({ ...args }) => {
    return (
      <ButtonContainer>
        <Popover
          content={
            <>
              <div>Hello, world!</div>
              <TextInput value="" onChange={() => null} />
            </>
          }
          trigger="click"
          title="With only title"
          enabled
          useRootContainer>
          <Button>Click here</Button>
        </Popover>
        <Popover
          content={<div>Hello, world!</div>}
          trigger="hover"
          title="Popover with hover trigger"
          showCloseButton
          useRootContainer>
          <Button>Hover on me</Button>
        </Popover>
        <Popover
          content={<div>Hello, world!</div>}
          trigger="focus"
          showCloseButton
          useRootContainer>
          <Button>Focus me</Button>
        </Popover>
        <Popover
          content={
            <>
              <div>Hello, world!</div>
              <TextInput value="" onChange={() => null} />
            </>
          }
          trigger="click"
          title=""
          enabled
          useRootContainer>
          {({ opened }) => (
            <Button rightIcon={opened ? <Icon i="expand_less" /> : <Icon i="expand_more" />}>
              Button with functional-child element
            </Button>
          )}
        </Popover>
        <Popover
          content={
            <>
              <div>Hello, world!</div>
              <TextInput value="" onChange={() => null} />
            </>
          }
          trigger="click"
          enabled
          useRootContainer>
          <button type="button">Simple Button</button>
        </Popover>
      </ButtonContainer>
    );
  },
  decorators: [StorybookBackgroundDecorator]
};
