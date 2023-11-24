import { forwardRef, useCallback, useRef, useState } from 'react';
import './toolbar-action.scss';
import clsx from 'clsx';
import { FloatingBox, FloatingBoxMobileBehaviour } from '../index';
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
      contextMenu,
      content,
      active = false,
      disabled = false,
      danger = false,
      className,
      indicator
    },
    ref
  ) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const { isCompact } = useToolbarContext();

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const onButtonClick = () => {
      if (onClick) {
        onClick();
        return;
      }

      if (contextMenu || content) {
        setIsPopupVisible(!isPopupVisible);
      }
    };

    const closePopup = useCallback(() => {
      setIsPopupVisible(false);
    }, []);

    return (
      <>
        <button
          className={clsx('alt-toolbar-action', className, {
            'alt-toolbar-action--disabled': disabled,
            'alt-toolbar-action--active': active,
            'alt-toolbar-action--danger': danger,
            'alt-toolbar-action--compact': isCompact
          })}
          type="button"
          title={label}
          disabled={disabled}
          ref={(node: HTMLButtonElement) => {
            buttonRef.current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          onClick={onButtonClick}
          data-testid="alt-test-toolbarAction">
          <div className="alt-toolbar-action__icon">{icon}</div>
          {label && <div className="alt-toolbar-action__label">{label}</div>}
          {indicator && (
            <div
              className={clsx('alt-toolbar-action__indicator', {
                'alt-toolbar-action__indicator--position-corner': indicator.position === 'corner'
              })}>
              {indicator.value}
            </div>
          )}
        </button>
        {isPopupVisible && contextMenu ? (
          <FloatingBox
            targetElement={buttonRef.current}
            onClose={closePopup}
            useRootContainer
            placement="bottom"
            closeOnAnotherFloatingBoxClick
            mobileBehaviour={FloatingBoxMobileBehaviour.modal}>
            <ContextMenu menu={contextMenu} onClose={closePopup} />
          </FloatingBox>
        ) : isPopupVisible && content ? (
          <FloatingBox
            targetElement={buttonRef.current}
            onClose={closePopup}
            useRootContainer
            placement="bottom"
            closeOnAnotherFloatingBoxClick
            mobileBehaviour={FloatingBoxMobileBehaviour.modal}
            minWidth={250}
            useParentWidth>
            <div className="alt-toolbar-action-popup">{content?.({ closePopup })}</div>
          </FloatingBox>
        ) : null}
      </>
    );
  }
);

ToolbarAction.displayName = 'ToolbarAction';
