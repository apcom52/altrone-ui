import { memo } from 'react';
import { Direction, Align } from '../../../types';
import clsx from 'clsx';
import './button-container.scss';

interface ButtonContainerProps extends React.HTMLProps<HTMLDivElement> {
  direction?: Direction;
  align?: Align;
  mobileFluid?: boolean;
}

const ButtonContainer = ({
  direction = Direction.horizontal,
  align = Align.start,
  className,
  children,
  mobileFluid = false
}: ButtonContainerProps) => {
  return (
    <div
      className={clsx('alt-button-container', className, {
        'alt-button-container--vertical': direction === Direction.vertical,
        'alt-button-container--align-center': align === Align.center,
        'alt-button-container--align-end': align === Align.end,
        'alt-button-container--mobile-fluid': mobileFluid
      })}
      data-testid="alt-test-buttoncontainer">
      {children}
    </div>
  );
};

export default memo(ButtonContainer);
