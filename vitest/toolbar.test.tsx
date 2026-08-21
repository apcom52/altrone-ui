import React from 'react';
import { expect, test, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Configuration, AltroneApplication, Toolbar } from '../src/components';

describe('Toolbar', () => {
  test('check that className and style props works', () => {
    render(
      <AltroneApplication>
        <Toolbar
          data-testid="toolbar"
          className="cls"
          style={{ color: 'rgb(0, 0, 255)' }}
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
    expect(screen.getByTestId('toolbar')).toHaveStyle('color: rgb(0, 0, 255)');
    expect(screen.getByTestId('group')).toHaveClass('group');
    expect(screen.getByTestId('group')).toHaveStyle('color: rgb(255, 0, 0)');
    expect(screen.getByTestId('action')).toHaveClass('action');
    expect(screen.getByTestId('action')).toHaveStyle('color: rgb(255, 255, 0)');
  });

  test('check that Toolbar configuration works correctly', () => {
    render(
      <AltroneApplication>
        <Configuration
          toolbar={{
            className: 'cls',
            style: { color: 'rgb(0, 0, 255)' },
            groupClassName: 'group',
            actionClassName: 'action',
          }}
        >
          <Toolbar
            data-testid="toolbar"
            className="cls"
            style={{ color: 'rgb(0, 0, 255)' }}
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
    expect(screen.getByTestId('toolbar')).toHaveStyle('color: rgb(0, 0, 255)');
    expect(screen.getByTestId('group')).toHaveClass('group');
    expect(screen.getByTestId('action')).toHaveClass('action');
  });
});

describe('Toolbar header actions', () => {
  test('BackAction is icon-only with an accessible label and fires onClick', () => {
    const onClick = vi.fn();
    render(
      <AltroneApplication>
        <Toolbar.BackAction onClick={onClick} />
      </AltroneApplication>,
    );

    const button = screen.getByRole('button', { name: 'Back' });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  test('SidebarToggleAction swaps icon/label based on the controlled collapsed prop', () => {
    const { rerender } = render(
      <AltroneApplication>
        <Toolbar.SidebarToggleAction collapsed={false} onClick={() => {}} />
      </AltroneApplication>,
    );
    expect(
      screen.getByRole('button', { name: 'Collapse sidebar' }),
    ).toBeInTheDocument();

    rerender(
      <AltroneApplication>
        <Toolbar.SidebarToggleAction collapsed={true} onClick={() => {}} />
      </AltroneApplication>,
    );
    expect(
      screen.getByRole('button', { name: 'Expand sidebar' }),
    ).toBeInTheDocument();
  });

  test('BackForwardAction disables and triggers each half independently', () => {
    const onBack = vi.fn();
    const onForward = vi.fn();
    render(
      <AltroneApplication>
        <Toolbar.BackForwardAction
          onBack={onBack}
          onForward={onForward}
          backDisabled
        />
      </AltroneApplication>,
    );

    const backButton = screen.getByRole('button', { name: 'Back' });
    const forwardButton = screen.getByRole('button', { name: 'Forward' });

    expect(backButton).toBeDisabled();
    expect(forwardButton).not.toBeDisabled();

    fireEvent.click(forwardButton);
    expect(onForward).toHaveBeenCalledOnce();
    expect(onBack).not.toHaveBeenCalled();
  });
});
