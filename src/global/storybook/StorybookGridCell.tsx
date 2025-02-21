import s from './gridCell.module.scss';

interface StorybookGridCellProps extends React.HTMLAttributes<HTMLDivElement> {}

export const StorybookGridCell = ({ children }: StorybookGridCellProps) => {
  return (
    <div className={s.GridCell}>
      <span className="label-text">{children}</span>
    </div>
  );
};
