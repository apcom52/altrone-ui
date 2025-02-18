import React from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AltroneApplication, NavigationList, Icon } from '../src/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('NavigationList', () => {
  test('NavigationList has to apply custom className and id', () => {
    render(
      <NavigationList
        data-testid="list"
        className="cls"
        style={{ color: 'red' }}
      >
        <NavigationList.Group
          data-testid="group"
          title="Group title"
          className="group"
          style={{ color: 'rgb(0, 0, 255)' }}
        >
          <NavigationList.GroupAction
            label="test"
            icon={<Icon i="test" />}
            data-testid="groupAction"
            className="groupAction"
            style={{ color: 'cyan' }}
          />
        </NavigationList.Group>
        <NavigationList.Link
          href="#"
          label="Link label"
          data-testid="link"
          className="link"
          style={{ color: 'yellow' }}
        >
          <NavigationList.LinkAction
            data-testid="linkAction"
            label="Link Action"
            icon={<Icon i="face" />}
            className="linkAction"
            style={{ color: 'magenta' }}
          />
        </NavigationList.Link>
      </NavigationList>,
    );

    expect(screen.getByTestId('list')).toHaveClass('cls');
    expect(screen.getByTestId('list')).toHaveStyle('color: rgb(255, 0, 0)');
    expect(screen.getByTestId('group')).toHaveClass('group');
    expect(screen.getByTestId('group')).toHaveStyle('color: rgb(0, 0, 255)');
    expect(screen.getByTestId('link')).toHaveClass('link');
    expect(screen.getByTestId('link')).toHaveStyle('color: rgb(255, 255, 0)');

    expect(screen.getByTestId('groupAction')).toHaveClass('groupAction');
    expect(screen.getByTestId('groupAction')).toHaveStyle(
      'color: rgb(0, 255, 255)',
    );

    expect(screen.getByTestId('linkAction')).toHaveClass('linkAction');
    expect(screen.getByTestId('linkAction')).toHaveStyle(
      'color: rgb(255, 0, 255)',
    );
  });

  test('check that NavigationList configuration works correctly', () => {
    render(
      <AltroneApplication
        config={{
          navigationList: {
            className: 'cls',
            style: { color: 'rgb(0, 0, 255)' },
            group: {
              className: 'conf-group',
              style: { color: 'rgb(255, 0, 0)' },
              titleClassName: 'title',
            },
            link: {
              className: 'conf-link',
              style: { color: 'rgb(255, 0, 255)' },
            },
            groupAction: {
              className: 'conf-ga',
              style: { color: 'rgb(139, 0, 0)' },
            },
            linkAction: {
              className: 'conf-la',
              style: { color: 'rgb(255, 255, 0)' },
            },
          },
        }}
      >
        <NavigationList data-testid="list">
          <NavigationList.Group title="Title" data-testid="group">
            <NavigationList.GroupAction
              label="test"
              icon={<Icon i="test" />}
              data-testid="groupAction"
            />
          </NavigationList.Group>
          <NavigationList.Link href="#" label="Link label" data-testid="link">
            <NavigationList.LinkAction
              data-testid="linkAction"
              label="Link Action"
              icon={<Icon i="face" />}
            />
          </NavigationList.Link>
        </NavigationList>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('list')).toHaveClass('cls');
    expect(screen.getByTestId('list')).toHaveStyle('color: rgb(0, 0, 255)');
    expect(
      screen.getByTestId('list').querySelector('.title'),
    ).toBeInTheDocument();

    expect(screen.getByTestId('group')).toHaveClass('conf-group');
    expect(screen.getByTestId('group')).toHaveStyle('color: rgb(255, 0, 0)');

    expect(screen.getByTestId('groupAction')).toHaveClass('conf-ga');
    expect(screen.getByTestId('groupAction')).toHaveStyle(
      'color: rgb(139, 0, 0)',
    );

    expect(screen.getByTestId('link')).toHaveClass('conf-link');
    expect(screen.getByTestId('link')).toHaveStyle('color: rgb(255, 0, 255)');

    expect(screen.getByTestId('linkAction')).toHaveClass('conf-la');
    expect(screen.getByTestId('linkAction')).toHaveStyle(
      'color: rgb(255, 255, 0)',
    );
  });
});
