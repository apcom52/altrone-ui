import { createPortal } from 'react-dom';
import { expect, test, describe, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Application, Modal } from '../src/components';

describe('Modal', () => {
  test('className and style are applied to the root element', () => {
    render(
      <Application>
        <Modal
          data-testid="modal"
          className="cls"
          style={{ color: 'rgb(0, 0, 255)' }}
          content={<div>content</div>}
          defaultOpen={true}
        />
      </Application>,
    );

    expect(screen.getByTestId('modal')).toHaveClass('cls');
    expect(screen.getByTestId('modal')).toHaveStyle('color: rgb(0, 0, 255)');
  });

  test('`open` controls visibility', () => {
    const { rerender } = render(
      <Application>
        <Modal content={<div>content</div>} open={false} />
      </Application>,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    rerender(
      <Application>
        <Modal content={<div>content</div>} open={true} />
      </Application>,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('clicking the backdrop closes the modal', () => {
    const onClose = vi.fn();

    render(
      <Application>
        <Modal
          content={<div>content</div>}
          onClose={onClose}
          defaultOpen={true}
        />
      </Application>,
    );

    fireEvent.click(document.querySelector('[class*="Backdrop"]')!);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('clicking inside the dialog does not close the modal', () => {
    const onClose = vi.fn();

    render(
      <Application>
        <Modal
          content={<div>content</div>}
          onClose={onClose}
          defaultOpen={true}
        />
      </Application>,
    );

    fireEvent.click(screen.getByText('content'));

    expect(onClose).not.toHaveBeenCalled();
  });

  test('clicking a modal-owned overlay that portals out does not close it', () => {
    const onClose = vi.fn();

    render(
      <Application>
        <Modal
          content={
            <>
              content
              {createPortal(<button>portaled option</button>, document.body)}
            </>
          }
          onClose={onClose}
          defaultOpen={true}
        />
      </Application>,
    );

    fireEvent.click(screen.getByText('portaled option'));

    expect(onClose).not.toHaveBeenCalled();
  });

  test('showCloseButton={false} hides the header close button, footer stays untouched', () => {
    render(
      <Application>
        <Modal
          content={<div>content</div>}
          showCloseButton={false}
          defaultOpen={true}
        />
      </Application>,
    );

    expect(
      screen.queryByRole('button', { name: 'Close' }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  test('the empty area of the scrolling layer closes the modal, the panel does not', () => {
    const onClose = vi.fn();

    render(
      <Application>
        <Modal
          content={<div>content</div>}
          onClose={onClose}
          defaultOpen={true}
        />
      </Application>,
    );

    fireEvent.click(screen.getByText('content'));
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.click(document.querySelector('[class*="ScrollContent"]')!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('Escape closes the modal and calls onClose exactly once', () => {
    const onClose = vi.fn();

    render(
      <Application>
        <Modal
          content={<div>content</div>}
          onClose={onClose}
          defaultOpen={true}
        />
      </Application>,
    );

    fireEvent.keyDown(document.body, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('Modal initial focus', () => {
  test('uses the close button when content does not claim focus', () => {
    const { rerender } = render(
      <Application>
        <Modal open={false} content={<div>Content</div>} />
      </Application>,
    );
    rerender(
      <Application>
        <Modal open content={<div>Content</div>} />
      </Application>,
    );
    expect(
      screen.getByRole('button', { name: 'Close', exact: true }),
    ).toHaveFocus();
  });

  test('preserves autofocus in footer actions', () => {
    render(
      <Application>
        <Modal
          defaultOpen
          content={<div>Content</div>}
          actions={<button autoFocus>Primary action</button>}
        />
      </Application>,
    );
    expect(
      screen.getByRole('button', { name: 'Primary action' }),
    ).toHaveFocus();
  });

  test('autofocus is preserved when a modal is opened again', async () => {
    const content = <input aria-label="Modal input" autoFocus />;
    const { rerender } = render(
      <Application>
        <Modal open content={content} />
      </Application>,
    );
    expect(screen.getByRole('textbox', { name: 'Modal input' })).toHaveFocus();
    rerender(
      <Application>
        <Modal open={false} content={content} />
      </Application>,
    );
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    );
    rerender(
      <Application>
        <Modal open content={content} />
      </Application>,
    );
    expect(screen.getByRole('textbox', { name: 'Modal input' })).toHaveFocus();
  });
});
