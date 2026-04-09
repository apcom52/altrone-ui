import { memo, useMemo } from 'react';
import { DataGridFieldType, DataGridProps } from './DataGrid.types';
import s from './styles.module.scss';
import clsx from 'clsx';
import { Button } from 'components/button';
import { useLocalization } from 'components/application';
import { Field } from './inner/Field';
import { Spoiler } from 'components/spoiler';

const CommonFields = Symbol('CommonFields');

function DataGridComponent<
  T extends Record<string, unknown> = Record<string, unknown>,
>(props: DataGridProps<T>) {
  const {
    ref,
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
    const result: Record<string | symbol, DataGridFieldType[]> = {
      [CommonFields]: [],
    };

    for (const field of fields) {
      if (typeof field.visible === 'boolean' && !field.visible) {
        continue;
      }

      if (field.group) {
        result[field.group] = result[field.group] || [];
        result[field.group].push(field);
      } else {
        result[CommonFields].push(field);
      }
    }
    return result;
  }, [fields]);

  const cls = clsx(s.DataGrid, className);
  const styles = {
    ...style,
  };

  const toolbarVisible = showToolbar && ['read', 'edit'].includes(mode);
  const toolbar =
    mode === 'read' ? (
      <Button label={t('common.edit')} onClick={() => onChangeMode?.('edit')} />
    ) : (
      <Button
        label={t('common.done')}
        variant="submit"
        onClick={() => onChangeMode?.('read')}
      />
    );

  return (
    <div ref={ref} className={cls} style={styles} {...restProps}>
      {showToolbar && (
        <div className={s.Toolbar}>{toolbarVisible && toolbar}</div>
      )}
      <div className={s.Fields}>
        {groupedFields[CommonFields].map((field) => (
          <Field
            key={field.accessor}
            mode={mode}
            value={data[field.accessor]}
            onChange={(value) => onChange(field.accessor, value)}
            {...field}
          />
        ))}
        {groups?.map((group) => (
          <Spoiler
            key={group.name}
            title={group.title || group.name}
            openedByDefault
          >
            <div className={s.Fields}>
              {(groupedFields[group.name] ?? []).map((field) => (
                <Field
                  key={field.accessor}
                  mode={mode}
                  value={data[field.accessor]}
                  onChange={(value) => onChange(field.accessor, value)}
                  {...field}
                />
              ))}
            </div>
          </Spoiler>
        ))}
      </div>
    </div>
  );
}

export const DataGrid = memo(DataGridComponent) as typeof DataGridComponent;
