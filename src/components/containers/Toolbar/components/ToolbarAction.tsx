import React, { forwardRef, useRef } from 'react';
import './toolbar-action.scss';
import clsx from 'clsx';
import { useToolbarContext } from '../Toolbar';
import { ToolbarActionType } from '../Toolbar.types';

export interface ToolbarPopupActionProps {
  closePopup: () => void;
}

export const ToolbarAction = forwardRef<HTMLDivElement, ToolbarActionType>(
  (
    {
      icon,
      label,
      onClick,
      active = false,
      disabled = false,
      danger = false,
      className,
      indicator,
      hideLabel,
      children,
      fluid = false,
      usePressEffect = true
    },
    ref
  ) => {
    const actionRef = useRef<HTMLDivElement | null>(null);

    const { isCompact } = useToolbarContext();

    const onKeyDownPress: React.KeyboardEventHandler = (e) => {
      if (e.key === 'Enter') {
        actionRef.current?.click();
      }
    };

    return (
      <div
        ref={(_ref) => {
          actionRef.current = _ref;
          if (typeof ref === 'function') {
            ref(_ref);
          } else if (ref) {
            ref.current = _ref;
          }
        }}
        onClick={onClick}
        tabIndex={0}
        onKeyDown={onKeyDownPress}
        role="button"
        className={clsx('alt-toolbar-action', className, {
          'alt-toolbar-action--disabled': disabled,
          'alt-toolbar-action--active': active,
          'alt-toolbar-action--danger': danger,
          'alt-toolbar-action--compact': isCompact,
          'alt-toolbar-action--fluid': fluid,
          'alt-toolbar-action--no-press-effect': !usePressEffect
        })}>
        {children ? children : <div className="alt-toolbar-action__icon">{icon}</div>}
        {!hideLabel && label && <div className="alt-toolbar-action__label">{label}</div>}
        {indicator && (
          <div
            className={clsx('alt-toolbar-action__indicator', {
              'alt-toolbar-action__indicator--position-corner': indicator.position === 'corner'
            })}>
            {indicator.value}
          </div>
        )}
      </div>
    );
  }
);

ToolbarAction.displayName = 'ToolbarAction';
