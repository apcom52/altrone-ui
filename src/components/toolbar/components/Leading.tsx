import { memo } from 'react';
import { ToolbarLeadingProps } from '../Toolbar.types.ts';
import s from './group.module.scss';
import clsx from 'clsx';
import { mergeRefs } from 'utils';
import { useToolbarOverflow } from '../useToolbarOverflow.tsx';
import { useToolbarContext } from '../Toolbar.context.ts';
import { useToolbarRegion } from '../useToolbarRegion.ts';

export const Leading = memo(
  ({ ref, children, className, ...restProps }: ToolbarLeadingProps) => {
    const { orientation, icons } = useToolbarContext();
    const region = useToolbarRegion('leading');
    const { containerRef, content } = useToolbarOverflow(children, orientation, {
      overflowIcons: icons,
      onNaturalSizeChange: region.onNaturalSizeChange,
    });

    return (
      <div
        ref={mergeRefs(ref, containerRef, region.ref)}
        className={clsx(s.Region, s.Leading, className)}
        data-toolbar-region="leading"
        {...restProps}
      >
        {content}
      </div>
    );
  },
);
