import clsx from "clsx";
import { Item } from "./components";
import { EntityListProps } from "./EntityList.types";
import s from './styles.module.scss';
import { EntityListSelectableContext } from "./EntityList.context";

const EntityListComponent = ({ children, className, style, selectable = false, ...props }: EntityListProps) => {
  const cls = clsx(s.EntityList, className);

  return (
    <EntityListSelectableContext value={selectable}>
      <div className={cls} style={style} {...props}>
        {children}
      </div>
    </EntityListSelectableContext>
  );
};

const EntityListNamespace = Object.assign(EntityListComponent, {
  Item: Item,
});

export { EntityListNamespace as EntityList };