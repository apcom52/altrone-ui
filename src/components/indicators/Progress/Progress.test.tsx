import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import {Progress} from "./index";
import {ProgressVariant} from "./Progress";

describe('Indicators.Progress', () => {
  test('should renders correctly', () => {
    render(<Progress value={25} max={100} />)

    const progress = screen.getByTestId('alt-test-progress')
    const active = screen.getByTestId('alt-test-progress-active')

    expect(progress).toBeInTheDocument()
    expect(active).toBeInTheDocument()
  })

  test('should calculate value correctly for default progress', () => {
    render(<Progress value={25} max={100} />)

    const active = screen.getByTestId('alt-test-progress-active')

    expect(active).toHaveStyle({ width: '25%' })
  })

  test('should segmented progress renders correctly', () => {
    render(<Progress value={12} max={25} variant={ProgressVariant.segmented} />)

    const segments = screen.queryAllByTestId('alt-test-progress-segment')

    let activeSegments = 0
    for (const segment of segments) {
      if (segment.classList.contains('alt-progress__segment--active')) {
        activeSegments++
      }
    }

    expect(segments).toHaveLength(25)
    expect(activeSegments).toBe(12)
  })
})