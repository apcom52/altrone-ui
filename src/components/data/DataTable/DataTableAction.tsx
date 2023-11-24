import { memo, useCallback, useMemo, useRef, useState } from 'react';
import type {
  DataTableAction,
  DataTableSelectableAction,
  DataTableSelectablePopupActionProps
} from './DataTableAction.types';
import { Button, ButtonVariant } from '../../form';
import { FloatingBox, FloatingBoxMobileBehaviour } from '../../containers';
import { ContextAction, ContextMenuType, ParentContextAction, Role } from '../../../types';
import { useWindowSize } from '../../../hooks';
import { useDataTableContext } from './DataTable.context';
import { DataTablePopupActionProps } from './DataTableAction.types';

const DataTableAction = <T extends object>({
  label,
  icon,
  isIcon = false,
  indicator,
  danger = false,
  disabled,
  onClick,
  content,
  contextMenu
}: DataTableAction | DataTableSelectableAction<T>) => {
  let actionType = 'button';
  if (Array.isArray(contextMenu)) {
    actionType = 'contextMenu';
  } else if (typeof content === 'object' || typeof content === 'function') {
    actionType = 'popup';
  }

  const buttonRef = useRef<HTMLButtonElement>(null);

  const { selectableMode, selectedRows, data, page, limit } = useDataTableContext<T>();

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
      onClick?.(selectedData || []);
    } else if (actionType === 'popup') {
      setIsPopupVisible(!isPopupVisible);
    }
  };

  const adaptedContextMenu = useMemo(() => {
    if (!selectableMode) {
      return contextMenu;
    }

    function adoptMenu(menu: ContextMenuType): (ContextAction | ParentContextAction)[] {
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
            onClick: 'onClick' in menu ? menu.onClick.bind(null, selectedData) : undefined
          } as ContextAction;
        }
      });
    }

    return adoptMenu(contextMenu || []);
  }, [contextMenu, selectedData, selectableMode]);

  const closePopup = useCallback(() => {
    setIsPopupVisible(false);
  }, []);

  const ContentElement = content as React.FC<
    DataTablePopupActionProps | DataTableSelectablePopupActionProps<T>
  >;

  return (
    <>
      <Button
        ref={buttonRef}
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
          <ContentElement
            closePopup={closePopup}
            selectedRows={selectableMode ? selectedData : undefined}
          />
        </FloatingBox>
      )}
    </>
  );
};

export default memo(DataTableAction) as typeof DataTableAction;
