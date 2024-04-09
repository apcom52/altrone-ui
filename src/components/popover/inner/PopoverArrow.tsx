import { forwardRef } from 'react';
import s from '../popover.module.scss';

interface PopoverArrowProps extends React.ComponentPropsWithRef<'div'> {
  context?: any;
}

export const PopoverArrow = forwardRef<HTMLDivElement, PopoverArrowProps>(
  (props, ref) => {
    const { context, style, ...restProps } = props;
    const {
      placement,
      elements: { floating },
      middlewareData: { arrow },
    } = context;
    const width = 14;
    const height = 7;
    const tipRadius = 3;

    if (!floating) {
      return null;
    }

    const svgX = (width / 2) * (tipRadius / -8 + 1);
    const svgY = ((height / 2) * tipRadius) / 4;

    const [side, alignment] = placement.split('-') as [string, string];

    const yOffsetProp = alignment === 'end' ? 'bottom' : 'top';
    let xOffsetProp = alignment === 'end' ? 'right' : 'left';

    const arrowX = arrow?.x != null ? arrow.x : '';
    const arrowY = arrow?.y != null ? arrow.y : '';

    const dValue =
      'M0,0' +
      ` H${width}` +
      ` L${width - svgX},${height - svgY}` +
      ` Q${width / 2},${height} ${svgX},${height - svgY}` +
      ' Z';

    const rotation = String(
      {
        top: '',
        left: 'rotate(-90deg)',
        bottom: 'rotate(180deg)',
        right: 'rotate(90deg)',
      }[side],
    );

    return (
      <div
        aria-hidden
        ref={ref}
        className={s.Arrow}
        style={{
          ...style,
          [xOffsetProp]: arrowX,
          [yOffsetProp]: arrowY,
          [side]: '100%',
          transform: rotation,
          clipPath: `path("${dValue}")`,
        }}
        {...restProps}
      />
    );
  },
);
