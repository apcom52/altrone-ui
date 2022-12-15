import {memo, useState} from "react";
import {Direction} from "../../../types";
import clsx from "clsx";
import './checkbox-list.scss';
import {useLocalization} from "../../../hooks";

interface CheckboxListProps extends React.HTMLProps<HTMLDivElement> {
  direction?: Direction
  limit?: number
}

const CheckboxList = ({ children = [], direction = Direction.horizontal, className, limit = 5, ...props }: CheckboxListProps) => {
  const t = useLocalization()

  const length = Array.isArray(children) ? children.length : 1
  const [isExpanded, setIsExpanded] = useState(length <= limit)

  const onExpandClick = () => {
    setIsExpanded(state => !state)
  }

  let validLimit = limit > 1 ? limit : 1

  const visibleChildren =  Array.isArray(children)
    ? isExpanded
      ? children
      : children.slice(0, validLimit)
    : children

  return <div className={clsx('alt-checkbox-list', className, {
    'alt-checkbox-list--vertical': direction === Direction.vertical
  })} {...props}>
    {visibleChildren}
    {length > limit && <div className='alt-checkbox-list__actions'>
      <button className='alt-checkbox-list__expand' onClick={onExpandClick}>
        {isExpanded ? t('common.less') : t('common.more')}
      </button>
    </div>}
  </div>
}

export default memo(CheckboxList)