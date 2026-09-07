import React from 'react';

export type ToastVariant = 'default' | 'success' | 'warning' | 'danger';

/**
 * Logical placement, resolved against the writing direction:
 * - vertical (`toastPlacement` / `notificationPlacement`): `start` = top, `end` = bottom
 * - horizontal (`notificationSide`): `start` = left, `end` = right
 */
export type ToastPlacement = 'start' | 'end';

export interface ToastAction {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface NotificationAction {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  danger?: boolean;
}

// ─── Public API options ───────────────────────────────────────────────────────

export interface ToastOptions {
  /** Visual variant. Defaults to 'default'. */
  variant?: ToastVariant;
  /**
   * Custom icon node. Omit to use the variant default icon.
   * Pass null to hide the icon completely.
   */
  icon?: React.ReactNode;
  /** Optional action button rendered inside the toast. */
  action?: ToastAction;
  /** Auto-close delay in ms. Defaults to 4000. */
  duration?: number;
  /** Whether to auto-close. Defaults to true. */
  autoClose?: boolean;
}

export interface NotificationOptions {
  /** Optional title rendered above the content. */
  title?: string;
  /** Main body content — any ReactNode. */
  content: React.ReactNode;
  /** Optional header image URL (full-width card image). */
  image?: string;
  /** Optional icon shown next to title. */
  icon?: React.ReactNode;
  /** List of action buttons shown at the bottom. */
  actions?: NotificationAction[];
  /** Auto-close delay in ms. Defaults to 6000. */
  duration?: number;
  /** Whether to auto-close. Defaults to true. */
  autoClose?: boolean;
}

// ─── Internal item types ──────────────────────────────────────────────────────

export interface ToastItem {
  kind: 'toast';
  id: string;
  message: string;
  variant: ToastVariant;
  icon?: React.ReactNode;
  action?: ToastAction;
  duration: number;
  autoClose: boolean;
}

export interface NotificationItem {
  kind: 'notification';
  id: string;
  title?: string;
  content: React.ReactNode;
  image?: string;
  icon?: React.ReactNode;
  actions?: NotificationAction[];
  duration: number;
  autoClose: boolean;
}

export type AnyToastItem = ToastItem | NotificationItem;

// ─── Context ──────────────────────────────────────────────────────────────────

export interface ToastContextType {
  /** Show a simple pill-shaped toast message. Returns the toast id. */
  toast: (message: string, options?: ToastOptions) => string;
  /** Show a rich notification card. Returns the notification id. */
  notification: (options: NotificationOptions) => string;
  /** Programmatically dismiss a toast or notification by id. */
  dismiss: (id: string) => void;
}

export interface ToastsProviderProps {
  children: React.ReactNode;
  /** Vertical placement of the toast stack (centred horizontally). Defaults to 'end' (bottom). */
  toastPlacement?: ToastPlacement;
  /** Horizontal side of the notification stack. Defaults to 'end' (right). */
  notificationSide?: ToastPlacement;
  /** Vertical placement of the notification stack. Defaults to 'end' (bottom). */
  notificationPlacement?: ToastPlacement;
}
