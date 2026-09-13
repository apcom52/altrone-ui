import { createContext, useContext } from 'react';

/** Marks a link element so the list's pointer tracking can find it via
    `closest()`. */
export const NAV_LINK_ATTR = 'data-nav-link';

export const NavigationListLevelContext = createContext<number>(0);
export const useNavigationListLevel = () =>
  useContext(NavigationListLevelContext);

export const NavigationListIdContext = createContext<string>('');
export const useNavigationListId = () => useContext(NavigationListIdContext);

/** Lets a link hide the shared hover backdrop imperatively — used when a link
    becomes selected while the cursor is still on it (no pointer event fires to
    re-evaluate). Positioning/showing is driven by the list's own pointer
    tracking. */
export const NavigationListHideHoverContext = createContext<() => void>(
  () => {},
);
export const useNavigationListHideHover = () =>
  useContext(NavigationListHideHoverContext);
