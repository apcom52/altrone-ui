import {
  memo,
  ReactElement,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  MouseEvent,
} from 'react';
import { NavigationListProps } from './NavigationList.types.ts';
import s from './navigationList.module.scss';
import clsx from 'clsx';
import { Group, Link, Header, Footer } from './components';
import {
  NAV_LINK_ATTR,
  NavigationListHideHoverContext,
  NavigationListIdContext,
  NavigationListLevelContext,
} from './NavigationList.context.ts';
import { LayoutGroup, motion } from 'motion/react';
import { AltChildren, DOMUtils } from '../../utils';
import { Scrollable } from '../scrollable';

type HoverBox = { x: number; y: number; width: number; height: number };

const HOVER_BACKDROP_TRANSITION = {
  opacity: { duration: 0.18, ease: 'easeOut' },
  default: { type: 'spring', stiffness: 550, damping: 45 },
} as const;

/**
 * Distance from `el` to `ancestor` in layout (content) coordinates — unlike
 * `getBoundingClientRect`, unaffected by any scroll offset in between, so it
 * works whether the actual scrolling element is a plain overflow box or
 * (as here) `Scrollable`'s internal OverlayScrollbars viewport, which isn't
 * otherwise reachable from outside.
 */
function offsetWithin(el: HTMLElement, ancestor: HTMLElement) {
  let top = 0;
  let left = 0;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    top += node.offsetTop;
    left += node.offsetLeft;
    node = node.offsetParent as HTMLElement | null;
  }
  return { top, left };
}

const NavigationListComponent = memo(
  ({ ref, children, className, style, ...restProps }: NavigationListProps) => {
    const id = useId();
    const navRef = useRef<HTMLElement>(null);
    /* The positioning anchor for `.HoverBackdrop` — a plain `position:
       relative` wrapper we control, inside the scrolled content, so its
       offsetParent chain to a hovered link never depends on Scrollable's
       internal (undocumented) DOM. */
    const contentRef = useRef<HTMLDivElement>(null);
    /* One persistent backdrop moved between links. `box` keeps the last rect
       even while hidden, so re-showing fades in place instead of flying in. */
    const [box, setBox] = useState<HoverBox | null>(null);
    const [visible, setVisible] = useState(false);

    const hideHover = useCallback(() => setVisible(false), []);

    const showHoverOn = useCallback((link: HTMLElement) => {
      const content = contentRef.current;
      if (!content) {
        return;
      }
      const { top, left } = offsetWithin(link, content);
      setBox({ x: left, y: top, width: link.offsetWidth, height: link.offsetHeight });
      setVisible(true);
    }, []);

    const handleMouseOver = (event: MouseEvent<HTMLElement>) => {
      restProps.onMouseOver?.(event);
      const link = (event.target as HTMLElement).closest<HTMLElement>(
        `[${NAV_LINK_ATTR}]`,
      );
      if (
        link &&
        link.getAttribute('aria-current') !== 'page' &&
        link.getAttribute('aria-disabled') !== 'true'
      ) {
        showHoverOn(link);
      } else {
        hideHover();
      }
    };

    const handleMouseLeave = (event: MouseEvent<HTMLElement>) => {
      restProps.onMouseLeave?.(event);
      hideHover();
    };

    const cls = clsx(s.NavigationList, className);

    /* `Header`/`Footer` stay outside `Scrollable` — always visible chrome,
       never part of the scrolled content — so they can bleed flush against
       `.NavigationList`'s own padding/rounding without depending on
       Scrollable's internal clipping. */
    const [header, footer, rest] = useMemo(() => {
      let header: ReactElement | null = null;
      let footer: ReactElement | null = null;
      const rest: ReactElement[] = [];

      new AltChildren(children)
        .filterNodes()
        .toArray()
        .forEach((elem) => {
          const element = elem as ReactElement;
          if (DOMUtils.containsElementType(element, [Header])) {
            header = element;
          } else if (DOMUtils.containsElementType(element, [Footer])) {
            footer = element;
          } else {
            rest.push(element);
          }
        });

      return [header, footer, rest];
    }, [children]);

    return (
      <nav
        ref={DOMUtils.composeRefs(ref, navRef)}
        className={cls}
        style={style}
        {...restProps}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {header}
        <Scrollable className={s.ScrollArea} overflowX="hidden">
          <div ref={contentRef} className={s.ScrollContent}>
            {box && (
              <motion.div
                className={s.HoverBackdrop}
                initial={{ ...box, opacity: 0 }}
                animate={{ ...box, opacity: visible ? 1 : 0 }}
                transition={HOVER_BACKDROP_TRANSITION}
              />
            )}
            <NavigationListLevelContext.Provider value={0}>
              <NavigationListIdContext.Provider value={id}>
                <NavigationListHideHoverContext.Provider value={hideHover}>
                  <LayoutGroup id={id}>{rest}</LayoutGroup>
                </NavigationListHideHoverContext.Provider>
              </NavigationListIdContext.Provider>
            </NavigationListLevelContext.Provider>
          </div>
        </Scrollable>
        {footer}
      </nav>
    );
  },
);

const NavigationListNamespace = Object.assign(NavigationListComponent, {
  Group,
  Link,
  Header,
  Footer,
});

export { NavigationListNamespace as NavigationList };
