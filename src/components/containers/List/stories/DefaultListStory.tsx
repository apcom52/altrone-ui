import { StoryObj } from '@storybook/react';
import { List } from '../List';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import React, { useState } from 'react';
import { Form, FormGroup } from '../../Form';
import { Switcher } from '../../../form';
import { Direction } from '../../../../types';
import { Icon } from '../../../typography';

export interface DishCategory {
  name: string;
  color: string;
  icon: string;
}

export const LIST_STORYDATA: DishCategory[] = [
  {
    name: 'Italian',
    color: '#f5428d',
    icon: '🍕'
  },
  {
    name: 'Quick & Easy',
    color: '#f54242',
    icon: '🔪'
  },
  {
    name: 'Hamburgers',
    color: '#f5a442',
    icon: '🍔'
  },
  {
    name: 'German',
    color: '#f5d142',
    icon: '🇩🇪'
  },
  {
    name: 'Light & Lovely',
    color: '#368dff',
    icon: '❤️'
  },
  {
    name: 'Exotic',
    color: '#41d95d',
    icon: '🦀'
  },
  {
    name: 'Breakfast',
    color: '#9eecff',
    icon: '🍳'
  },
  {
    name: 'Asian',
    color: '#b9ffb0',
    icon: '🍜'
  },
  {
    name: 'French',
    color: '#ffc7ff',
    icon: '🥐'
  },
  {
    name: 'Summer',
    color: '#47fced',
    icon: '☀️'
  }
];

export const DefaultListStory: StoryObj<typeof List<DishCategory>> = {
  name: 'Default List',
  storyName: 'Default List',
  render: ({ ...args }) => {
    const [onlyOdd, setOnlyOdd] = useState(false);

    return (
      <Form>
        <FormGroup>
          <Switcher checked={onlyOdd} onChange={setOnlyOdd}>
            Show only odd items
          </Switcher>
        </FormGroup>
        <FormGroup>
          <List<DishCategory>
            {...args}
            skipRule={(_, index) => (onlyOdd ? index % 2 !== 0 : false)}
            renderFunc={(item) => (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                <span style={{ fontSize: '24px', marginRight: 16 }}>{item.icon}</span>
                <span style={{ fontWeight: 500, fontSize: 18 }}>{item.name}</span>
                <span style={{ marginLeft: 'auto' }}>
                  <Icon i="arrow_forward_ios" />
                </span>
              </div>
            )}
            SeparatorComponent={() => {
              return (
                <div
                  style={
                    args.direction === Direction.horizontal
                      ? {
                          background: '#CFD8DC',
                          height: '100%',
                          width: 1,
                          marginLeft: 15,
                          marginRight: 15
                        }
                      : {
                          background: '#CFD8DC',
                          width: '95%',
                          height: 1,
                          marginTop: 5,
                          marginBottom: 5,
                          marginLeft: '5%',
                          borderBottom: 'none'
                        }
                  }
                />
              );
            }}
          />
        </FormGroup>
      </Form>
    );
  },
  decorators: [StorybookDecorator]
};
