import React, { ChangeEvent, PropsWithChildren, ReactElement } from 'react';
import { Size } from 'types';
import type { ButtonProps } from '../button/Button.types.ts';

export type IslandPlacement = 'start' | 'end';

export interface TextInputProps
  extends
    PropsWithChildren,
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'onChange' | 'size' | 'children'
    > {
  /** Forwarded to the visual wrapper (a `Box`). Use `inputRef` for the field node itself. */
  ref?: React.Ref<HTMLElement>;
  /** Forwarded to the underlying `<input>` (or the `asChild` element). */
  inputRef?: React.Ref<HTMLInputElement>;
  variant?: 'default' | 'transparent';
  value?: string;
  onChange?: (value: string, event: ChangeEvent) => void;
  /** Class for the visual wrapper. `className` targets the `<input>`. */
  wrapperClassName?: string;
  /** Style for the visual wrapper. `style` targets the `<input>`. */
  wrapperStyle?: React.CSSProperties;
  invalid?: boolean;
  size?: Size;
  asChild?: boolean;
  readonlyStyles?: boolean;
}

export interface TextIslandProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  label: string;
  placement?: IslandPlacement;
}

export interface IconIslandProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  icon: ReactElement;
  placement?: IslandPlacement;
}

export interface LoadingIslandProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  placement?: IslandPlacement;
}

/**
 * `ActionIsland` renders a `<Button variant="default">`, so it accepts the full
 * `Button` API (`state`, `badge`, `tooltip`, `selected`, `icon`, …) except
 * `variant`, which is locked to the in-field `plate` chip. `size` defaults to
 * one tier below the field.
 */
export interface ActionIslandProps extends Omit<ButtonProps, 'variant' | 'role'> {
  placement?: IslandPlacement;
}

export interface CustomIslandProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  placement?: IslandPlacement;
}

export interface CharCounterIslandProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  ref?: React.Ref<HTMLDivElement>;
  placement?: IslandPlacement;
}
