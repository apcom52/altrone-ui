import { memo } from 'react';
import { ToolbarCenterProps } from '../Toolbar.types.ts';
import s from './group.module.scss';
import clsx from 'clsx';
import { mergeRefs } from 'utils';
import { useToolbarOverflow } from '../useToolbarOverflow.tsx';
import { useToolbarContext, useToolbarBalance } from '../Toolbar.context.ts';

export const Center = memo(
  ({ ref, children, className, ...restProps }: ToolbarCenterProps) => {
    const { orientation } = useToolbarContext();
    const balance = useToolbarBalance();
    const { containerRef, content } = useToolbarOverflow(children, orientation, {
      onNaturalSizeChange: (size) => balance?.reportNaturalSize('center', size),
    });

    return (
      <div
        ref={mergeRefs(ref, containerRef)}
        className={clsx(s.Region, s.Center, className)}
        data-toolbar-region="center"
        {...restProps}
      >
        {content}
      </div>
    );
  },
);
