import {
  memo,
  useCallback,
  useId,
  useRef,
  useState,
  MouseEvent,
} from 'react';
import { NavigationListProps } from './NavigationList.types.ts';
import s from './navigationList.module.scss';
import clsx from 'clsx';
import {
  Group,
  GroupAction,
  Link,
  LinkAction,
  Header,
  Footer,
} from './components';
import {
  NAV_LINK_ATTR,
  NavigationListHideHoverContext,
  NavigationListIdContext,
  NavigationListLevelContext,
} from './NavigationList.context.ts';
import { LayoutGroup, motion } from 'motion/react';
import { DOMUtils } from '../../utils';

type HoverBox = { x: number; y: number; width: number; height: number };

const HOVER_BACKDROP_TRANSITION = {
  opacity: { duration: 0.18, ease: 'easeOut' },
  default: { type: 'spring', stiffness: 550, damping: 45 },
} as const;

const NavigationListComponent = memo(
  ({ ref, children, className, style, ...restProps }: NavigationListProps) => {
    const id = useId();
    const navRef = useRef<HTMLElement>(null);
    /* One persistent backdrop moved between links. `box` keeps the last rect
       even while hidden, so re-showing fades in place instead of flying in. */
    const [box, setBox] = useState<HoverBox | null>(null);
    const [visible, setVisible] = useState(false);

    const hideHover = useCallback(() => setVisible(false), []);

    const showHoverOn = useCallback((link: HTMLElement) => {
      const nav = navRef.current;
      if (!nav) {
        return;
      }
      const navRect = nav.getBoundingClientRect();
      const rect = link.getBoundingClientRect();
      setBox({
        x: rect.left - navRect.left,
        y: rect.top - navRect.top,
        width: rect.width,
        height: rect.height,
      });
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

    return (
      <nav
        ref={DOMUtils.composeRefs(ref, navRef)}
        className={cls}
        style={style}
        {...restProps}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
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
              <LayoutGroup id={id}>{children}</LayoutGroup>
            </NavigationListHideHoverContext.Provider>
          </NavigationListIdContext.Provider>
        </NavigationListLevelContext.Provider>
      </nav>
    );
  },
);

const NavigationListNamespace = Object.assign(NavigationListComponent, {
  Group,
  GroupAction,
  Link,
  LinkAction,
  Header,
  Footer,
});

export { NavigationListNamespace as NavigationList };
