import { memo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Action } from './Action.tsx';
import { ToolbarBackActionProps } from '../Toolbar.types.ts';
import { useLocalization } from 'components/application';

export const BackAction = memo(
  ({ showLabel = false, ...restProps }: ToolbarBackActionProps) => {
    const t = useLocalization();

    return (
      <Action
        {...restProps}
        label={t('toolbar.back')}
        icon={<ArrowLeft />}
        showLabel={showLabel}
      />
    );
  },
);
