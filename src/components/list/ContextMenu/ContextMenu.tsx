import {ContextMenu as ContextMenuType, ParentContextAction} from "../../../types";
import {memo, useCallback, useState} from "react";
import {ContextMenuItem, ContextParentMenuItem} from "./index";
import './context-menu.scss'
import {Icon} from "../../icons";

interface ContextMenuComponentProps {
  menu: ContextMenuType
}

const ContextMenu = ({ menu }: ContextMenuComponentProps) => {
  const [selectedParentItem, setSelectedParentItem] = useState<ParentContextAction | null>(null)

  const onParentItemClick = useCallback((action: ParentContextAction | null) => {
    setSelectedParentItem(action)
  }, [])

  return <div className='alt-context-menu-list'>
    {selectedParentItem && [
      <ContextMenuItem icon={<Icon i='arrow_back_ios' />} title='Back' onClick={() => setSelectedParentItem(null)} />,
      ...selectedParentItem.children.map((item, itemIndex) => (
        <ContextMenuItem key={itemIndex} {...item} />
      ))
    ]}

    {!selectedParentItem && menu.map((item, itemIndex) => (
      'onClick' in item ? <ContextMenuItem key={itemIndex} {...item} /> : <ContextParentMenuItem key={itemIndex} onClick={onParentItemClick} {...item} />
    ))}
  </div>
}

export default memo(ContextMenu)