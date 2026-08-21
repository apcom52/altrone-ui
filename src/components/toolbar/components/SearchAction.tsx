import { memo } from 'react';
import { Search } from 'lucide-react';
import { Action } from './Action.tsx';
import { ToolbarSearchActionProps } from '../Toolbar.types.ts';
import { useLocalization } from 'components/application';

export const SearchAction = memo(
  ({ showLabel = false, ...restProps }: ToolbarSearchActionProps) => {
    const t = useLocalization();

    return (
      <Action
        {...restProps}
        label={t('toolbar.search')}
        icon={<Search />}
        showLabel={showLabel}
      />
    );
  },
);
