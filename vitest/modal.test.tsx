import React from 'react';
import { createPortal } from 'react-dom';
import { expect, test, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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
          openedByDefault={true}
        >
          <button>test</button>
        </Modal>
      </Application>,
    );

    expect(screen.getByTestId('modal')).toHaveClass('cls');
    expect(screen.getByTestId('modal')).toHaveStyle('color: rgb(0, 0, 255)');
  });

  test("opening the modal keeps the trigger's own onClick", () => {
    const triggerClick = vi.fn();

    render(
      <Application>
        <Modal content={<div>content</div>}>
          <button onClick={triggerClick}>open</button>
        </Modal>
      </Application>,
    );

    fireEvent.click(screen.getByText('open'));

    expect(triggerClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('clicking the backdrop closes the modal', () => {
    const onClose = vi.fn();

    render(
      <Application>
        <Modal
          data-testid="modal"
          content={<div>content</div>}
          onClose={onClose}
          openedByDefault={true}
        >
          <button>test</button>
        </Modal>
      </Application>,
    );

    fireEvent.click(screen.getByTestId('modal'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('clicking inside the dialog does not close the modal', () => {
    const onClose = vi.fn();

    render(
      <Application>
        <Modal
          content={<div>content</div>}
          onClose={onClose}
          openedByDefault={true}
        >
          <button>test</button>
        </Modal>
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
              {createPortal(
                <button>portaled option</button>,
                document.body,
              )}
            </>
          }
          onClose={onClose}
          openedByDefault={true}
        >
          <button>test</button>
        </Modal>
      </Application>,
    );

    fireEvent.click(screen.getByText('portaled option'));

    expect(onClose).not.toHaveBeenCalled();
  });

  test('Escape closes the modal and calls onClose exactly once', () => {
    const onClose = vi.fn();

    render(
      <Application>
        <Modal
          content={<div>content</div>}
          onClose={onClose}
          openedByDefault={true}
        >
          <button>test</button>
        </Modal>
      </Application>,
    );

    fireEvent.keyDown(document.body, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
