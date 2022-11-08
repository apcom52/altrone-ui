import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
import {Textarea} from "./index";

describe('Forms.Textarea', () => {
  test('should renders correctly', () => {
    render(<Textarea value='' onChange={() => null} />)
    const textarea = screen.getByRole('textbox')

    expect(textarea).toBeInTheDocument()
    expect(textarea.tagName).toBe('TEXTAREA')
  })

  test('should onChange works correctly', async () => {
    let value = 'Hello, heroes!'

    const onChange = newValue => {
      value = newValue
    }

    render(<Textarea value={value} onChange={onChange} />)
    let textarea = screen.getByRole('textbox')

    await waitFor(() => fireEvent.change(textarea, { target: { value: 'Welcome!' }}))

    expect(value).toBe('Welcome!')
  })
})