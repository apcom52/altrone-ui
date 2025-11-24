import { memo, useMemo } from 'react';
import { DataGridFieldType, DataGridProps } from './DataGrid.types';
import s from './styles.module.scss';
import clsx from 'clsx';
import { Button } from 'components/button';
import { useLocalization } from 'components/application';
import { Field } from './inner/Field';

export const DataGrid = memo<DataGridProps>((props) => {
  const {
    data,
    fields,
    groups,
    showToolbar = true,
    mode = 'read',
    className,
    style,
    onChange,
    onChangeMode,
    ...restProps
  } = props;

  const t = useLocalization();

  const groupedFields = useMemo(() => {
    const groups: Record<string, DataGridFieldType[]> = {
      __common__: [],
    };

    for (const field of fields) {
      if (field.group) {
        groups[field.group] = groups[field.group] || [];
        groups[field.group].push(field);
      } else {
        groups.__common__.push(field);
      }
    }
    return groups;
  }, []);

  const cls = clsx(s.DataGrid, className);
  const styles = {
    ...style,
  };

  const toolbarVisible = showToolbar && ['read', 'edit'].includes(mode);
  const toolbar =
    mode === 'read' ? (
      <Button label={t('common.edit')} onClick={() => onChangeMode('edit')} />
    ) : (
      <Button
        label={t('common.done')}
        variant="submit"
        onClick={() => onChangeMode('read')}
      />
    );

  return (
    <div className={cls} style={styles} {...restProps}>
      {showToolbar && (
        <div className={s.Toolbar}>{toolbarVisible && toolbar}</div>
      )}
      <div className={s.Fields}>
        {groupedFields.__common__.map((field) => (
          <Field
            key={field.accessor}
            mode={mode}
            value={data[field.accessor]}
            onChange={(value) => onChange(field.accessor, value)}
            {...field}
          />
        ))}
      </div>
    </div>
  );
});
