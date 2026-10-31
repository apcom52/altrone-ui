import type { CSSProperties } from 'react';
import clsx from 'clsx';
import s from '../screen.module.scss';
import { ScreenHeaderProps } from '../Screen.types.ts';

const toLength = (value: number | string): string =>
  typeof value === 'number' ? `${value}px` : value;

/**
 * A transparent positioning zone pinned to the top of the screen — it
 * carries no fill of its own. The visible bar is the `Toolbar` the
 * consumer drops in: use `variant="solid"` (the default) for the frosted,
 * accent-tinted header surface, or `variant="grouped"` for floating pills
 * over the content. Fixed to the viewport by default; `fixed={false}` puts
 * it back in normal document flow (see `ScreenHeaderProps`).
 *
 * `.HeaderInner` is `margin`-inset past the overlapping sidebar so the bar
 * clears it; `insetStart` overrides that gutter (see `ScreenHeaderProps`).
 */
export const Header = ({
  ref,
  children,
  className,
  style,
  insetStart,
  fixed = true,
  ...restProps
}: ScreenHeaderProps) => {
  const rootStyle =
    insetStart === undefined
      ? style
      : ({
          ...style,
          '--screen-header-inset-start': toLength(insetStart),
        } as CSSProperties);

  return (
    <header
      ref={ref}
      className={clsx(s.Header, { [s.Static]: !fixed }, className)}
      style={rootStyle}
      {...restProps}
    >
      <div className={s.HeaderInner}>{children}</div>
    </header>
  );
};
