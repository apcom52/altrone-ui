import {memo, useCallback, useRef, useState} from "react";
import type {DataTableAction as DataTableActionType} from "./DataTable";
import {Button, ButtonVariant} from "../../button";
import {FloatingBox} from "../../containers";
import {FloatingBoxMobileBehaviour} from "../../containers/FloatingBox/FloatingBox";
import {Role} from "../../../types";
import {useWindowSize} from "../../../hooks";

const DataTableAction = ({ label, content, onClick, icon, isIcon = false, indicator, contextMenu, danger = false}: DataTableActionType) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const actionType = contextMenu ? 'contextMenu' : content ? 'popup' : 'button';

  const [isPopupVisible, setIsPopupVisible] = useState(false)

  const { ltePhoneL } = useWindowSize()

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
      leftIcon={(!ltePhoneL && !isIcon) ? icon : undefined}
      variant={ButtonVariant.text}
      isIcon={isIcon || ltePhoneL}
      onClick={actionType !== 'contextMenu' ? onButtonClick : undefined}
      dropdown={actionType === 'contextMenu' ? contextMenu : undefined}
      indicator={indicator}
      role={danger ? Role.danger : Role.default}
    >
      {(ltePhoneL || isIcon) ? icon : label}
    </Button>
    {actionType === 'popup' && isPopupVisible && <FloatingBox
      targetElement={buttonRef.current}
      onClose={() => setIsPopupVisible(false)}
      mobileBehaviour={FloatingBoxMobileBehaviour.modal}
      minWidth={250}
      useParentWidth
    >
      <div className='alt-data-table-action'>
        {content?.({ closePopup })}
      </div>
    </FloatingBox>}
  </>
}

export default memo(DataTableAction)