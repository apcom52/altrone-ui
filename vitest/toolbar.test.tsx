import React from 'react';
import { expect, test, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { AltroneApplication, Toolbar } from '../src/components';

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

  test('toolbar `size` cascades to nested Toolbar.Action unless the action overrides it', () => {
    render(
      <AltroneApplication>
        <Toolbar size="mini">
          <Toolbar.Action label="inherited" />
          <Toolbar.Action label="overridden" size="xl" />
        </Toolbar>
      </AltroneApplication>,
    );

    expect(screen.getByRole('button', { name: 'inherited' }).className).toMatch(
      /Mini/,
    );
    expect(screen.getByRole('button', { name: 'overridden' }).className).toMatch(
      /XLarge/,
    );
  });

  test('deprecated `fixed` prop warns, `sticky` does not', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { rerender } = render(
      <AltroneApplication>
        <Toolbar fixed />
      </AltroneApplication>,
    );
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('fixed'));

    warn.mockClear();
    rerender(
      <AltroneApplication>
        <Toolbar sticky />
      </AltroneApplication>,
    );
    expect(warn).not.toHaveBeenCalled();

    warn.mockRestore();
  });

  test('floating variant wraps children in a click-through inner layer; glass does not', () => {
    const { rerender } = render(
      <AltroneApplication>
        <Toolbar variant="floating">
          <Toolbar.Group data-testid="group" />
        </Toolbar>
      </AltroneApplication>,
    );

    const group = screen.getByTestId('group');
    const toolbar = group.closest('[role="toolbar"]');
    expect(toolbar).not.toBeNull();
    expect(group.parentElement).not.toBe(toolbar);
    expect(group.parentElement?.parentElement).toBe(toolbar);

    rerender(
      <AltroneApplication>
        <Toolbar variant="glass">
          <Toolbar.Group data-testid="group" />
        </Toolbar>
      </AltroneApplication>,
    );
    expect(screen.getByTestId('group').parentElement).toBe(
      screen.getByTestId('group').closest('[role="toolbar"]'),
    );
  });

  test('Toolbar.Group is a glass pill in every variant except `plain`', () => {
    const { rerender } = render(
      <AltroneApplication>
        <Toolbar variant="glass">
          <Toolbar.Group data-testid="group" />
        </Toolbar>
      </AltroneApplication>,
    );
    expect(screen.getByTestId('group').className).toMatch(/Pill/);

    rerender(
      <AltroneApplication>
        <Toolbar variant="floating">
          <Toolbar.Group data-testid="group" />
        </Toolbar>
      </AltroneApplication>,
    );
    expect(screen.getByTestId('group').className).toMatch(/Pill/);

    rerender(
      <AltroneApplication>
        <Toolbar variant="plain">
          <Toolbar.Group data-testid="group" />
        </Toolbar>
      </AltroneApplication>,
    );
    expect(screen.getByTestId('group').className).not.toMatch(/Pill/);
  });

  test('Toolbar.Group `variant` overrides the toolbar variant per group', () => {
    const { rerender } = render(
      <AltroneApplication>
        <Toolbar variant="plain">
          <Toolbar.Group data-testid="group" variant="glass" />
        </Toolbar>
      </AltroneApplication>,
    );
    expect(screen.getByTestId('group').className).toMatch(/Pill/);

    rerender(
      <AltroneApplication>
        <Toolbar variant="glass">
          <Toolbar.Group data-testid="group" variant="plain" />
        </Toolbar>
      </AltroneApplication>,
    );
    expect(screen.getByTestId('group').className).not.toMatch(/Pill/);
  });

  test('Toolbar.Logo renders its mark and forwards a ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <AltroneApplication>
        <Toolbar>
          <Toolbar.Leading>
            <Toolbar.Logo ref={ref} data-testid="logo">
              <svg data-testid="mark" />
            </Toolbar.Logo>
          </Toolbar.Leading>
        </Toolbar>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('mark')).toBeInTheDocument();
    expect(ref.current).toBe(screen.getByTestId('logo'));
  });

  test('Toolbar.Title is plain text until `clickable`, then gets a chevron + pointer', () => {
    const { rerender } = render(
      <AltroneApplication>
        <Toolbar>
          <Toolbar.Title label="Docs" />
        </Toolbar>
      </AltroneApplication>,
    );
    const staticTitle = screen.getByText('Docs');
    expect(staticTitle.className).not.toMatch(/Clickable/);
    expect(staticTitle.querySelector('svg')).toBeNull();

    rerender(
      <AltroneApplication>
        <Toolbar>
          <Toolbar.Title label="Docs" clickable />
        </Toolbar>
      </AltroneApplication>,
    );
    const clickableTitle = screen.getByText('Docs');
    expect(clickableTitle.className).toMatch(/Clickable/);
    expect(clickableTitle.querySelector('svg')).not.toBeNull();
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
