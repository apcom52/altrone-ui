import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
import {YearPicker} from "./index";

describe('Form.DatePicker', () => {
  beforeEach(() => {
    Element.prototype.scrollTo = jest.fn()
  })

  test('YearPicker should renders correctly', () => {
    const date = new Date(2022, 0, 1)
    render(<YearPicker currentMonth={date} selectedDate={date} onChange={() => null} minYear={2015} maxYear={2030} />)

    const selectedYear = screen.getByText('2022')
    const children = selectedYear.parentElement.children
    expect(children).toHaveLength(16)
    expect(children[0].innerHTML).toBe('2015')
    expect(children[children.length - 1].innerHTML).toBe('2030')
  })

  test('YearPicker should change date correctly', async () => {
    let value = new Date(2022, 0, 1)
    const onChange = date => {
      value = date
    }

    render(<YearPicker currentMonth={value} selectedDate={value} onChange={onChange} minYear={2000} maxYear={2030} />)

    const year2025 = screen.getByText('2025')

    await waitFor(() => fireEvent.click(year2025))

    expect(value.getFullYear()).toStrictEqual(2025)
  })
})