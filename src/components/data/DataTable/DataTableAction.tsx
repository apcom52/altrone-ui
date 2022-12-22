import {memo} from "react";
import {DataTableAction as DataTableActionType} from "./DataTable";
import {Button, ButtonVariant} from "../../button";

const DataTableAction = ({ label, content, onClick, icon, isIcon = false, indicator, contextMenu, danger = false}: DataTableActionType) => {
  const actionType = contextMenu ? 'contextMenu' : content ? 'popup' : 'button';

  return <>
    <Button
      title={label}
      leftIcon={!isIcon ? icon : undefined}
      variant={ButtonVariant.text}
      isIcon={isIcon}
      onClick={actionType === 'button' ? onClick : undefined}
      dropdown={actionType === 'contextMenu' ? contextMenu : undefined}
    >
      {isIcon ? icon : label}
    </Button>
  </>
}

export default memo(DataTableAction)