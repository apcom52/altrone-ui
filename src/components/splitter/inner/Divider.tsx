import React, { memo } from 'react';
import clsx from 'clsx';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from 'lucide-react';
import s from './divider.module.scss';
import { Button } from 'components/button';

export interface DividerProps {
  id: string;
  index: number;
  isHorizontal: boolean;
  isDisabled: boolean;
  showControls: boolean;
  sizeLeft: number;
  minLeft: number;
  maxLeft: number;
  leftCollapsible: boolean;
  rightCollapsible: boolean;
  leftCollapsed: boolean;
  rightCollapsed: boolean;
  onPointerDown: (i: number, e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (e: React.PointerEvent<HTMLDivElement>) => void;
  onKeyDown: (i: number, e: React.KeyboardEvent<HTMLDivElement>) => void;
  onCollapseLeft: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onCollapseRight: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SplitterDivider = memo(
  ({
    id,
    index,
    isHorizontal,
    isDisabled,
    showControls,
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
    const hasCollapse = showControls && (leftCollapsible || rightCollapsible);

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
            {leftCollapsible && (
              <Button
                size="s"
                icon={<CollapseLeftIcon />}
                className={clsx(
                  s.CollapseBtn,
                  isHorizontal ? s.CollapseBtnBefore : s.CollapseBtnBeforeV,
                  { [s.CollapseBtnVisible]: leftCollapsed },
                )}
                showLabel={false}
                label={leftCollapsed ? 'Expand panel' : 'Collapse panel'}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => onCollapseLeft(e)}
              />
            )}

            {rightCollapsible && (
              <Button
                size="s"
                icon={<CollapseRightIcon />}
                className={clsx(
                  s.CollapseBtn,
                  isHorizontal ? s.CollapseBtnAfter : s.CollapseBtnAfterV,
                  { [s.CollapseBtnVisible]: rightCollapsed },
                )}
                showLabel={false}
                label={rightCollapsed ? 'Expand panel' : 'Collapse panel'}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => onCollapseRight(e)}
              />
            )}
          </>
        )}
      </div>
    );
  },
);

SplitterDivider.displayName = 'SplitterDivider';

/** Hashed class name for the active-drag state — used by useSplitterDrag to toggle via classList. */
export const dividerActiveClass: string = s.DividerActive;
