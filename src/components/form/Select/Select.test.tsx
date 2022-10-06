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

    const menu = screen.getByTestId('alt-test-select-menu')
    expect(menu).toBeInTheDocument()

    const spain = screen.getByText('Spain')
    await waitFor(() => fireEvent.click(spain))
    rerender(<Select options={DATA} value={value} onChange={onChange} />)

    expect(menu).toBeInTheDocument()
    expect(value).toBe('uk')

    const france = screen.getByText('France')
    await waitFor(() => fireEvent.click(france))
    rerender(<Select options={DATA} value={value} onChange={onChange} />)

    expect(menu).not.toBeInTheDocument()
    expect(value).toBe('france')

    const selectValue = screen.getByTestId('alt-test-select-current-value')
    expect(selectValue).toHaveTextContent('France')
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

    const menu = screen.getByTestId('alt-test-select-menu')
    const search = screen.getByTestId('alt-test-select-search')
    expect(menu).toBeInTheDocument()
    expect(search).toBeInTheDocument()

    await waitFor(() => fireEvent.input(search, { value: 'the' }))
    rerender(<Select options={DATA} value={value} onChange={onChange} searchable />)

    expect(menu.children).toHaveLength(2)
  })
})