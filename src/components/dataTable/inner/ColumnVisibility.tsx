import { useState } from 'react';
import type { ColumnVisibilityState } from '@tanstack/react-table';
import { useLocalization } from 'components/application';
import { Button } from 'components/button';
import { Checkbox } from 'components/checkbox';
import { Flex } from 'components/flex';
import { Popover } from 'components/popover';
import { Scrollable } from 'components/scrollable';
import { Toolbar } from 'components/toolbar';
import { Tooltip } from 'components/tooltip';
import { useDataTableContext } from '../DataTable.context';
import { columnHeaderLabel } from './columnHeaderLabel';

export const ColumnVisibility = () => {
  const t = useLocalization();
  const { table, icons, loading, notePendingEvent, defaultColumnVisibility } =
    useDataTableContext();
  const [draft, setDraft] = useState<ColumnVisibilityState>({});
  const columns = table.getAllLeafColumns();
  const visibleCount = columns.filter(
    (column) => draft[column.id] !== false,
  ).length;
  const label = t('dataTable.columnVisibility');

  return (
    <Popover
      title={t('dataTable.columns')}
      showCloseButton
      placement="bottom"
      onOpenChange={(open) => {
        if (open) setDraft(table.state.columnVisibility);
      }}
      content={({ hide }) => (
        <Flex orientation="vertical" gap="m">
          <Scrollable
            overflowX="hidden"
            maxHeight="min(320px, max(64px, calc(var(--popover-available-height, 100dvh) - 112px)))"
            style={{ marginInlineStart: -4 }}
          >
            <Flex orientation="vertical" gap="s" style={{ paddingInlineStart: 4 }}>
              {columns.map((column) => {
                const checked = draft[column.id] !== false;

                return (
                  <Checkbox
                    key={column.id}
                    checked={checked}
                    disabled={loading || (visibleCount === 1 && checked)}
                    onChange={(next) => {
                      setDraft((previous) => ({
                        ...previous,
                        [column.id]: next,
                      }));
                    }}
                  >
                    {columnHeaderLabel(column)}
                  </Checkbox>
                );
              })}
            </Flex>
          </Scrollable>
          <Flex gap="m" justify="center">
            <Button
              label={t('dataTable.resetColumns')}
              disabled={loading}
              onClick={() => setDraft(defaultColumnVisibility)}
            />
            <Button
              label={t('dataTable.showAllColumns')}
              disabled={loading}
              onClick={(event) => {
                notePendingEvent(event);
                table.setColumnVisibility({});
                hide();
              }}
            />
            <Button
              label={t('common.apply')}
              variant="submit"
              disabled={loading}
              onClick={(event) => {
                notePendingEvent(event);
                table.setColumnVisibility(draft);
                hide();
              }}
            />
          </Flex>
        </Flex>
      )}
    >
      <Tooltip content={label}>
        <Toolbar.Action
          icon={icons.columnVisibility}
          label={label}
          aria-label={label}
          showLabel={false}
          disabled={loading || columns.length === 0}
        />
      </Tooltip>
    </Popover>
  );
};
