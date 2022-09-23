import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
import PasswordInput from "./PasswordInput";

describe('Form.PasswordInput', () => {
  test('should renders correctly', () => {
    render(<PasswordInput onChange={() => null} title='password' data-testid='input' />)
    const element = screen.getByTitle('password')
    const inputElement = screen.getByTestId('input')
    expect(element).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('type', 'password')
  })

  test('should controls work correctly', async () => {
    render(<PasswordInput onChange={() => null} title='password' data-testid='input' />)
    const inputElement = screen.getByTestId('input')
    const rightIsland = await screen.findByRole('button')

    expect(inputElement).toHaveAttribute('type', 'password')

    await waitFor(() => fireEvent.click(rightIsland))
    expect(inputElement).toHaveAttribute('type', 'text')
  })

  test('should hide controls if appropriate prop is passed', async () => {
    render(<PasswordInput onChange={() => null} title='password' showControls={false} />)
    const buttons = await screen.queryAllByRole('button')
    expect(buttons).toHaveLength(0)
  })
})