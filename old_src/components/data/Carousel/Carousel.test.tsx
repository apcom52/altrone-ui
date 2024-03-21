import { CarouselItem, CarouselRef } from './Carousel.types';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Carousel } from './Carousel';
import { timeout } from '../../../utils';

describe('Data.Carousel', () => {
  const images: CarouselItem[] = [{ src: '1' }, { src: '2' }, { src: '3' }, { src: '4' }];

  test('should renders correctly', () => {
    render(<Carousel data={images} />);

    const currentSlide = document.body.querySelector('.alt-carousel__item--current');
    const nextSlide = document.body.querySelector('.alt-carousel__item--next');

    expect(currentSlide).toHaveStyle('background-image: url(1);');
    expect(nextSlide).toHaveStyle('background-image: url(2);');
    expect(document.body.querySelector('.alt-carousel__item--prev')).not.toBeInTheDocument();
  });

  test('should renders correctly in loop mode', () => {
    render(<Carousel data={images} loop />);

    const currentSlide = document.body.querySelector('.alt-carousel__item--current');
    const nextSlide = document.body.querySelector('.alt-carousel__item--next');
    const prevSlide = document.body.querySelector('.alt-carousel__item--prev');

    expect(currentSlide).toHaveStyle('background-image: url(1);');
    expect(nextSlide).toHaveStyle('background-image: url(2);');
    expect(prevSlide).toHaveStyle('background-image: url(4);');
  });

  test('should next button works correclty', async () => {
    const ref = { current: {} as CarouselRef };

    render(<Carousel data={images} ref={ref} />);

    expect(ref.current.currentIndex).toBe(0);

    await act(() => ref.current.next());

    await timeout(1);
    expect(ref.current.currentIndex).toBe(1);

    await act(() => ref.current.next());
    await timeout(1);

    await act(() => ref.current.next());
    await timeout(1);

    await act(() => ref.current.next());
    await timeout(1);

    expect(ref.current.currentIndex).toBe(3);
  });

  test('should prev button works correctly', async () => {
    const ref = { current: {} as CarouselRef };

    render(<Carousel data={images} ref={ref} />);

    expect(ref.current.currentIndex).toBe(0);

    await act(() => ref.current.next());

    await timeout(1);
    expect(ref.current.currentIndex).toBe(1);

    await act(() => ref.current.prev());
    await timeout(1);

    await act(() => ref.current.prev());
    await timeout(1);

    expect(ref.current.currentIndex).toBe(0);
  });

  test('should next button works correctly (in loop mode)', async () => {
    const ref = { current: {} as CarouselRef };

    render(<Carousel data={images} ref={ref} loop />);

    expect(ref.current.currentIndex).toBe(0);

    await act(() => ref.current.next());

    await timeout(1);
    expect(ref.current.currentIndex).toBe(1);

    await act(() => ref.current.next());
    await timeout(1);

    await act(() => ref.current.next());
    await timeout(1);

    await act(() => ref.current.next());
    await act(async () => await timeout(600));

    expect(ref.current.currentIndex).toBe(0);
  });

  test('should prev button works correctly (in loop mode)', async () => {
    const ref = { current: {} as CarouselRef };

    render(<Carousel data={images} ref={ref} loop />);

    expect(ref.current.currentIndex).toBe(0);

    await act(() => ref.current.prev());
    await act(async () => await timeout(600));

    await act(() => ref.current.prev());
    await timeout(1);

    expect(ref.current.currentIndex).toBe(2);
  });

  test('should duration works correctly', async () => {
    const ref = { current: {} as CarouselRef };

    render(<Carousel data={images} ref={ref} duration={1000} />);

    expect(ref.current.currentIndex).toBe(0);
    await act(async () => await timeout(1050));

    expect(ref.current.currentIndex).toBe(1);

    await act(async () => await timeout(1050));
    expect(ref.current.currentIndex).toBe(2);
  });

  test('should open photo viewer', async () => {
    const ref = { current: {} as CarouselRef };

    const { container, rerender } = render(<Carousel data={images} ref={ref} usePhotoViewer />);

    expect(document.querySelector('.alt-photo-viewer')).not.toBeInTheDocument();

    expect(screen.getByText('open_in_full')).toBeInTheDocument();
    fireEvent.click(screen.getByText('open_in_full'));

    expect(document.querySelector('.alt-photo-viewer')).toBeInTheDocument();

    fireEvent.click(screen.getByText('close'));

    await timeout(1);

    expect(screen.queryByTestId('alt-test-photoViewer')).not.toBeInTheDocument();
  });
});
