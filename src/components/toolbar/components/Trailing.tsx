import { memo } from 'react';
import { ToolbarTrailingProps } from '../Toolbar.types.ts';
import s from './group.module.scss';
import clsx from 'clsx';
import { mergeRefs } from 'utils';
import { useToolbarOverflow } from '../useToolbarOverflow.tsx';
import { useToolbarContext } from '../Toolbar.context.ts';

export const Trailing = memo(
  ({ ref, children, className, ...restProps }: ToolbarTrailingProps) => {
    const { orientation } = useToolbarContext();
    const { containerRef, content } = useToolbarOverflow(
      children,
      orientation,
      'start',
    );

    return (
      <div
        ref={mergeRefs(ref, containerRef)}
        className={clsx(s.Region, s.Trailing, className)}
        data-toolbar-region="trailing"
        {...restProps}
      >
        {content}
      </div>
    );
  },
);
