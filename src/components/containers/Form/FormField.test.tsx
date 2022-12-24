import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import Form from "./Form";
import {FormField} from "./index";
import {TextInput} from "../../form";

class ResizeObserver {
  observe() {
  }
  unobserve() {
  }
  disconnect() {
  }
}

describe('Form.FormField', () => {
  beforeEach(() => {
    window.ResizeObserver = ResizeObserver
  })

  test('should renders correctly', () => {
    render(<Form><FormField>
      <TextInput value='' onChange={() => null} />
    </FormField></Form>)

    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })
})