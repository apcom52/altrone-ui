import { memo, useContext, useEffect, useState, isValidElement } from "react";
import React from "react";
import clsx from "clsx";
import { EntityListItemProps } from "../EntityList.types";
import s from './item.module.scss';
import { Checkbox } from "components/checkbox";
import { EntityListSelectableContext } from "../EntityList.context";
import { Slot } from "utils/components/Slot";

const ItemContent = memo(({ icon, title, subtitle, onClick, disabled }: Pick<EntityListItemProps, 'icon' | 'title' | 'subtitle' | 'onClick' | 'disabled'>) => {
  return (
    <div className={s.Header} onClick={!disabled ? onClick : undefined}>
      {title && <div className={s.Title}>
        {icon && <div className={s.Icon}>{icon}</div>}
        {title}
      </div>}
      {subtitle && <div className={s.Subtitle}>{subtitle}</div>}
    </div>
  );
});

export const Item = memo(({ ref, title, subtitle, icon, meta, children, disabled, onSelect, onClick, asChild = false, className, ...props }: EntityListItemProps) => {
  const [checked, setChecked] = useState(false);
  const selectable = useContext(EntityListSelectableContext);

  useEffect(() => {
    setChecked(false);
  }, [selectable]);

  const handleSelectableChange = (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(checked);
    onSelect?.(checked, event);
  };

  const cls = clsx(s.Item, className, {
    [s.Checked]: checked,
    [s.Clickable]: onClick && !disabled,
    [s.Disabled]: disabled,
  });

  const content = <ItemContent icon={icon} title={title} subtitle={subtitle} onClick={onClick} disabled={disabled} />;

  if (asChild) {
    if (!isValidElement(children)) {
      console.error("[EntityList] Item: children must be a valid React element when asChild=true");
      return null;
    }
    const childWithContent = React.cloneElement(children as React.ReactElement, {
      children: (
        <>
          {selectable && (
            <div className={s.Checkbox}>
              <Checkbox checked={checked} onChange={handleSelectableChange} disabled={disabled} />
            </div>
          )}
          {content}
          {meta && (
            <div className={s.Panel}>
              <div className={s.Meta}>{meta}</div>
            </div>
          )}
        </>
      ),
    });
    return <Slot ref={ref} className={cls} {...props}>{childWithContent}</Slot>;
  }

  return (
    <div ref={ref} className={cls} {...props}>
      {selectable && (
        <div className={s.Checkbox}>
          <Checkbox checked={checked} onChange={handleSelectableChange} disabled={disabled} />
        </div>
      )}
      {content}
      <div className={s.Panel}>
        {meta && <div className={s.Meta}>{meta}</div>}
        {children}
      </div>
    </div>
  );
});
