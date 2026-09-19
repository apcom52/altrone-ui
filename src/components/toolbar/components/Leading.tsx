import { memo } from 'react';
import { ToolbarLeadingProps } from '../Toolbar.types.ts';
import s from './group.module.scss';
import clsx from 'clsx';
import { mergeRefs } from 'utils';
import { useToolbarOverflow } from '../useToolbarOverflow.tsx';
import { useToolbarContext } from '../Toolbar.context.ts';

export const Leading = memo(
  ({ ref, children, className, ...restProps }: ToolbarLeadingProps) => {
    const { orientation } = useToolbarContext();
    const { containerRef, content } = useToolbarOverflow(children, orientation);

    return (
      <div
        ref={mergeRefs(ref, containerRef)}
        className={clsx(s.Region, s.Leading, className)}
        data-toolbar-region="leading"
        {...restProps}
      >
        {content}
      </div>
    );
  },
);
