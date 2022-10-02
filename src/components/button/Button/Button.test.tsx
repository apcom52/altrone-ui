import {Button} from './index'
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
import {ButtonStyle, ButtonVariant} from "./Button";
import {Icon} from "../../icons";

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

  test('should be fullWidth if passed prop fluid', () => {
    render(<Button fluid>Example button</Button>)
    const element = screen.getByText('Example button')
    expect(element).toHaveClass('alt-button--fluid')
  })

  test('should contain icons', () => {
    render(<>
      <Button leftIcon={<Icon i='face' />}>Left</Button>
      <Button rightIcon={<Icon i='trash' />}>Right</Button>
      <Button leftIcon={<Icon i='delete' />} rightIcon={<Icon i='phone' />}>Both</Button>
    </>)
    const left = screen.getByText('face')
    const right = screen.getByText('trash')
    const bothLeft = screen.getByText('delete')
    const bothRight = screen.getByText('phone')
    expect(left).toBeInTheDocument()
    expect(right).toBeInTheDocument()
    expect(bothLeft).toBeInTheDocument()
    expect(bothRight).toBeInTheDocument()
  })

  test('should open dropdown', async () => {
    const { rerender } = render(<Button dropdown={[{ title: 'Action', onClick: () => null }]}>Dropdown button</Button>)
    const button = screen.getByText('Dropdown button')
    await waitFor(() => fireEvent.click(button))
    rerender(<Button dropdown={[{ title: 'Action', onClick: () => null }]}>Dropdown button</Button>)
    expect(screen.getByText('Action')).toBeInTheDocument()
  })
})