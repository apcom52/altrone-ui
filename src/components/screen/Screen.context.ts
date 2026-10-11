import { createContext, useContext } from 'react';

export interface ScreenSidebarState {
  collapsed: boolean;
  toggle: () => void;
}

export interface ScreenContextValue {
  /**
   * `inline` — `Screen.Sidebar` is a grid column; `overlay` — it's an
   * off-canvas panel with a scrim, below `Screen`'s `mobileBreakpoint`.
   */
  sidebarMode: 'inline' | 'overlay';
  /**
   * `false` until `Screen` has mounted and `sidebarMode` reflects the real
   * viewport — before that it's the SSR default, not a user-visible change.
   */
  modeResolved: boolean;
  /**
   * The mounted `Screen.Sidebar`'s live state, published by `Sidebar` itself
   * via `registerSidebar` — `null` when no `Screen.Sidebar` is mounted (or
   * there's no `Screen` ancestor at all). Lets `Toolbar.SidebarToggleAction`
   * read and toggle it without the consumer wiring shared state by hand.
   */
  sidebar: ScreenSidebarState | null;
  registerSidebar: (state: ScreenSidebarState | null) => void;
}

const ScreenContext = createContext<ScreenContextValue>({
  sidebarMode: 'inline',
  modeResolved: true,
  sidebar: null,
  registerSidebar: () => {},
});

export const ScreenContextProvider = ScreenContext.Provider;

export const useScreenContext = (): ScreenContextValue =>
  useContext(ScreenContext);
