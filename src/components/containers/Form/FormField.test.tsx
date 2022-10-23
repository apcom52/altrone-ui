import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import Form from "./Form";
import {FormField} from "./index";
import {TextInput} from "../../form";

describe('Form.FormField', () => {
  test('should renders correctly', () => {
    render(<Form><FormField>
      <TextInput value='' onChange={() => null} />
    </FormField></Form>)

    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  test('should disabled prop works correctly', () => {
    render(<Form><FormField disabled>
      <TextInput value='' onChange={() => null} />
      <TextInput value='' onChange={() => null} />
    </FormField></Form>)

    const input = screen.queryAllByRole('textbox')
    expect(input[0]).toHaveAttribute('disabled', '')
  })
})