import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
import {Checkbox} from "./index";

describe('Form.Checkbox', () => {
  test('should renders correctly', () => {
    render(<Checkbox onChange={() => null}>Checkbox</Checkbox>)
    const input = screen.getByRole('checkbox')

    expect(input).toBeInTheDocument()
  })

  test('should checked works correctly', async () => {
    let checked = false

    const onChange = (state) => {
      checked = state
    }

    render(<Checkbox onChange={onChange}>Checkbox</Checkbox>)
    const input = screen.getByRole('checkbox')

    await waitFor(() => fireEvent.click(input))
    expect(checked).toBe(true)
  })

  test('should disabled prop works correctly', () => {
    render(<Checkbox disabled onChange={() => null}>Checkbox</Checkbox>)
    const input = screen.getByRole('checkbox')

    expect(input).toHaveAttribute('disabled', '')
  })
})