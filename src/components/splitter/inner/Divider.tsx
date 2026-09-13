import { type KeyboardEvent, type MouseEvent, type PointerEvent } from 'react';
import clsx from 'clsx';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from 'lucide-react';
import { Button } from 'components/button';
import { useLocalization } from '../../application';
import type { SplitterCollapsedControlsVisibility } from '../Splitter.types.ts';
import s from './divider.module.scss';

export interface DividerProps {
  id: string;
  index: number;
  isHorizontal: boolean;
  isDisabled: boolean;
  showControls: boolean;
  collapsedControlsVisibility: SplitterCollapsedControlsVisibility;
  sizeLeft: number;
  minLeft: number;
  maxLeft: number;
  leftCollapsible: boolean;
  rightCollapsible: boolean;
  leftCollapsed: boolean;
  rightCollapsed: boolean;
  onPointerDown: (i: number, e: PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (e: PointerEvent<HTMLDivElement>) => void;
  onKeyDown: (i: number, e: KeyboardEvent<HTMLDivElement>) => void;
  onCollapseLeft: (event: MouseEvent<HTMLButtonElement>) => void;
  onCollapseRight: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const SplitterDivider = ({
  id,
  index,
  isHorizontal,
  isDisabled,
  showControls,
  collapsedControlsVisibility,
  sizeLeft,
  minLeft,
  maxLeft,
  leftCollapsible,
  rightCollapsible,
  leftCollapsed,
  rightCollapsed,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onKeyDown,
  onCollapseLeft,
  onCollapseRight,
}: DividerProps) => {
  const t = useLocalization();

  const hasCollapse = showControls && (leftCollapsible || rightCollapsible);

  /** A collapsed panel's expand button: hidden entirely on `'never'`, pinned visible on `'always'`. */
  const collapsedBtn = (collapsed: boolean) => ({
    render: !(collapsed && collapsedControlsVisibility === 'never'),
    pinned: collapsed && collapsedControlsVisibility === 'always',
  });

  const left = collapsedBtn(leftCollapsed);
  const right = collapsedBtn(rightCollapsed);

  const CollapseLeftIcon = isHorizontal
    ? leftCollapsed
      ? ChevronRight
      : ChevronLeft
    : leftCollapsed
      ? ChevronDown
      : ChevronUp;

  const CollapseRightIcon = isHorizontal
    ? rightCollapsed
      ? ChevronLeft
      : ChevronRight
    : rightCollapsed
      ? ChevronUp
      : ChevronDown;

  return (
    <div
      role="separator"
      aria-orientation={isHorizontal ? 'vertical' : 'horizontal'}
      aria-valuemin={minLeft}
      aria-valuemax={maxLeft}
      aria-valuenow={Math.round(sizeLeft)}
      aria-controls={id}
      tabIndex={isDisabled ? -1 : 0}
      className={clsx(s.Divider, {
        [s.DividerVertical]: !isHorizontal,
        [s.DividerDisabled]: isDisabled,
      })}
      onPointerDown={isDisabled ? undefined : (e) => onPointerDown(index, e)}
      onPointerMove={isDisabled ? undefined : onPointerMove}
      onPointerUp={isDisabled ? undefined : onPointerUp}
      onKeyDown={isDisabled ? undefined : (e) => onKeyDown(index, e)}
    >
      <div
        className={clsx(s.Handle, {
          [s.HandleVertical]: !isHorizontal,
          [s.HandleHidden]: isDisabled,
        })}
      />

      {hasCollapse && (
        <>
          {leftCollapsible && left.render && (
            <Button
              size="s"
              icon={<CollapseLeftIcon />}
              className={clsx(
                s.CollapseBtn,
                isHorizontal ? s.CollapseBtnBefore : s.CollapseBtnBeforeV,
                { [s.CollapseBtnVisible]: left.pinned },
              )}
              showLabel={false}
              label={
                leftCollapsed
                  ? t('splitter.expandPanel')
                  : t('splitter.collapsePanel')
              }
              onPointerDown={(e) => e.stopPropagation()}
              onClick={onCollapseLeft}
            />
          )}

          {rightCollapsible && right.render && (
            <Button
              size="s"
              icon={<CollapseRightIcon />}
              className={clsx(
                s.CollapseBtn,
                isHorizontal ? s.CollapseBtnAfter : s.CollapseBtnAfterV,
                { [s.CollapseBtnVisible]: right.pinned },
              )}
              showLabel={false}
              label={
                rightCollapsed
                  ? t('splitter.expandPanel')
                  : t('splitter.collapsePanel')
              }
              onPointerDown={(e) => e.stopPropagation()}
              onClick={onCollapseRight}
            />
          )}
        </>
      )}
    </div>
  );
};

/** Hashed class name for the active-drag state — toggled by useSplitterDrag via classList. */
export const dividerActiveClass: string = s.DividerActive;
