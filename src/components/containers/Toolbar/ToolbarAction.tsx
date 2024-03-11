import React, { forwardRef, useMemo } from 'react';
import './toolbar-action.scss';
import clsx from 'clsx';
import { Popover } from '../index';
import { ContextMenu } from '../../list/ContextMenu';
import { useToolbarContext } from './Toolbar';
import { ToolbarActionType } from './Toolbar.types';

export interface ToolbarPopupActionProps {
  closePopup: () => void;
}

export const ToolbarAction = forwardRef<HTMLButtonElement, ToolbarActionType>(
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
    const TagName = hideLabel && children ? 'div' : 'button';

    const { isCompact } = useToolbarContext();

    const onButtonClick = () => {
      onClick?.();
    };

    const isButton = TagName === 'button';

    return (
      <button
        ref={ref}
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
      </button>
    );

    return React.createElement(
      TagName,
      {
        className: clsx('alt-toolbar-action', className, {
          'alt-toolbar-action--disabled': disabled,
          'alt-toolbar-action--active': active,
          'alt-toolbar-action--danger': danger,
          'alt-toolbar-action--compact': isCompact,
          'alt-toolbar-action--fluid': fluid,
          'alt-toolbar-action--no-press-effect': !usePressEffect
        }),
        type: isButton ? 'button' : undefined,
        title: label,
        disabled: isButton ? disabled : undefined,
        'data-testid': 'alt-test-toolbarAction',
        ref
      },
      <></>
    );
  }
);

ToolbarAction.displayName = 'ToolbarAction';
