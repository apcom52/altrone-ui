import { StoryObj } from '@storybook/react';
import { StorybookBackgroundDecorator } from '../../../../storybook/StorybookPlayground';
import React from 'react';
import { Button } from '../../../form';
import { ContextMenu } from '../index';
import { ContextMenuType, Role } from '../../../../types';
import { ButtonContainer } from '../../../containers';
import { Icon } from '../../../typography';

export const ContextMenuWithExtraElements: StoryObj<typeof ContextMenu> = {
  name: 'Context Menu with extra elements',
  storyName: 'Context Menu with extra elements',
  render: () => {
    const dropdownMenu: ContextMenuType = [
      {
        type: 'action',
        title: 'Open',
        onClick: () => alert('Open with'),
        elementAbove: () => (
          <div style={{ marginBottom: 8 }}>
            <ButtonContainer>
              <Button isIcon>
                <Icon i="cut" />
              </Button>
              <Button isIcon>
                <Icon i="content_copy" />
              </Button>
              <Button isIcon>
                <Icon i="edit_document" />
              </Button>
              <Button isIcon>
                <Icon i="share" />
              </Button>
              <Button role={Role.danger} isIcon>
                <Icon i="delete" />
              </Button>
            </ButtonContainer>
          </div>
        )
      },
      {
        title: 'Open with',
        children: [
          {
            title: 'YouTube',
            onClick: () => alert('youtube')
          },
          {
            title: 'Vimeo',
            onClick: () => alert('vimeo')
          }
        ]
      },
      {
        type: 'separator'
      },
      {
        type: 'action',
        title: 'Rotate left',
        onClick: () => alert('left'),
        elementAbove: () => (
          <div style={{ marginBottom: 8 }}>
            <img
              src="https://d23.com/app/uploads/2020/01/1180w-463h_010920-riviera-art-gallery-780x440.jpg"
              style={{ borderRadius: 8, width: '100%', boxShadow: 'var(--raisedElevation)' }}
            />
          </div>
        )
      },
      {
        type: 'action',
        title: 'Rotate right',
        onClick: () => alert('right')
      }
    ];

    return (
      <div>
        <Button dropdown={dropdownMenu}>Open menu</Button>
      </div>
    );
  },
  decorators: [StorybookBackgroundDecorator]
};
