import { memo, useCallback, useMemo, useRef, useState } from 'react';
import type {
  DataTableAction as DataTableActionType,
  DataTableSelectableAction as DataTableSelectableActionType
} from './DataTable';
import { Button, ButtonVariant } from '../../button';
import { FloatingBox, FloatingBoxMobileBehaviour } from '../../containers';
import { ContextAction, ContextMenuType, ParentContextAction, Role } from '../../../types';
import { useWindowSize } from '../../../hooks';
import { useDataTableContext } from '../../../contexts';

const DataTableAction = <T extends unknown>({
  label,
  content,
  onClick,
  icon,
  isIcon = false,
  indicator,
  contextMenu,
  danger = false,
  disabled
}: DataTableActionType | DataTableSelectableActionType<T>) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const actionType = contextMenu ? 'contextMenu' : content ? 'popup' : 'button';

  const { selectableMode, selectedRows, data, page, limit } = useDataTableContext();

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const { ltePhoneL } = useWindowSize();

  const selectedData: T[] | undefined = useMemo(() => {
    if (!selectableMode) {
      return undefined;
    }

    return selectedRows.map((selectedRowIndex: number) => {
      return data[selectedRowIndex];
    });
  }, [selectableMode, data, selectedRows, page, limit]);

  const onButtonClick = () => {
    if (actionType === 'button') {
      onClick?.(selectedData);
    } else if (actionType === 'popup') {
      setIsPopupVisible(!isPopupVisible);
    }
  };

  const adaptedContextMenu = useMemo(() => {
    if (!selectableMode) {
      return contextMenu;
    }

    function adoptMenu(menu: ContextMenuType) {
      if (!menu) {
        return [];
      }

      return menu.map((menu) => {
        if ('children' in menu) {
          return {
            ...menu,
            children: adoptMenu(menu.children)
          } as ParentContextAction;
        } else {
          return {
            ...menu,
            onClick: menu.onClick.bind(null, selectedData)
          } as ContextAction;
        }
      });
    }

    return adoptMenu(contextMenu || []);
  }, [contextMenu, selectedData, selectableMode]);

  const closePopup = useCallback(() => {
    setIsPopupVisible(false);
  }, []);

  return (
    <>
      <Button
        ref={buttonRef}
        title={label}
        leftIcon={!ltePhoneL && !isIcon ? icon : undefined}
        variant={ButtonVariant.text}
        isIcon={isIcon || ltePhoneL}
        onClick={actionType !== 'contextMenu' ? onButtonClick : undefined}
        dropdown={actionType === 'contextMenu' ? adaptedContextMenu : undefined}
        indicator={indicator}
        disabled={disabled === undefined ? selectableMode && selectedRows.length === 0 : disabled}
        role={danger ? Role.danger : Role.default}>
        {ltePhoneL || isIcon ? icon : label}
      </Button>
      {actionType === 'popup' && isPopupVisible && (
        <FloatingBox
          targetElement={buttonRef.current}
          onClose={() => setIsPopupVisible(false)}
          mobileBehaviour={FloatingBoxMobileBehaviour.modal}
          minWidth={250}
          useParentWidth>
          <div className="alt-data-table-action">
            {content?.({ closePopup, ...(selectableMode ? { selectedRows: selectedData } : {}) })}
          </div>
        </FloatingBox>
      )}
    </>
  );
};

export default memo(DataTableAction);
