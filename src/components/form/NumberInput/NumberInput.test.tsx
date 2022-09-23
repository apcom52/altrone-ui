import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
import NumberInput from "./NumberInput";

describe('Form.PasswordInput', () => {
  test('should renders correctly', () => {
    render(<NumberInput onChange={() => null} title='password' data-testid='input' />)
    const element = screen.getByTitle('password')
    const inputElement = screen.getByTestId('input')
    expect(element).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('type', 'number')
  })

  test('should controls work correctly', async () => {
    render(<NumberInput onChange={() => null} value={6} title='password' data-testid='input' />)
    const inputElement: HTMLInputElement = screen.getByTestId('input')
    const increase = await screen.findByText('expand_less')
    const decrease = await screen.findByText('expand_more')

    expect(Number(inputElement.value)).toBe(6)

    await waitFor(() => fireEvent.click(increase))
    expect(Number(inputElement.value)).toBe(7)

    await waitFor(() => fireEvent.click(decrease))
    expect(Number(inputElement.value)).toBe(6)

    await waitFor(() => fireEvent.click(increase, {
      shiftKey: true
    }))
    expect(Number(inputElement.value)).toBe(16)

    await waitFor(() => fireEvent.click(increase, {
      ctrlKey: true
    }))
    expect(Number(inputElement.value)).toBe(116)

    await waitFor(() => fireEvent.click(decrease, {
      ctrlKey: true
    }))
    expect(Number(inputElement.value)).toBe(16)
  })

  test('should controls work correctly with negatives', async () => {
    render(<NumberInput onChange={() => null} value={6} title='password' data-testid='input' />)
    const inputElement: HTMLInputElement = screen.getByTestId('input')
    const decrease = await screen.findByText('expand_more')

    await waitFor(() => fireEvent.click(decrease, {
      ctrlKey: true
    }))
    expect(Number(inputElement.value)).toBe(0)
  })

  test('should controls work correctly with negatives and allowNegative=true', async () => {
    render(<NumberInput onChange={() => null} value={6} title='password' data-testid='input' allowNegatives />)
    const inputElement: HTMLInputElement = screen.getByTestId('input')
    const decrease = await screen.findByText('expand_more')

    await waitFor(() => fireEvent.click(decrease, {
      ctrlKey: true
    }))
    expect(Number(inputElement.value)).toBe(-94)
  })
})