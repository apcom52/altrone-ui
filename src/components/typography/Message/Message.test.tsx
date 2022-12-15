import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import {Message} from "./index";

describe('Typography.Message', () => {
  test('should renders correctly', () => {
    render(<Message title='Message title'>Message content</Message>)

    const title = screen.getByText('Message title')
    const description = screen.getByText('Message content')

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  test('should has special class if has not got children', () => {
    render(<Message title='Message title' />)

    const message = screen.getByTestId('alt-test-message')
    expect(message).toHaveClass('alt-message--only-title')
  })
})