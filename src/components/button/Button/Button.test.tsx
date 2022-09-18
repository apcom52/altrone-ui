import {Button} from './index'
import {render, screen, fireEvent} from "@testing-library/react";
import '@testing-library/jest-dom'
import {ButtonStyle, ButtonVariant} from "./Button";

describe('Button.Button', () => {
  test('should be rendered', () => {
    render(<Button>Example button</Button>)
    const element = screen.getByText('Example button')
    expect(element).toBeInTheDocument()
  })

  test('should apply correct classNames', () => {
    render(<Button style={ButtonStyle.primary} variant={ButtonVariant.borders}>Example button</Button>)
    const element = screen.getByText('Example button')
    expect(element.className).toBe('alt-button alt-button--style-primary alt-button--variant-borders')
  })

  test('if href was passed then tagName should be a', () => {
    render(<Button style={ButtonStyle.primary} variant={ButtonVariant.borders} href='https://google.com'>Example button</Button>)
    const element = screen.getByText('Example button')
    expect(element.tagName).toBe('A')
  })

  test('should handle onClick', () => {
    const onClickHandler = jest.fn()
    render(<Button onClick={onClickHandler}>Example button</Button>)
    const element = screen.getByText('Example button')
    fireEvent.click(element)
    expect(onClickHandler).toBeCalledTimes(1)
  })
})