import clsx from "clsx";
import { EntityListItemProps } from "../EntityList.types";
import s from './item.module.scss';
import { Checkbox } from "components/checkbox";
import { useState } from "react";

export const Item = ({ title, subtitle, icon, meta, children, disabled, onSelect, ...props }: EntityListItemProps) => {
  const [checked, setChecked] = useState(false);

  const cls = clsx(s.Item, {
    [s.Checked]: checked,
  }, props.className);

  return (
    <div className={cls} {...props}>
      <div className={s.Checkbox}>
        <Checkbox checked={checked} onChange={setChecked} />
      </div>
      <div className={s.Header}>
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