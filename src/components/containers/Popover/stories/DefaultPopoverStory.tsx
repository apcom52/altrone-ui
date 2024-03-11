import { StoryObj } from '@storybook/react';
import { Popover } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { Button, TextInput } from '../../../form';
import { ButtonContainer } from '../../ButtonContainer';
import React from 'react';
import { Icon } from '../../../typography';
import { Elevation } from '../../../../types';

export const DefaultPopoverStory: StoryObj<typeof Popover> = {
  name: 'Default Popover',
  render: ({ ...args }) => {
    return (
      <ButtonContainer>
        <Popover
          elevation={Elevation.flat}
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
          elevation={Elevation.convex}
          trigger="hover"
          title="Popover with hover trigger"
          showCloseButton
          useRootContainer>
          <Button>Hover on me</Button>
        </Popover>
        <Popover
          content={<div>Hello, world!</div>}
          elevation={Elevation.raised}
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
          elevation={Elevation.floating}
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
          elevation={Elevation.flying}
          useRootContainer>
          <button type="button">Simple Button</button>
        </Popover>
      </ButtonContainer>
    );
  },
  decorators: [StorybookDecorator]
};
