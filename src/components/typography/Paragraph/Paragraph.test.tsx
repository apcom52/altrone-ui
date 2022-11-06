import { Paragraph } from './index'
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'

describe('Typography.Paragraph', () => {
  test('should render default paragraph', () => {
    render(<Paragraph data-testid='paragraph'>lorem ipsum</Paragraph>)
    const element = screen.getByTestId('paragraph')
    expect(element).toBeInTheDocument()
  })

  test('should render something without children', () => {
    render(<Paragraph data-testid='paragraph' />)
    const element = screen.getByTestId('paragraph')
    expect(element).toBeInTheDocument()
  })
})