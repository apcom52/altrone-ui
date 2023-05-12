import { Size } from '../../../types';
import clsx from 'clsx';
import './loading.scss';

interface LoadingProps {
  size?: Size;
  color?: string;
  className?: string;
}

interface LoadingAnimation {
  size: number;
}

const LoadingAnimation = ({ size = 100 }: LoadingAnimation) => {
  return (
    <svg
      version="1.1"
      id="L9"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      enableBackground="new 0 0 0 0"
      xmlSpace="preserve">
      <path
        fill="currentColor"
        d={`M${0.73 * size},${0.5 * size}c0${-0.127 * size}${-0.103 * size}${-0.23 * size}${
          -0.23 * size
        }${-0.23 * size}S${0.27 * size},${0.373 * size},${0.27 * size},${0.5 * size} M${
          0.309 * size
        },${0.5 * size}c0${-0.105 * size},${0.085 * size}${-0.191 * size},${0.191 * size}${
          -0.191 * size
        }S${0.691 * size},${0.395 * size},${0.691 * size},${0.5 * size}`}>
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="1s"
          from={`0 ${size / 2} ${size / 2}`}
          to={`360 ${size / 2} ${size / 2}`}
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};

/**
 * This indicator shows that something is loading at the moment. **This component is available only in 2.0**
 *
 * @component
 * @category Indicators
 * @param {Size} [size = Size.medium] - Size of the loading animation
 * @param { string } [color] - This field is used for applying a custom color for loading animation. By default, we use textColor variable
 * @param { string } [className] - Custom className for loading animation
 */
const Loading = ({ size = Size.medium, color, className }: LoadingProps) => {
  let pxSize = 34;

  if (size === Size.small) {
    pxSize = 24;
  } else if (size === Size.large) {
    pxSize = 42;
  }

  return (
    <div
      data-testid="alt-test-loading"
      className={clsx(
        'alt-loading',
        {
          [`alt-loading--size-${size}`]: size !== Size.medium
        },
        className
      )}
      style={color ? { color } : undefined}>
      <LoadingAnimation size={pxSize} />
    </div>
  );
};

export default Loading;
