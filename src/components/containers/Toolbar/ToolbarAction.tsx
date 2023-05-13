import { forwardRef, memo, useCallback, useRef, useState } from 'react';
import './toolbar-action.scss';
import clsx from 'clsx';
import { ContextMenuType, Indicator } from '../../../types';
import { FloatingBox, FloatingBoxMobileBehaviour } from '../index';
import { ContextMenu } from '../../list/ContextMenu';

export interface ToolbarPopupActionProps {
  closePopup: () => void;
}

interface ToolbarActionProps {
  icon: JSX.Element;
  label?: string;
  onClick?: () => void;
  contextMenu?: ContextMenuType;
  content?: (props: ToolbarPopupActionProps) => JSX.Element;
  active?: boolean;
  disabled?: boolean;
  danger?: boolean;
  className?: string;
  indicator?: Indicator;
}

const ToolbarAction = forwardRef<HTMLButtonElement, ToolbarActionProps>(
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
            'alt-toolbar-action--danger': danger
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
          <div className="alt-toolbar-action__label">{label}</div>
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

export default memo(ToolbarAction) as typeof ToolbarAction;
