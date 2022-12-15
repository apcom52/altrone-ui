import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
import {Option} from "../../../types";
import {RadioList} from "./index";

const DATA: Option[] = [
  { label: 'January', value: 1 },
  { label: 'February', value: 2 },
  { label: 'March', value: 3 },
  { label: 'April', value: 4 },
  { label: 'May', value: 5 },
  { label: 'June', value: 6 },
  { label: 'July', value: 7 },
  { label: 'August', value: 8, disabled: true },
  { label: 'September', value: 9 },
  { label: 'October', value: 10 },
  { label: 'November', value: 11 },
  { label: 'December', value: 12 },
]

describe('Form.RadioList', () => {
  test('should renders correctly', () => {
    render(<RadioList options={DATA} value={4} onChange={() => null} name='months' />)

    const list = screen.getByTestId('alt-test-radiolist')
    const selectedItem = screen.getByText('April')

    expect(list).toBeInTheDocument()
    expect(selectedItem).toBeInTheDocument()
    expect(selectedItem.parentElement.parentElement.querySelector('input[type="radio"]')).toHaveAttribute('checked', '')
  })

  test('should change value works correctly', async () => {
    let value = 1
    const onChange = newValue => {
      value = newValue
    }

    render(<RadioList options={DATA} value={value} onChange={onChange} name='months' />)

    const june = screen.getByText('June')
    await waitFor(() => fireEvent.click(june))

    expect(value).toBe(6)
  })

  test('should disabled works correctly', async () => {
    let value = 1
    const onChange = newValue => {
      value = newValue
    }

    render(<RadioList options={DATA} value={value} onChange={onChange} name='months' />)

    const june = screen.getByText('August')
    await waitFor(() => fireEvent.click(june))

    expect(value).toBe(1)
  })
})