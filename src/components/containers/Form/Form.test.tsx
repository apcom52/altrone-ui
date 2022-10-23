import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import Form from "./Form";

describe('Form.Form', () => {
  test('should renders correctly', () => {
    render(<Form>example</Form>)
    const form = screen.getByTestId('alt-test-form')

    expect(form).toBeInTheDocument()
  })
})