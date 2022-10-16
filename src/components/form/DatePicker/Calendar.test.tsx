import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import {Calendar} from "./index";

describe('Form.DatePicker', () => {
  beforeEach(() => {
    const date = new Date(2022, 9, 8);
    render(<Calendar currentMonth={date} selectedDate={date} onChange={() => null} />)
  })

  test('should renders correct number of weeks', async () => {
    const daysOfMonth = screen.queryAllByTestId('alt-test-calendar-day')
    expect(daysOfMonth).toHaveLength(42) // with days from another month
  })
})