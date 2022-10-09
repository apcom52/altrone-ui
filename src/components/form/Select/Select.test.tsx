import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
import Select from "./Select";
import {Option} from "../../../types";

const DATA: Option[] = [
  { label: 'The United Kingdom', value: 'uk' },
  { label: 'Spain', value: 'spain', disabled: true },
  { label: 'The Unites States of America', value: 'usa' },
  { label: 'France', value: 'france' },
]

describe('Form.Select', () => {
  test('should renders correctly', () => {
    render(<Select options={DATA} value='uk' onChange={() => null} />)
    const select = screen.getByTestId('alt-test-select')

    expect(select).toBeInTheDocument()
  })

  test('should choose an option correctly',  async () => {
    let value = 'uk'

    const onChange = (newValue) => {
      value = newValue
    }

    const { rerender } = render(<Select options={DATA} value={value} onChange={onChange} />)
    const select = screen.getByTestId('alt-test-select')

    await waitFor(() => fireEvent.click(select))
    rerender(<Select options={DATA} value={value} onChange={onChange} />)

    let menu = await screen.findByTestId('alt-test-select-menu')
    expect(menu).toBeInTheDocument()

    await waitFor(() => fireEvent.click(select))
    rerender(<Select options={DATA} value={value} onChange={onChange} />)
    menu = await screen.findByTestId('alt-test-select-menu')

    expect(menu).toBeInTheDocument()
    expect(value).toBe('uk')

    const france = screen.getByText('France')
    await waitFor(() => fireEvent.click(france))
    rerender(<Select options={DATA} value={value} onChange={onChange} />)

    menu = screen.queryByTestId('alt-test-select-menu')

    expect(menu).not.toBeInTheDocument()
    expect(value).toBe('france')

    const selectValue = screen.getByTestId('alt-test-select-current-value')
    expect(selectValue).toHaveTextContent('France')
  })

  test('should select groups shows properly', async () => {

  })

  test('should search works correctly',  async () => {
    let value = 'uk'

    const onChange = (newValue) => {
      value = newValue
    }

    const { rerender } = render(<Select options={DATA} value={value} onChange={onChange} searchable />)
    const select = screen.getByTestId('alt-test-select')

    await waitFor(() => fireEvent.click(select))
    rerender(<Select options={DATA} value={value} onChange={onChange} searchable />)

    let menu = await screen.findByTestId('alt-test-select-menu')
    const search = await screen.findByRole('textbox')
    expect(menu).toBeInTheDocument()
    expect(search).toBeInTheDocument()

    await waitFor(() => fireEvent.change(search, { target: { value: 'the' }}))
    rerender(<Select options={DATA} value={value} onChange={onChange} searchable />)
    menu = await screen.findByTestId('alt-test-select-menu')

    expect(menu.children[0].children).toHaveLength(2)
  })

  test('should disabled works correctly', async () => {
    const onChange = jest.fn()

    render(<Select options={DATA} value='uk' disabled onChange={onChange} />)
    const select = screen.getByTestId('alt-test-select')

    await waitFor(() => fireEvent.click(select))

    expect(onChange).toBeCalledTimes(0)
  })
})