import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
import {Option} from "../../../types";
import {ScrollableSelector} from "./index";
import {Align} from "../../../types/Align";

const DATA: Option<number>[] = [{
  label: 'Intern',
  value: 0
}, {
  label: 'Junior',
  value: 1
}, {
  label: 'Middle',
  value: 2
}, {
  label: 'Senior',
  value: 3,
}, {
  label: 'Team Lead',
  value: 4,
  disabled: true
}]

describe('Form.ScrollableSelector', () => {
  beforeEach(() => {
    Element.prototype.scrollTo = jest.fn()
  })

  test('should renders correctly', () => {
    render(<ScrollableSelector value={0} options={DATA} onChange={() => null} />)

    const middle = screen.getByText('Middle')
    expect(middle).toBeInTheDocument()
  })

  test('should selects on option', async () => {
    let value = 0
    const onChange = newValue => {
      value = newValue
    }

    const { rerender } = render(<ScrollableSelector value={value} options={DATA} onChange={onChange} />)

    const intern = screen.getByText('Intern')
    expect(intern).toHaveClass('alt-scrollable-selector__option--selected')

    let senior = screen.getByText('Senior')
    await waitFor(() => fireEvent.click(senior))
    rerender(<ScrollableSelector value={value} options={DATA} onChange={onChange} />)
    senior = await screen.findByText('Senior')

    expect(value).toBe(3)
    expect(senior).toHaveClass('alt-scrollable-selector__option--selected')

    let teamlead = screen.getByText('Team Lead')
    await waitFor(() => fireEvent.click(teamlead))
    rerender(<ScrollableSelector value={value} options={DATA} onChange={onChange} />)

    expect(value).toBe(3)
  })

  test('should alignment works correctly', async () => {
    const { rerender } = render(<ScrollableSelector value={0} options={DATA} onChange={() => null} align={Align.start} />)
    let scrollableSelector = screen.getByTestId('alt-test-scrollable-selector')
    expect(scrollableSelector).toHaveClass('alt-scrollable-selector--align-start')

    rerender(<ScrollableSelector value={0} options={DATA} onChange={() => null} align={Align.end} />)
    scrollableSelector = screen.getByTestId('alt-test-scrollable-selector')
    expect(scrollableSelector).toHaveClass('alt-scrollable-selector--align-end')

    rerender(<ScrollableSelector value={0} options={DATA} onChange={() => null} align={Align.center} />)
    scrollableSelector = screen.getByTestId('alt-test-scrollable-selector')
    expect(scrollableSelector).not.toHaveClass('alt-scrollable-selector--align-start')
    expect(scrollableSelector).not.toHaveClass('alt-scrollable-selector--align-end')
  })

  test('should disabled works correctly', async () => {
    let value = 0
    const onChange = newValue => {
      value = newValue
    }

    render(<ScrollableSelector value={value} options={DATA} onChange={onChange} disabled />)

    const junior = screen.getByText('Junior')
    const senior = screen.getByText('Senior')

    await waitFor(() => fireEvent.click(junior))
    expect(value).toBe(0)
    expect(junior).toHaveAttribute('disabled', '')

    await waitFor(() => fireEvent.click(senior))
    expect(value).toBe(0)
    expect(senior).toHaveAttribute('disabled', '')
  })
})