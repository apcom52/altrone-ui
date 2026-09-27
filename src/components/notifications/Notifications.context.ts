import { createContext, useContext } from 'react';

/**
 * Tracks how deeply the current `Notifications` provider is nested inside
 * other `Notifications` providers. `useEffect` fires child-before-parent on
 * mount, so a nested provider always registers with the registry before its
 * ancestor — depth lets the registry pick the innermost mounted provider
 * instead of whichever one happened to register last.
 */
const NotificationsDepthContext = createContext(0);

export const useNotificationsDepth = () => useContext(NotificationsDepthContext);

export { NotificationsDepthContext };
