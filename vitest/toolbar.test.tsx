import { render, screen } from '@testing-library/react';
import { Configuration, AltroneApplication, Toolbar } from '../src/components';

describe('Toolbar', () => {
  test('check that className and style props works', () => {
    render(
      <AltroneApplication>
        <Toolbar
          data-testid="toolbar"
          className="cls"
          style={{ color: 'blue' }}
        >
          <Toolbar.Group
            data-testid="group"
            className="group"
            style={{ color: 'red' }}
          >
            <Toolbar.Action
              data-testid="action"
              label="test"
              className="action"
              style={{ color: 'yellow' }}
            />
          </Toolbar.Group>
        </Toolbar>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('toolbar')).toHaveClass('cls');
    expect(screen.getByTestId('toolbar')).toHaveStyle('color: blue');
    expect(screen.getByTestId('group')).toHaveClass('group');
    expect(screen.getByTestId('group')).toHaveStyle('color: red');
    expect(screen.getByTestId('action')).toHaveClass('action');
    expect(screen.getByTestId('action')).toHaveStyle('color: yellow');
  });

  test('check that Toolbar configuration works correctly', () => {
    render(
      <AltroneApplication>
        <Configuration
          toolbar={{
            className: 'cls',
            style: { color: 'blue' },
            groupClassName: 'group',
            actionClassName: 'action',
          }}
        >
          <Toolbar
            data-testid="toolbar"
            className="cls"
            style={{ color: 'blue' }}
          >
            <Toolbar.Group
              data-testid="group"
              className="group"
              style={{ color: 'red' }}
            >
              <Toolbar.Action
                data-testid="action"
                label="test"
                className="action"
                style={{ color: 'yellow' }}
              />
            </Toolbar.Group>
          </Toolbar>
        </Configuration>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('toolbar')).toHaveClass('cls');
    expect(screen.getByTestId('toolbar')).toHaveStyle('color: blue');
    expect(screen.getByTestId('group')).toHaveClass('group');
    expect(screen.getByTestId('action')).toHaveClass('action');
  });
});
