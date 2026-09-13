import { createRef } from 'react';
import { expect, test, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Spoiler } from '../src';

describe('Spoiler', () => {
  test('is collapsed by default: no content, header reports aria-expanded=false', () => {
    render(
      <Spoiler title="Title" data-testid="spoiler">
        Body content
      </Spoiler>,
    );

    expect(screen.queryByText('Body content')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Title' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  test('clicking the header reveals the content and flips aria-expanded', () => {
    render(<Spoiler title="Title">Body content</Spoiler>);

    fireEvent.click(screen.getByRole('button', { name: 'Title' }));

    expect(screen.getByText('Body content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Title' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  test('openedByDefault renders the content on mount', () => {
    render(
      <Spoiler title="Title" openedByDefault>
        Body content
      </Spoiler>,
    );

    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  test('the header controls the content region via aria-controls', () => {
    render(
      <Spoiler title="Title" openedByDefault>
        Body content
      </Spoiler>,
    );

    const id = screen
      .getByRole('button', { name: 'Title' })
      .getAttribute('aria-controls');
    expect(id).toBeTruthy();
    expect(screen.getByText('Body content').closest(`#${id}`)).not.toBeNull();
  });

  test('onToggle fires with the next open state and the click event', () => {
    const onToggle = vi.fn();
    render(
      <Spoiler title="Title" onToggle={onToggle}>
        Body content
      </Spoiler>,
    );

    const header = screen.getByRole('button', { name: 'Title' });
    fireEvent.click(header);
    expect(onToggle).toHaveBeenLastCalledWith(true, expect.anything());

    fireEvent.click(header);
    expect(onToggle).toHaveBeenLastCalledWith(false, expect.anything());
  });

  test('forwards className, style and ref to the root element', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Spoiler
        ref={ref}
        title="Title"
        className="cls"
        style={{ color: 'rgb(0, 0, 255)' }}
        data-testid="spoiler"
      >
        Body content
      </Spoiler>,
    );

    const root = screen.getByTestId('spoiler');
    expect(root).toHaveClass('cls');
    expect(root).toHaveStyle('color: rgb(0, 0, 255)');
    expect(ref.current).toBe(root);
  });

  test('accepts a non-string title', () => {
    render(
      <Spoiler title={<span data-testid="custom-title">Custom</span>}>
        Body content
      </Spoiler>,
    );

    expect(screen.getByTestId('custom-title')).toBeInTheDocument();
  });
});
