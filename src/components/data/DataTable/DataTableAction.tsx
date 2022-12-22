import {cloneElement, memo, useCallback, useRef, useState} from "react";
import {DataTableAction as DataTableActionType} from "./DataTable";
import {Button, ButtonVariant} from "../../button";
import {FloatingBox} from "../../containers";
import {FloatingBoxMobileBehaviour} from "../../containers/FloatingBox/FloatingBox";

const DataTableAction = ({ label, content, onClick, icon, isIcon = false, indicator, contextMenu, danger = false}: DataTableActionType) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const actionType = contextMenu ? 'contextMenu' : content ? 'popup' : 'button';

  const [isPopupVisible, setIsPopupVisible] = useState(false)

  const onButtonClick = () => {
    if (actionType === 'button') {
      onClick?.()
    } else if (actionType === 'popup') {
      setIsPopupVisible(!isPopupVisible)
    }
  }

  const closePopup = useCallback(() => {
    setIsPopupVisible(false)
  }, [])

  return <>
    <Button
      ref={buttonRef}
      title={label}
      leftIcon={!isIcon ? icon : undefined}
      variant={ButtonVariant.text}
      isIcon={isIcon}
      onClick={actionType !== 'contextMenu' ? onButtonClick : undefined}
      dropdown={actionType === 'contextMenu' ? contextMenu : undefined}
    >
      {isIcon ? icon : label}
    </Button>
    {actionType === 'popup' && isPopupVisible && <FloatingBox
      targetElement={buttonRef.current}
      onClose={() => setIsPopupVisible(false)}
      mobileBehaviour={FloatingBoxMobileBehaviour.modal}
      minWidth={250}
      useParentWidth
    >
      <div className='alt-data-table-action'>
        {content && cloneElement(content, { closePopup })}
      </div>
    </FloatingBox>}
  </>
}

export default memo(DataTableAction)