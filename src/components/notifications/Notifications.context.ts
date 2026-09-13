import { createContext, useContext } from 'react';
import type { NotificationsContextType } from './Notifications.types';

export const NotificationsContext = createContext<NotificationsContextType>({
  toast: () => '',
  notification: () => '',
  dismiss: () => {},
});

export const useNotifications = () => useContext(NotificationsContext);
