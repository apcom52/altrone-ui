import { createContext, useContext } from 'react';

/**
 * Close handler that walks up nested popovers — a child popover calls it to
 * dismiss the whole chain (see `PopoverContentContext.closeAllSequence`).
 */
export const PopoverCloseContext = createContext<undefined | (() => void)>(
  undefined,
);
export const usePopoverCloseContext = () => useContext(PopoverCloseContext);

/** Active index of the popover's list navigation (`-1` when nothing is focused). */
export const PopoverCurrentIndex = createContext<number | null>(null);
export const usePopoverCurrentIndex = () => useContext(PopoverCurrentIndex);

/** `useId` of the enclosing popover — scopes shared `layoutId`s of its list items. */
export const PopoverCurrentId = createContext<string | null>(null);
export const usePopoverCurrentId = () => useContext(PopoverCurrentId);
