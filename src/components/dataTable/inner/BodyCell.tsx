import { useRef } from 'react';
import type { MouseEventHandler, ReactNode } from 'react';
import { Copy } from 'lucide-react';
import { useLocalization } from '../../application';
import { Dropdown } from '../../dropdown';
import { useDataTableContext } from '../DataTable.context';
import s from './body.module.scss';

interface BodyCellProps {
  children: ReactNode;
  copyFallback?: string;
  rowSelected: boolean;
  onToggleRowSelection?: MouseEventHandler<HTMLButtonElement>;
}

export const BodyCell = ({
  children,
  copyFallback,
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
      content={
        <Dropdown.Menu>
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
      }
    >
      {cell}
    </Dropdown>
  );
};
