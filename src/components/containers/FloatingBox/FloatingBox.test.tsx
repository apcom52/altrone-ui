import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FloatingBox } from './index';
import { Button } from '../../button';
import { Altrone } from '../../../hocs';

describe('Containers.FloatingBox', () => {
  test('should returns null in target is undefined', () => {
    const { container } = render(
      <FloatingBox targetElement={null} onClose={() => null}>
        demo
      </FloatingBox>
    );

    expect(container).toContainHTML('');
  });

  test('should preventClose works correctly', async () => {
    const { rerender } = render(
      <div className="altrone">
        <Button className="close">close</Button>
        <Button className="not-close">not close</Button>
        <FloatingBox
          targetElement={null as any}
          onClose={() => null}
          preventClose={(e) => {
            return e.target?.classList.contains('not-close');
          }}>
          demo
        </FloatingBox>
      </div>
    );

    const notCloseButton = screen.getByText('not close');
    await waitFor(() => fireEvent.click(notCloseButton));

    rerender(
      <div className="altrone">
        <Button className="close">close</Button>
        <Button className="not-close">not close</Button>
        <FloatingBox
          targetElement={null as any}
          onClose={() => null}
          preventClose={(e) => {
            return e.target?.classList.contains('not-close');
          }}>
          demo
        </FloatingBox>
      </div>
    );

    expect(screen.getByTestId('alt-test-floating-box')).toBeInTheDocument();
  });

  // test('should prevents close if user clicks inside floating box', async () => {
  //   const closeHandler = jest.fn()
  //
  //   render(<div className='altrone'>
  //     <span>outside</span>
  //     <FloatingBox targetRef={null as any} onClose={closeHandler}><span>inside</span></FloatingBox>
  //   </div>)
  //
  //   await waitFor(() => fireEvent.click(screen.getByText('outside')))
  //   await waitFor(() => fireEvent.click(screen.getByText('inside')))
  //
  //   expect(closeHandler).toBeCalledTimes(1)
  // })

  test('should closeOnAnotherFloatingBoxClick works correctly', async () => {
    const firstClick = jest.fn();
    const secondClick = jest.fn();

    render(
      <Altrone>
        <button>outside</button>
        <FloatingBox
          targetElement={null}
          onClose={firstClick}
          closeOnAnotherFloatingBoxClick={true}>
          <button>first popup</button>
        </FloatingBox>
        <FloatingBox
          targetElement={null}
          onClose={secondClick}
          closeOnAnotherFloatingBoxClick={false}>
          <button>second popup</button>
        </FloatingBox>
      </Altrone>
    );

    const firstButton = screen.getByText('first popup');
    const secondButton = screen.getByText('second popup');
    const outsideButton = screen.getByText('outside');

    await waitFor(() => fireEvent.click(firstButton));

    await waitFor(() => expect(firstClick).toBeCalledTimes(0));
    await waitFor(() => expect(secondClick).toBeCalledTimes(0));

    await waitFor(() => fireEvent.click(secondButton));

    await waitFor(() => expect(firstClick).toBeCalledTimes(1));
    await waitFor(() => expect(secondClick).toBeCalledTimes(0));

    await waitFor(() => fireEvent.click(outsideButton));

    await waitFor(() => expect(firstClick).toBeCalledTimes(2));
    await waitFor(() => expect(secondClick).toBeCalledTimes(1));
  });
});
