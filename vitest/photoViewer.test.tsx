import { render, screen, fireEvent } from '@testing-library/react';
import { AltroneApplication, PhotoViewer } from '../src/components';
import { vitest } from 'vitest';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('PhotoViewer', () => {
  test('need to show current photo', () => {
    render(
      <PhotoViewer onClose={() => null} data-testid="viewer">
        <PhotoViewer.Image data-testid="first" src="1.jpg" />
        <PhotoViewer.Image data-testid="second" src="2.jpg" />
        <PhotoViewer.Image data-testid="third" src="3.jpg" />
      </PhotoViewer>,
    );

    const element = screen.getByTestId('viewer');
    expect(element).toBeInTheDocument();
    expect(screen.queryByTestId('first')).toBeInTheDocument();
    expect(screen.queryByTestId('second')).not.toBeInTheDocument();
    expect(screen.queryByTestId('third')).not.toBeInTheDocument();
  });

  test('need to show specific photo', () => {
    render(
      <PhotoViewer startsFrom={2} onClose={() => null} data-testid="viewer">
        <PhotoViewer.Image data-testid="first" src="1.jpg" />
        <PhotoViewer.Image data-testid="second" src="2.jpg" />
        <PhotoViewer.Image data-testid="third" src="3.jpg" />
      </PhotoViewer>,
    );

    expect(screen.queryByTestId('first')).not.toBeInTheDocument();
    expect(screen.queryByTestId('second')).not.toBeInTheDocument();
    expect(screen.queryByTestId('third')).toBeInTheDocument();
  });

  test('check photo gallery navigation', () => {
    const { rerender } = render(
      <PhotoViewer onClose={() => null} data-testid="viewer">
        <PhotoViewer.Image data-testid="first" src="1.jpg" />
        <PhotoViewer.Image data-testid="second" src="2.jpg" />
        <PhotoViewer.Image data-testid="third" src="3.jpg" />
      </PhotoViewer>,
    );

    expect(screen.queryByTestId('first')).toBeInTheDocument();
    expect(screen.queryByTestId('second')).not.toBeInTheDocument();
    expect(screen.queryByTestId('third')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('arrow_forward'));

    rerender(
      <PhotoViewer onClose={() => null} data-testid="viewer">
        <PhotoViewer.Image data-testid="first" src="1.jpg" />
        <PhotoViewer.Image data-testid="second" src="2.jpg" />
        <PhotoViewer.Image data-testid="third" src="3.jpg" />
      </PhotoViewer>,
    );

    expect(screen.queryByTestId('first')).not.toBeInTheDocument();
    expect(screen.queryByTestId('second')).toBeInTheDocument();
    expect(screen.queryByTestId('third')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('arrow_back'));

    rerender(
      <PhotoViewer onClose={() => null} data-testid="viewer">
        <PhotoViewer.Image data-testid="first" src="1.jpg" />
        <PhotoViewer.Image data-testid="second" src="2.jpg" />
        <PhotoViewer.Image data-testid="third" src="3.jpg" />
      </PhotoViewer>,
    );

    expect(screen.queryByTestId('first')).toBeInTheDocument();
    expect(screen.queryByTestId('second')).not.toBeInTheDocument();
    expect(screen.queryByTestId('third')).not.toBeInTheDocument();
  });

  test('check caption and description of the image', () => {
    render(
      <PhotoViewer onClose={() => null} data-testid="viewer">
        <PhotoViewer.Image
          data-testid="first"
          src="1.jpg"
          caption="Image caption"
          description="Image description"
        />
        <PhotoViewer.Image data-testid="second" src="2.jpg" />
        <PhotoViewer.Image data-testid="third" src="3.jpg" />
      </PhotoViewer>,
    );

    fireEvent.click(screen.getByText('Description'));

    expect(screen.getByText('Image caption')).toBeInTheDocument();
    expect(screen.getByText('Image description')).toBeInTheDocument();
  });

  test('need to trigger onClose callback', () => {
    const closeFn = vitest.fn();

    render(
      <PhotoViewer onClose={closeFn} data-testid="viewer">
        <PhotoViewer.Image
          data-testid="first"
          src="1.jpg"
          caption="Image caption"
          description="Image description"
        />
        <PhotoViewer.Image data-testid="second" src="2.jpg" />
        <PhotoViewer.Image data-testid="third" src="3.jpg" />
      </PhotoViewer>,
    );

    fireEvent.click(screen.getByText('close'));
    expect(closeFn).toBeCalled();
  });

  test('check Image subcomponent properties', () => {
    render(
      <PhotoViewer onClose={() => null} data-testid="viewer">
        <PhotoViewer.Image
          data-testid="first"
          src="1.jpg"
          className="cls"
          style={{ color: 'red' }}
        />
        <PhotoViewer.Image data-testid="second" src="2.jpg" />
        <PhotoViewer.Image data-testid="third" src="3.jpg" />
      </PhotoViewer>,
    );

    expect(screen.getByTestId('first')).toHaveClass('cls');
    expect(screen.getByTestId('first')).toHaveStyle('color: red');
  });

  test('PhotoViewer has to apply custom className and id', () => {
    render(
      <PhotoViewer
        onClose={() => null}
        data-testid="viewer"
        className="cls"
        style={{ color: 'red' }}
      >
        <PhotoViewer.Image data-testid="first" src="1.jpg" />
        <PhotoViewer.Image data-testid="second" src="2.jpg" />
        <PhotoViewer.Image data-testid="third" src="3.jpg" />
      </PhotoViewer>,
    );

    expect(screen.getByTestId('viewer')).toHaveClass('cls');
    expect(screen.getByTestId('viewer')).toHaveStyle('color: red');
  });

  test('check that PhotoViewer configuration works correctly', () => {
    render(
      <AltroneApplication
        config={{
          photoViewer: {
            className: 'cls',
            style: { color: 'blue' },
            image: {
              photoClassName: 'photoCls',
            },
          },
        }}
      >
        <PhotoViewer onClose={() => null} data-testid="viewer">
          <PhotoViewer.Image data-testid="first" src="1.jpg" />
          <PhotoViewer.Image data-testid="second" src="2.jpg" />
          <PhotoViewer.Image data-testid="third" src="3.jpg" />
        </PhotoViewer>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('viewer')).toHaveClass('cls');
    expect(screen.getByTestId('viewer')).toHaveStyle('color: blue');
    expect(screen.getByTestId('first')).toHaveClass('photoCls');
  });
});
