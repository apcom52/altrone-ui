import { PhotoViewer } from './PhotoViewer';
import { fireEvent, render, screen } from '@testing-library/react';
import { PhotoViewerRef, PhotoViewImage } from './PhotoViewer.types';
import '@testing-library/jest-dom';
import { createRef } from 'react';

describe('Containers.PhotoViewer', () => {
  const images: PhotoViewImage[] = [
    {
      src: '/image/1.png'
    },
    {
      src: '/image/2.png',
      caption: 'Caption test',
      description: 'Description test'
    },
    {
      src: '/image/3.png'
    },
    {
      src: '/image/4.png'
    }
  ];

  test('should render correctly', () => {
    const ref = createRef<PhotoViewerRef>();

    render(<PhotoViewer images={images} onClose={() => null} ref={ref} />);

    expect(ref.current.currentIndex).toBe(0);
    expect(ref.current.zoom).toBe(1);
  });

  test('should navigate to image correctly', () => {
    const ref = createRef<PhotoViewerRef>();

    render(<PhotoViewer images={images} onClose={() => null} ref={ref} />);

    expect(ref.current.currentIndex).toBe(0);
    expect(screen.getByTestId('alt-test-photoViewer-counter')).toHaveTextContent('1');

    const nextButton = screen.getByText('arrow_forward');
    fireEvent.click(nextButton);

    expect(ref.current.currentIndex).toBe(1);
    expect(screen.getByTestId('alt-test-photoViewer-counter')).toHaveTextContent('2');

    const prevButton = screen.getByText('arrow_back');
    fireEvent.click(prevButton);

    expect(screen.getByTestId('alt-test-photoViewer-counter')).toHaveTextContent('1');
    expect(ref.current.currentIndex).toBe(0);
  });

  test('should prev and next be disabled', () => {
    const ref = createRef<PhotoViewerRef>();

    render(<PhotoViewer images={images} onClose={() => null} ref={ref} />);

    expect(screen.getByTestId('alt-test-photoViewer-prev')).toBeDisabled();

    fireEvent.click(screen.getByText('arrow_forward'));

    expect(screen.getByTestId('alt-test-photoViewer-prev')).not.toBeDisabled();

    fireEvent.click(screen.getByText('arrow_forward'));
    fireEvent.click(screen.getByText('arrow_forward'));

    expect(screen.getByTestId('alt-test-photoViewer-next')).toBeDisabled();
  });

  test('should zooming works correctly', () => {
    const ref = createRef<PhotoViewerRef>();

    render(<PhotoViewer images={images} onClose={() => null} ref={ref} />);

    expect(ref.current.zoom).toBe(1);

    const zoomInButton = screen.getByText('add');
    fireEvent.click(zoomInButton);

    expect(ref.current.zoom).toBe(1.5);

    const zoomOutButton = screen.getByText('remove');
    fireEvent.click(zoomOutButton);

    expect(ref.current.zoom).toBe(1);
  });

  test('startsFrom prop should works correctly', () => {
    const ref = createRef<PhotoViewerRef>();

    render(<PhotoViewer images={images} onClose={() => null} startsFrom={2} ref={ref} />);

    expect(ref.current.currentIndex).toBe(2);
  });

  test('expand button should shows the caption and description correctly', () => {
    const ref = createRef<PhotoViewerRef>();
    render(<PhotoViewer images={images} onClose={() => null} ref={ref} />);

    expect(screen.getByTestId('alt-test-photoViewer-counter')).toHaveTextContent('1');
    expect(screen.queryByTestId('alt-test-photoViewer-caption')).not.toBeInTheDocument();
    expect(screen.queryByTestId('alt-test-photoViewer-description')).not.toBeInTheDocument();

    const nextButton = screen.getByText('arrow_forward');
    fireEvent.click(nextButton);

    expect(screen.queryByTestId('alt-test-photoViewer-caption')).toBeInTheDocument();
    expect(screen.queryByTestId('alt-test-photoViewer-caption')).toHaveTextContent(
      images[1].caption
    );
    expect(screen.queryByTestId('alt-test-photoViewer-description')).toHaveTextContent(
      images[1].description
    );
  });
});
