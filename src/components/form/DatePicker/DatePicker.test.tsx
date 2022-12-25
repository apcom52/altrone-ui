import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DatePicker } from './index';
import { Picker } from './DatePicker';

describe('Form.DatePicker', () => {
  beforeEach(() => {
    Element.prototype.scrollTo = jest.fn();
  });

  test('should renders correctly', async () => {
    const { rerender } = render(<DatePicker value={new Date()} onChange={() => null} />);

    let datePicker = screen.getByTestId('alt-test-datepicker');
    await waitFor(() => fireEvent.click(datePicker));

    rerender(<DatePicker value={new Date()} onChange={() => null} />);
    const calendar = screen.getByTestId('alt-test-calendar');
    expect(datePicker).toBeInTheDocument();
    expect(calendar).toBeInTheDocument();
  });

  test('should shows correct picker', async () => {
    const { rerender } = render(
      <DatePicker value={new Date()} onChange={() => null} picker={Picker.day} />
    );

    const datePicker = screen.getByTestId('alt-test-datepicker');
    await waitFor(() => fireEvent.click(datePicker));
    rerender(<DatePicker value={new Date()} onChange={() => null} picker={Picker.day} />);

    const floatingBox = screen.getByTestId('alt-test-floating-box');
    expect(floatingBox).toBeInTheDocument();

    const calendar = screen.getByTestId('alt-test-calendar');
    expect(calendar).toBeInTheDocument();

    rerender(<DatePicker value={new Date()} onChange={() => null} picker={Picker.month} />);

    const monthPicker = screen.getByTestId('alt-test-month-picker');
    expect(monthPicker).toBeInTheDocument();

    rerender(<DatePicker value={new Date()} onChange={() => null} picker={Picker.year} />);

    const yearPicker = screen.getByTestId('alt-test-year-picker');
    expect(yearPicker).toBeInTheDocument();
  });

  test('should shows MonthPicker after click on header and Apply', async () => {
    const { rerender } = render(
      <DatePicker value={new Date()} onChange={() => null} picker={Picker.day} />
    );

    const datePicker = screen.getByTestId('alt-test-datepicker');
    await waitFor(() => fireEvent.click(datePicker));
    rerender(<DatePicker value={new Date()} onChange={() => null} picker={Picker.day} />);

    let calendar = screen.getByTestId('alt-test-calendar');
    expect(calendar).toBeInTheDocument();

    const header = screen.getByTestId('alt-test-datepicker-header');
    await waitFor(() => fireEvent.click(header));

    rerender(<DatePicker value={new Date()} onChange={() => null} picker={Picker.day} />);

    const monthPicker = screen.getByTestId('alt-test-month-picker');
    expect(monthPicker).toBeInTheDocument();

    const applyButton = screen.getByTestId('alt-test-datepicker-apply');
    expect(applyButton).toBeInTheDocument();
    await waitFor(() => fireEvent.click(applyButton));

    rerender(<DatePicker value={new Date()} onChange={() => null} picker={Picker.day} />);
    calendar = screen.getByTestId('alt-test-calendar');
    expect(calendar).toBeInTheDocument();
  });

  test('should chooses today day after click on Today', async () => {
    let value = new Date(2021, 4, 25);
    const onChange = (date) => {
      value = date;
    };
    const { rerender } = render(
      <DatePicker value={value} onChange={onChange} picker={Picker.day} />
    );

    const datePicker = screen.getByTestId('alt-test-datepicker');
    await waitFor(() => fireEvent.click(datePicker));
    rerender(<DatePicker value={value} onChange={onChange} picker={Picker.day} />);

    const todayButton = screen.getByTestId('alt-test-datepicker-today');
    await waitFor(() => fireEvent.click(todayButton));

    const today = new Date();
    expect([value.getFullYear(), value.getMonth(), value.getDate()]).toStrictEqual([
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ]);
  });

  test('should closes popup after click on Apply', async () => {
    const { rerender } = render(
      <DatePicker value={new Date()} onChange={() => null} picker={Picker.day} />
    );

    const datePicker = screen.getByTestId('alt-test-datepicker');
    await waitFor(() => fireEvent.click(datePicker));
    rerender(<DatePicker value={new Date()} onChange={() => null} picker={Picker.day} />);

    let calendar = screen.getByTestId('alt-test-calendar');
    expect(calendar).toBeInTheDocument();

    let applyButton = screen.getByTestId('alt-test-datepicker-apply');
    await waitFor(() => fireEvent.click(applyButton));
    rerender(<DatePicker value={new Date()} onChange={() => null} picker={Picker.day} />);

    calendar = screen.queryByTestId('alt-test-calendar');
    expect(calendar).not.toBeInTheDocument();
  });

  test('should Next and Prev buttons work correctly', async () => {
    let value = new Date(2021, 4, 25);
    const onChange = (date) => {
      value = date;
    };
    const { rerender } = render(
      <DatePicker value={value} onChange={onChange} picker={Picker.day} />
    );

    const datePicker = screen.getByTestId('alt-test-datepicker');
    await waitFor(() => fireEvent.click(datePicker));
    rerender(<DatePicker value={value} onChange={onChange} picker={Picker.day} />);

    let nextButton = screen.getByTestId('alt-test-datepicker-next');
    await waitFor(() => fireEvent.click(nextButton));
    rerender(<DatePicker value={value} onChange={onChange} picker={Picker.day} />);

    const nextMonthDay = screen.getByText('10');
    await waitFor(() => fireEvent.click(nextMonthDay));
    rerender(<DatePicker value={value} onChange={onChange} picker={Picker.day} />);

    expect([value.getFullYear(), value.getMonth(), value.getDate()]).toStrictEqual([2021, 5, 10]);
    let prevButton = screen.getByTestId('alt-test-datepicker-prev');

    await waitFor(() => fireEvent.click(prevButton));
    await waitFor(() => fireEvent.click(prevButton));

    rerender(<DatePicker value={value} onChange={onChange} picker={Picker.day} />);

    const prevMonthDay = screen.getByText('15');
    await waitFor(() => fireEvent.click(prevMonthDay));
    rerender(<DatePicker value={value} onChange={onChange} picker={Picker.day} />);

    expect([value.getFullYear(), value.getMonth(), value.getDate()]).toStrictEqual([2021, 3, 15]);
  });
});
