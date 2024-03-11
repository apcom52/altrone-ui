import { forwardRef } from 'react';
import clsx from 'clsx';
import { Align } from '../../../../types';
import { useToolbarContext } from '../Toolbar';

interface ToolbarGroupProps extends React.PropsWithChildren {
  align?: Align;
  fluid?: boolean;
  className?: string;
}

export const ToolbarGroup = forwardRef<HTMLDivElement, ToolbarGroupProps>(
  ({ children, className, fluid = false, align = Align.center }, ref) => {
    const { isCompact } = useToolbarContext();

    return (
      <div
        className={clsx('alt-toolbar-group', className, {
          'alt-toolbar-group--fluid': fluid,
          'alt-toolbar-group--align-start': align === Align.start,
          'alt-toolbar-group--align-end': align === Align.end,
          'alt-toolbar-group--compact': isCompact
        })}
        data-testid="alt-test-toolbarGroup"
        ref={ref}>
        {children}
      </div>
    );
  }
);
