import clsx from "clsx";
import { EntityListItemProps } from "../EntityList.types";
import s from './item.module.scss';
import { Checkbox } from "components/checkbox";
import { useContext, useEffect, useState } from "react";
import { EntityListSelectableContext } from "../EntityList.context";

export const Item = ({ title, subtitle, icon, meta, children, disabled, onSelect, onClick, ...props }: EntityListItemProps) => {
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

  return (
    <div className={cls} {...props}>
      {selectable && <div className={s.Checkbox}>
        <Checkbox checked={checked} onChange={handleSelectableChange} disabled={disabled} />
      </div>}
      <div className={s.Header} onClick={!disabled ? onClick : undefined}>
        {title && <div className={s.Title}>
          {icon && <div className={s.Icon}>{icon}</div>}
          {title}
        </div>}
        {subtitle && <div className={s.Subtitle}>{subtitle}</div>}
      </div>
      <div className={s.Panel}>
        {meta && <div className={s.Meta}>{meta}</div>}
        {children}
      </div>
    </div>
  );
};