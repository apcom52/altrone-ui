import { useRef } from 'react';
import type { MouseEventHandler, ReactNode } from 'react';
import { Copy } from 'lucide-react';
import { useLocalization } from '../../application';
import { Dropdown } from '../../dropdown';
import { Divider } from '../../divider';
import { useDataTableContext } from '../DataTable.context';
import type { RowActionsCellProps } from './RowActionsCell';
import s from './body.module.scss';

interface BodyCellProps {
  children: ReactNode;
  copyFallback?: string;
  rowActions: RowActionsCellProps['children'];
  rowSelected: boolean;
  onToggleRowSelection?: MouseEventHandler<HTMLButtonElement>;
}

export const BodyCell = ({
  children,
  copyFallback,
  rowActions,
  rowSelected,
  onToggleRowSelection,
}: BodyCellProps) => {
  const t = useLocalization();
  const { icons, loading } = useDataTableContext();
  const cellRef = useRef<HTMLDivElement>(null);
  const cell = (
    <div ref={cellRef} role="cell" className={s.Cell}>
      {children}
    </div>
  );

  if (loading) return cell;

  return (
    <Dropdown
      trigger="contextmenu"
      closeParentPopover={false}
      content={() => {
        const actions = (Array.isArray(rowActions) ? rowActions : [rowActions])
          .flatMap((action, index) => {
            if (!action) return [];
            const { key, props } = action;

            return [
              <Dropdown.Action
                key={key ?? index}
                label={props.label}
                icon={props.icon ?? props.additionalIcon}
                badge={props.badge}
                danger={props.danger}
                disabled={
                  props.disabled || (props.state != null && props.state !== 'idle')
                }
                asChild={props.asChild}
                onClick={props.onClick}
              >
                {props.children}
              </Dropdown.Action>,
            ];
          });

        return (
          <Dropdown.Menu>
            {actions.length > 0 ? (
              <>
                {actions}
                <Divider />
              </>
            ) : null}
            <Dropdown.Action
              label={t('dataTable.copyCell')}
              icon={<Copy />}
              onClick={() => {
                const element = cellRef.current;
                const text = element?.innerText ?? element?.textContent;
                void navigator.clipboard
                  ?.writeText(text || copyFallback || '')
                  .catch(() => undefined);
              }}
            />
            {onToggleRowSelection ? (
              <Dropdown.Action
                label={t(rowSelected ? 'dataTable.deselectRow' : 'dataTable.selectRow')}
                icon={rowSelected ? icons.disableSelection : icons.enableSelection}
                onClick={onToggleRowSelection}
              />
            ) : null}
          </Dropdown.Menu>
        );
      }}
    >
      {cell}
    </Dropdown>
  );
};
