import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
import {Calendar} from "./index";

describe('Form.DatePicker', () => {
  test('calendar should renders correct number of weeks', async () => {
    const date = new Date(2022, 9, 8);
    render(<Calendar currentMonth={date} selectedDate={date} onChange={() => null} />)

    const daysOfMonth = screen.queryAllByTestId('alt-test-calendar-day')
    expect(daysOfMonth).toHaveLength(42) // with days from another month

    let daysInMonth = 0
    let daysFromAnotherMonths = 0
    for (const dayElement of daysOfMonth) {
      if (dayElement.classList.contains('alt-calendar__day--another-month')) {
        daysFromAnotherMonths++
      } else {
        daysInMonth++
      }
    }

    expect(daysInMonth).toBe(31)
    expect(daysFromAnotherMonths).toBe(11)
  })

  test('calendar should calculate day numbers from another month correctly', () => {
    const date = new Date(2022, 9, 8);
    render(<Calendar currentMonth={date} selectedDate={date} onChange={() => null} />)

    const daysOfMonth = screen.queryAllByTestId('alt-test-calendar-day')
    const daysOfSeptember = []
    const daysOfNovember = []

    for (const septemberDay of daysOfMonth.slice(0, 5)) {
      daysOfSeptember.push(septemberDay.innerHTML)
    }

    for (const novemberDay of daysOfMonth.slice(36, 42)) {
      daysOfNovember.push(novemberDay.innerHTML)
    }

    expect(daysOfSeptember).toStrictEqual(['26', '27', '28', '29', '30'])
    expect(daysOfNovember).toStrictEqual(['1', '2', '3', '4', '5', '6'])
  })

  test('calendar should highlight selected day correctly', () => {
    const date = new Date(2022, 9, 8);
    render(<Calendar currentMonth={date} selectedDate={date} onChange={() => null} />)

    const selectedDate = screen.getByText('8')

    expect(selectedDate).toHaveClass('alt-calendar__day--selected')
  })

  test('calendar should onChange works correctly', async () => {
    let value = new Date(2022, 9, 8);
    const onChange = (date) => {
      value = date
    }
    render(<Calendar currentMonth={value} selectedDate={value} onChange={onChange} />)

    const newSelectedDay = screen.getByText('15')
    await waitFor(() => fireEvent.click(newSelectedDay))

    expect([value.getFullYear(), value.getMonth(), value.getDate()]).toStrictEqual([2022, 9, 15])
  })
})