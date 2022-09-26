import {act, fireEvent, render, renderHook, screen, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
import NumberInput from "./NumberInput";

describe('Form.PasswordInput', () => {
  test('should renders correctly', () => {
    render(<NumberInput value={0} onChange={() => null} />)
    const element = screen.getByRole('textbox')
    expect(element).toBeInTheDocument()
  })

  test('should controls work correctly', async () => {
    let value = 6

    const onChange = (newValue) => {
      value = newValue
    }

    const {rerender} = render(<NumberInput onChange={onChange} value={value} title='password' data-testid='input' max={200} />)
    const increase = await screen.findByText('expand_less')
    const decrease = await screen.findByText('expand_more')

    expect(value).toBe(6)

    await waitFor(() => fireEvent.click(increase))
    expect(value).toBe(7)
    rerender(<NumberInput onChange={onChange} value={value} title='password' data-testid='input' max={200} />)

    await waitFor(() => fireEvent.click(decrease))
    expect(value).toBe(6)
  })

  test('should controls work correctly with negatives', async () => {
    let value = 1

    const onChange = (newValue) => {
      value = newValue
    }

    const { rerender } = render(<NumberInput onChange={onChange} value={value} allowNegative />)
    const decrease = await screen.findByText('expand_more')

    await waitFor(() => fireEvent.click(decrease))
    rerender(<NumberInput onChange={onChange} value={value} allowNegative />)

    await waitFor(() => fireEvent.click(decrease))
    rerender(<NumberInput onChange={onChange} value={value} allowNegative />)

    await waitFor(() => {
      expect(value).toBe(-1)
    })
  })

  test('should work correctly with max and min', async () => {
    let value = 10

    const onChange = (newValue) => {
      value = newValue
    }

    const { rerender } = render(<NumberInput onChange={onChange} value={value} max={10} min={3} />)

    const increase = await screen.findByText('expand_less')
    const decrease = await screen.findByText('expand_more')

    expect(increase.parentElement).toHaveAttribute('disabled', '')

    await waitFor(() => fireEvent.click(increase))
    await waitFor(() => rerender(<NumberInput onChange={onChange} value={value} max={10} min={3} />))
    expect(value).toBe(10)

    value = 4
    await waitFor(() => rerender(<NumberInput onChange={onChange} value={value} max={10} min={3} />))

    await waitFor(() => fireEvent.click(decrease))
    await waitFor(() => rerender(<NumberInput onChange={onChange} value={value} max={10} min={3} />))
    expect(value).toBe(3)
    expect(decrease.parentElement).toHaveAttribute('disabled', '')
  })
})