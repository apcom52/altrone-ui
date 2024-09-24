import { render, screen } from '@testing-library/react';
import { Button, Configuration, Dropdown } from '../src/components';
import { vitest } from 'vitest';

describe('Dropdown', () => {
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
        style={{ color: 'blue ' }}
        content={
          <Dropdown.Menu
            data-testid="menu"
            className="cls"
            style={{ color: 'blue ' }}
          >
            <Dropdown.Action
              label="Action"
              data-testid="action"
              className="cls"
              style={{ color: 'blue ' }}
            />
            <Dropdown.Checkbox
              checked={false}
              onChange={vitest.fn()}
              label="Action"
              data-testid="checkbox"
              className="cls"
              style={{ color: 'blue ' }}
            />
            <Dropdown.RadioList
              value=""
              onChange={vitest.fn()}
              data-testid="radiolist"
              className="cls"
              style={{ color: 'blue ' }}
            >
              <Dropdown.RadioItem
                value=""
                label="Label"
                data-testid="radioitem"
                className="cls"
                style={{ color: 'blue ' }}
              />
            </Dropdown.RadioList>
            <Dropdown.ChildMenu
              label="Action"
              data-testid="childmenu"
              className="cls"
              style={{ color: 'blue ' }}
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
    expect(screen.getByTestId('dropdown')).toHaveStyle('color: blue');

    expect(screen.getByTestId('menu')).toHaveClass('cls');
    expect(screen.getByTestId('menu')).toHaveStyle('color: blue');

    expect(screen.getByTestId('action')).toHaveClass('cls');
    expect(screen.getByTestId('action')).toHaveStyle('color: blue');

    expect(screen.getByTestId('checkbox')).toHaveClass('cls');
    expect(screen.getByTestId('checkbox')).toHaveStyle('color: blue');

    expect(screen.getByTestId('radiolist')).toHaveClass('cls');
    expect(screen.getByTestId('radiolist')).toHaveStyle('color: blue');

    expect(screen.getByTestId('radioitem')).toHaveClass('cls');
    expect(screen.getByTestId('radioitem')).toHaveStyle('color: blue');

    expect(screen.getByTestId('childmenu')).toHaveClass('cls');
    expect(screen.getByTestId('childmenu')).toHaveStyle('color: blue');
  });

  test('check that Scrollable configuration works correctly', () => {
    render(
      <Configuration dropdown={{ className: 'cls', style: { color: 'blue' } }}>
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
    expect(element).toHaveStyle('color: blue');
  });
});
