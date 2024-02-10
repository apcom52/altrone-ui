import { ParentContextAction } from '../../../types';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '../../typography';
import { createPortal } from 'react-dom';
import { FloatingBox } from '../../containers';
import { ContextMenu } from './index';
import clsx from 'clsx';
import { useWindowSize } from '../../../hooks';

interface ContextParentMenuItem extends ParentContextAction {
  onClick: (action: ParentContextAction | null) => void;
  onClose: () => void;
}

export const ContextParentMenuItem = ({ onClick, onClose, ...action }: ContextParentMenuItem) => {
  const { gtPhoneL } = useWindowSize();

  const [isChildrenContextMenuVisible, setIsChildrenContextMenuVisible] = useState(false);
  const itemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (gtPhoneL) {
      onClick(null);
    }
  }, [gtPhoneL, onClick]);

  const altroneRef = useRef(document.body.querySelector('.altrone') || document.body);

  return (
    <>
      <button
        className={clsx('alt-context-menu-item', {
          'alt-context-menu-item--parent-selected': isChildrenContextMenuVisible
        })}
        ref={itemRef}
        onClick={() => {
          if (gtPhoneL) {
            setIsChildrenContextMenuVisible((old) => !old);
          } else {
            onClick(action);
          }
        }}
        type="button">
        <div className="alt-context-menu-item__icon">{action.icon}</div>
        <div className="alt-context-menu-item__title">{action.title}</div>
        <div className="alt-context-menu-item__childrenArrow">
          <Icon i="keyboard_arrow_right" />
        </div>
      </button>
      {gtPhoneL &&
        isChildrenContextMenuVisible &&
        createPortal(
          <FloatingBox
            targetElement={itemRef.current}
            placement="right"
            useRootContainer={true}
            closeOnAnotherFloatingBoxClick
            onClose={() => setIsChildrenContextMenuVisible(false)}
            offset={2}>
            <ContextMenu onClose={onClose} menu={action.children} />
          </FloatingBox>,
          altroneRef.current
        )}
    </>
  );
};
