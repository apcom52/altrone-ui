import clsx from "clsx";
import { Item } from "./components";
import { EntityListProps } from "./EntityList.types";
import s from './styles.module.scss';

const EntityListComponent = ({ children, className, style, ...props }: EntityListProps) => {
  const cls = clsx(s.EntityList, className);

  return (
    <div className={cls} style={style} {...props}>
      {children}
    </div>
  );
};

const EntityListNamespace = Object.assign(EntityListComponent, {
  Item: Item,
});

export { EntityListNamespace as EntityList };