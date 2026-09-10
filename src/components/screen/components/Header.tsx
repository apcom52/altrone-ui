import clsx from 'clsx';
import { Box } from 'components/box';
import s from '../screen.module.scss';
import { ScreenHeaderProps } from '../Screen.types.ts';

/**
 * The bar is a `Box` with the `glass` material (frosted, accent-tinted fill)
 * and the `sticky` elevation role. `Box`'s Slot replaces `className`/`style`,
 * so they're passed through `Box`, not the `<header>`. `.HeaderInner` carries
 * the layout: it's `margin`-inset past the overlapping sidebar so both a
 * flex-flow (`plain`) and an absolutely-positioned (`floating`) toolbar clear
 * it.
 */
export const Header = ({
  ref,
  children,
  className,
  style,
  ...restProps
}: ScreenHeaderProps) => (
  <Box
    asChild
    ref={ref}
    className={clsx(s.Header, className)}
    style={style}
    material="glass"
    tone="accent"
    shape="rect"
    elevation="sticky"
    {...restProps}
  >
    <header>
      <div className={s.HeaderInner}>{children}</div>
    </header>
  </Box>
);
