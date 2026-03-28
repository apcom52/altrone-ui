import clsx from "clsx";
import { EntityListItemProps } from "../EntityList.types";
import s from './item.module.scss';
import { Checkbox } from "components/checkbox";
import { useContext, useEffect, useState } from "react";
import { EntityListSelectableContext } from "../EntityList.context";
import React from "react";
import { cloneWithRef } from "utils/utils/cloneWithRef";
import { Slot } from "utils/components/Slot";
import { AnyObject } from "utils/types";

const ItemContent = ({ icon, title, subtitle, onClick, disabled }: Pick<EntityListItemProps, 'icon' | 'title' | 'subtitle' | 'onClick' | 'disabled'>) => {
  return (
    <div className={s.Header} onClick={!disabled ? onClick : undefined}>
      {title && <div className={s.Title}>
        {icon && <div className={s.Icon}>{icon}</div>}
        {title}
      </div>}
      {subtitle && <div className={s.Subtitle}>{subtitle}</div>}
    </div>
  )
}

export const Item = ({ title, subtitle, icon, meta, children, disabled, onSelect, onClick, asChild = false, ...props }: EntityListItemProps) => {
  const [checked, setChecked] = useState(false);
  const selectable = useContext(EntityListSelectableContext);

  useEffect(() => {
    setChecked(false);
  }, [selectable]);

  const handleSelectableChange = (checked: boolean) => {
    setChecked(checked);
    onSelect?.(checked);
  }

  const cls = clsx(s.Item, {
    [s.Checked]: checked,
    [s.Clickable]: onClick && !disabled,
    [s.Disabled]: disabled,
  }, props.className);

  const content = <ItemContent icon={icon} title={title} subtitle={subtitle} onClick={onClick} disabled={disabled} />;

  const childrenElements = React.Children.toArray(children);

  if (asChild && !React.isValidElement(childrenElements[0])) {
    console.error("[EntityList] Item: children must be a valid element");
    return null;
  }

  const childrenWithContent = childrenElements[0] ? cloneWithRef(childrenElements[0] as React.ReactElement, {
    children: content,
  }) : null;

  return (
    <div className={cls} {...props}>
      {selectable && <div className={s.Checkbox}>
        <Checkbox checked={checked} onChange={handleSelectableChange} disabled={disabled} />
      </div>}
      {asChild && childrenWithContent ? (
        <Slot<AnyObject> className={s.Header}>
          {childrenWithContent}
        </Slot>
      ) : (
        content
      )}
      <div className={s.Panel}>
        {meta && <div className={s.Meta}>{meta}</div>}
        {children}
      </div>
    </div>
  );
};