import React, { createRef } from 'react';
import { expect, test, describe, vitest } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button, Configuration, Dropdown } from '../src/components';

describe('Dropdown', () => {
  test('forwards ref to the root DOM element of Action/Checkbox/RadioItem/ChildMenu', () => {
    const actionRef = createRef<HTMLButtonElement>();
    const checkboxRef = createRef<HTMLButtonElement>();
    const radioItemRef = createRef<HTMLButtonElement>();
    const childMenuRef = createRef<HTMLElement>();

    render(
      <Dropdown
        content={
          <Dropdown.Menu>
            <Dropdown.Action ref={actionRef} label="Action" />
            <Dropdown.Checkbox
              ref={checkboxRef}
              checked={false}
              onChange={vitest.fn()}
              label="Checkbox"
            />
            <Dropdown.RadioList value="" onChange={vitest.fn()}>
              <Dropdown.RadioItem ref={radioItemRef} value="" label="Radio" />
            </Dropdown.RadioList>
            <Dropdown.ChildMenu ref={childMenuRef} label="Child">
              <Dropdown.Action label="Nested" />
            </Dropdown.ChildMenu>
          </Dropdown.Menu>
        }
        openedByDefault
      >
        <Button label="Test" />
      </Dropdown>,
    );

    expect(actionRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(checkboxRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(radioItemRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(childMenuRef.current).toBeInstanceOf(HTMLElement);
  });

  test('check that render menu correctly', () => {
    render(
      <Dropdown
        content={
          <Dropdown.Menu data-testid="menu">
            <Dropdown.Action label="Action" data-testid="action" />
          </Dropdown.Menu>
        }
        openedByDefault
        data-testid="dropdown"
      >
        <Button label="Test" data-testid="button" />
      </Dropdown>,
    );

    expect(screen.getByTestId('menu')).toBeInTheDocument();
    expect(screen.getByTestId('action')).toBeInTheDocument();
  });

  test('check that className and style props works', () => {
    render(
      <Dropdown
        className="cls"
        style={{ color: 'rgb(0, 0, 255) ' }}
        content={
          <Dropdown.Menu
            data-testid="menu"
            className="cls"
            style={{ color: 'rgb(0, 0, 255) ' }}
          >
            <Dropdown.Action
              label="Action"
              data-testid="action"
              className="cls"
              style={{ color: 'rgb(0, 0, 255) ' }}
            />
            <Dropdown.Checkbox
              checked={false}
              onChange={vitest.fn()}
              label="Action"
              data-testid="checkbox"
              className="cls"
              style={{ color: 'rgb(0, 0, 255) ' }}
            />
            <Dropdown.RadioList
              value=""
              onChange={vitest.fn()}
              data-testid="radiolist"
              className="cls"
              style={{ color: 'rgb(0, 0, 255) ' }}
            >
              <Dropdown.RadioItem
                value=""
                label="Label"
                data-testid="radioitem"
                className="cls"
                style={{ color: 'rgb(0, 0, 255) ' }}
              />
            </Dropdown.RadioList>
            <Dropdown.ChildMenu
              label="Action"
              data-testid="childmenu"
              className="cls"
              style={{ color: 'rgb(0, 0, 255) ' }}
            >
              <div>content</div>
            </Dropdown.ChildMenu>
          </Dropdown.Menu>
        }
        openedByDefault
        data-testid="dropdown"
      >
        <Button label="Test" data-testid="button" />
      </Dropdown>,
    );

    expect(screen.getByTestId('dropdown')).toHaveClass('cls');
    expect(screen.getByTestId('dropdown')).toHaveStyle('color: rgb(0, 0, 255)');

    expect(screen.getByTestId('menu')).toHaveClass('cls');
    expect(screen.getByTestId('menu')).toHaveStyle('color: rgb(0, 0, 255)');

    expect(screen.getByTestId('action')).toHaveClass('cls');
    expect(screen.getByTestId('action')).toHaveStyle('color: rgb(0, 0, 255)');

    expect(screen.getByTestId('checkbox')).toHaveClass('cls');
    expect(screen.getByTestId('checkbox')).toHaveStyle('color: rgb(0, 0, 255)');

    expect(screen.getByTestId('radiolist')).toHaveClass('cls');
    expect(screen.getByTestId('radiolist')).toHaveStyle(
      'color: rgb(0, 0, 255)',
    );

    expect(screen.getByTestId('radioitem')).toHaveClass('cls');
    expect(screen.getByTestId('radioitem')).toHaveStyle(
      'color: rgb(0, 0, 255)',
    );

    expect(screen.getByTestId('childmenu')).toHaveClass('cls');
    expect(screen.getByTestId('childmenu')).toHaveStyle(
      'color: rgb(0, 0, 255)',
    );
  });

  test('check that Scrollable configuration works correctly', () => {
    render(
      <Configuration
        dropdown={{ className: 'cls', style: { color: 'rgb(0, 0, 255)' } }}
      >
        <Dropdown
          content={<div>content</div>}
          openedByDefault
          data-testid="element"
        >
          <Button />
        </Dropdown>
      </Configuration>,
    );

    const element = screen.getByTestId('element');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: rgb(0, 0, 255)');
  });
});
