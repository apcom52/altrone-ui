import { expect, test, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Application, Slider } from '../src/components';

function renderDragSlider() {
  const onChange = vi.fn();
  const onChangeEnd = vi.fn();
  const { unmount } = render(
    <Application>
      <Slider value={10} onChange={onChange} onChangeEnd={onChangeEnd} />
    </Application>,
  );
  const slider = screen.getByRole('slider');
  let capturedPointer: number | undefined;
  slider.setPointerCapture = (pointerId) => {
    capturedPointer = pointerId;
  };
  slider.hasPointerCapture = (pointerId) => capturedPointer === pointerId;
  slider.releasePointerCapture = () => {
    capturedPointer = undefined;
  };
  vi.spyOn(slider.firstElementChild!.nextElementSibling!, 'getBoundingClientRect')
    .mockReturnValue({ ...slider.getBoundingClientRect(), width: 100 });
  return { slider, onChange, onChangeEnd, unmount };
}

function pointer(target: EventTarget, type: string, clientX = 0, pointerId = 1) {
  const event = new MouseEvent(type, { bubbles: true, clientX });
  Object.defineProperty(event, 'pointerId', { value: pointerId });
  fireEvent(target, event);
  return event;
}

describe('Slider', () => {
  test('commits the last emitted drag value before the parent updates value', () => {
    const { slider, onChange, onChangeEnd } = renderDragSlider();
    pointer(slider, 'pointerdown', 30);
    const move = pointer(document, 'pointermove', 75);
    pointer(document, 'pointermove', 90, 2);
    pointer(document, 'pointerup', 90, 2);
    expect(slider).toHaveAttribute('data-slider-active', 'true');
    expect(onChange).toHaveBeenLastCalledWith(75, move);
    const end = pointer(document, 'pointerup', 75);
    pointer(slider, 'lostpointercapture');
    expect(onChangeEnd).toHaveBeenCalledTimes(1);
    expect(onChangeEnd).toHaveBeenCalledWith(75, end);
    expect(slider).toHaveAttribute('data-slider-active', 'false');
  });

  test.each(['pointercancel', 'lostpointercapture'])(
    '%s discards the active drag and allows a new one',
    (type) => {
      const { slider, onChange, onChangeEnd } = renderDragSlider();
      pointer(slider, 'pointerdown', 30);
      pointer(slider, type);
      expect(slider).toHaveAttribute('data-slider-active', 'false');
      pointer(document, 'pointermove', 75);
      pointer(document, 'pointerup', 75);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChangeEnd).not.toHaveBeenCalled();

      pointer(slider, 'pointerdown', 50, 2);
      const end = pointer(document, 'pointerup', 50, 2);
      expect(onChangeEnd).toHaveBeenCalledTimes(1);
      expect(onChangeEnd).toHaveBeenCalledWith(50, end);
    },
  );

  test('removes the active drag listeners on unmount', () => {
    const { slider, onChange, onChangeEnd, unmount } = renderDragSlider();
    pointer(slider, 'pointerdown', 30);
    unmount();
    pointer(document, 'pointermove', 75);
    pointer(document, 'pointerup', 75);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChangeEnd).not.toHaveBeenCalled();
    expect(slider.hasPointerCapture(1)).toBe(false);
  });

  test('check that inner input has all necessary attributes', () => {
    const { container } = render(
      <Application>
        <Slider
          value={15}
          min={-50}
          max={100}
          onChange={() => null}
          name="test"
        />
      </Application>,
    );

    const element = container.querySelector('input') as HTMLInputElement;
    expect(element.value).toBe('15');
    expect(element.name).toBe('test');
  });

  test('check aria attributes', () => {
    render(
      <Application>
        <Slider
          value={15}
          min={-50}
          max={500}
          onChange={() => null}
          readOnly
          data-testid="slider1"
        />
        <Slider
          value={44}
          onChange={() => null}
          orientation="vertical"
          data-testid="slider2"
          disabled
          renderLabel={(value) => `${value}m2`}
        />
      </Application>,
    );

    const element = screen.getByTestId('slider1');
    expect(element).toHaveAttribute('role', 'slider');
    expect(element).toHaveAttribute('aria-orientation', 'horizontal');
    expect(element).toHaveAttribute('aria-valuenow', '15');
    expect(element).toHaveAttribute('aria-valuemin', '-50');
    expect(element).toHaveAttribute('aria-valuemax', '500');
    expect(element).toHaveAttribute('aria-valuetext', '15');

    const element2 = screen.getByTestId('slider2');
    expect(element2).toHaveAttribute('role', 'slider');
    expect(element2).toHaveAttribute('aria-orientation', 'vertical');
    expect(element2).toHaveAttribute('aria-valuenow', '44');
    expect(element2).toHaveAttribute('aria-valuemin', '0');
    expect(element2).toHaveAttribute('aria-valuemax', '100');
    expect(element2).toHaveAttribute('aria-valuetext', '44m2');
  });

  test('renderLabel drives the visible read-only label', () => {
    render(
      <Application>
        <Slider
          value={44}
          onChange={() => null}
          readOnly
          data-testid="slider2"
          renderLabel={(value) => `${value}m2`}
        />
      </Application>,
    );

    const element = screen.getByTestId('slider2');
    expect(element).toHaveTextContent('44m2');
  });

  test('check that className, style, activeClassName, activeStyle props works', () => {
    const { container } = render(
      <Application>
        <Slider
          value={44}
          onChange={() => null}
          data-testid="slider"
          className="cls"
          style={{ color: 'rgb(0, 0, 255)' }}
          activeClassName="active-cls"
          activeStyle={{ color: 'rgb(255, 0, 0)' }}
        />
      </Application>,
    );

    expect(screen.getByTestId('slider')).toHaveClass('cls');
    expect(screen.getByTestId('slider')).toHaveStyle('color: rgb(0, 0, 255)');

    const element = container.querySelector('.active-cls');
    expect(element).toHaveClass('active-cls');
    expect(element).toHaveStyle('color: rgb(255, 0, 0)');
  });

  test('value bubble portals out of the root so an overflow ancestor cannot clip it', () => {
    render(
      <Application>
        <Slider
          value={30}
          onChange={() => null}
          showCurrentValue="always"
          data-testid="slider3"
          renderLabel={(value) => `${value}%`}
        />
      </Application>,
    );

    const root = screen.getByTestId('slider3');
    const bubble = screen.getByText('30%');

    expect(bubble).toBeInTheDocument();
    expect(root).not.toContainElement(bubble);
  });
});
