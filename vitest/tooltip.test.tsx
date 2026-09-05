import React, { createRef } from 'react';
import { expect, test, describe } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Tooltip } from '../src/components';

describe('Tooltip', () => {
  test('opens on focus and shows content', () => {
    render(
      <Tooltip content="Saves your changes">
        <button>Save</button>
      </Tooltip>,
    );

    expect(screen.queryByText('Saves your changes')).not.toBeInTheDocument();

    fireEvent.focus(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByText('Saves your changes')).toBeInTheDocument();
  });

  test('renders a HelpCircle button when no children are given', () => {
    render(<Tooltip content="Your secret API key" />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test("forwards ref to the trigger without clobbering the child's own ref", () => {
    const tooltipRef = createRef<HTMLElement>();
    const buttonRef = createRef<HTMLButtonElement>();

    render(
      <Tooltip ref={tooltipRef} content="Delete permanently">
        <button ref={buttonRef}>Delete</button>
      </Tooltip>,
    );

    expect(buttonRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(tooltipRef.current).toBe(buttonRef.current);
  });

  test('className and style apply to the floating panel', () => {
    render(
      <Tooltip content="Tooltip content" className="cls" style={{ color: 'rgb(0, 0, 255)' }}>
        <button>Trigger</button>
      </Tooltip>,
    );

    fireEvent.focus(screen.getByRole('button', { name: 'Trigger' }));

    const panel = screen.getByRole('tooltip');
    expect(panel).toHaveClass('cls');
    expect(panel).toHaveStyle('color: rgb(0, 0, 255)');
  });

  test('title and kbd render alongside content', () => {
    render(
      <Tooltip title="Keyboard shortcut" content="Saves the file" kbd="⌘S">
        <button>Save</button>
      </Tooltip>,
    );

    fireEvent.focus(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByText('Keyboard shortcut')).toBeInTheDocument();
    expect(screen.getByText('Saves the file')).toBeInTheDocument();
    expect(screen.getByText('⌘S')).toBeInTheDocument();
  });
});
