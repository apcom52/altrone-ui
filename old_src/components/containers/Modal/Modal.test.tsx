import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './Modal';
import { timeout } from '../../../utils';

describe('Containers.Modal', () => {
  test('should renders correctly', () => {
    render(
      <Modal onClose={() => null} title="Modal title">
        modal content
      </Modal>
    );

    const title = screen.getByTestId('alt-test-modal-title');
    const content = screen.getByTestId('alt-test-modal-content');
    const closeButton = screen.getByTestId('alt-test-modal-close');
    const cancelButton = screen.getByTestId('alt-test-modal-cancel');

    expect(title).toHaveTextContent('Modal title');
    expect(content).toHaveTextContent('modal content');
    expect(closeButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  test('should close works correctly (close button)', async () => {
    const closeHandler = jest.fn();

    render(
      <Modal onClose={closeHandler} title="Modal title" reduceMotion>
        modal content
      </Modal>
    );

    const closeButton = screen.getByTestId('alt-test-modal-close');

    fireEvent.click(closeButton);

    await timeout(500);
    expect(closeHandler).toBeCalled();
  });

  test('should close works correctly (cancel button)', async () => {
    const closeHandler = jest.fn();

    render(
      <Modal onClose={closeHandler} title="Modal title" reduceMotion>
        modal content
      </Modal>
    );

    const cancelButton = screen.getByTestId('alt-test-modal-cancel');

    fireEvent.click(cancelButton);

    await timeout(500);
    expect(closeHandler).toBeCalled();
  });

  test('should close works correctly (wrapper)', async () => {
    const closeHandler = jest.fn();

    render(
      <Modal onClose={closeHandler} title="Modal title" reduceMotion>
        modal content
      </Modal>
    );

    const wrapper = screen.getByTestId('alt-test-modalWrapper') as HTMLDivElement;

    fireEvent.click(wrapper);

    await timeout(500);
    expect(closeHandler).toBeCalled();
  });

  test('should custom actions works correctly', async () => {
    const customActionHandler = jest.fn();

    render(
      <Modal
        onClose={() => null}
        title="Modal title"
        actions={[
          {
            label: 'Action',
            onClick: customActionHandler
          }
        ]}
        reduceMotion>
        modal content
      </Modal>
    );

    const action = screen.getByText('Action');

    fireEvent.click(action);

    expect(customActionHandler).toBeCalledTimes(1);
  });
});
