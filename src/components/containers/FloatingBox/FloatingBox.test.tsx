import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
import {FloatingBox} from "./index";
import {Button} from "../../button";

describe('Containers.FloatingBox', () => {
  test('should returns null in target is undefined', () => {
    const { container } = render(<FloatingBox targetRef={null} onClose={() => null}>demo</FloatingBox>)

    expect(container).toContainHTML('')
  })

  test('should preventClose works correctly', async () => {
    const { rerender } = render(<div className='altrone'>
      <Button className='close'>close</Button>
      <Button className='not-close'>not close</Button>
      <FloatingBox targetRef={null as any} onClose={() => null} preventClose={(e) => {
        return e.target?.classList.contains('not-close')
      }}>demo</FloatingBox>
    </div>)

    const notCloseButton = screen.getByText('not close')
    await waitFor(() => fireEvent.click(notCloseButton))

    rerender(<div className='altrone'>
      <Button className='close'>close</Button>
      <Button className='not-close'>not close</Button>
      <FloatingBox targetRef={null as any} onClose={() => null} preventClose={(e) => {
        return e.target?.classList.contains('not-close')
      }}>demo</FloatingBox>
    </div>)

    expect(screen.getByTestId('alt-test-floating-box')).toBeInTheDocument()
  })

  test('should prevents close if user clicks inside floating box', async () => {
    const closeHandler = jest.fn()

    render(<div className='altrone'>
      <span>outside</span>
      <FloatingBox targetRef={null as any} onClose={closeHandler}><span>inside</span></FloatingBox>
    </div>)

    await waitFor(() => fireEvent.click(screen.getByText('outside')))
    await waitFor(() => fireEvent.click(screen.getByText('inside')))

    expect(closeHandler).toBeCalledTimes(1)
  })

  test('should calculate correct width', async () => {
    const anchor = document.createElement('div')
    anchor.style.width = '400px';
    anchor.style.height = '50px';
    document.body.appendChild(anchor)

    const ref = {}

    render(<>
      <FloatingBox targetRef={anchor} onClose={() => null} useParentWidth ref={ref}>demo</FloatingBox>
    </>)

    expect(ref.modifiers.find(m => m.name === 'sameWidth')).not.toBe(undefined)
  })
})