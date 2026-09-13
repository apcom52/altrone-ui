import { memo } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Action } from './Action.tsx';
import { Group } from './Group.tsx';
import { ToolbarBackForwardActionProps } from '../Toolbar.types.ts';
import { useLocalization } from 'components/application';

export const BackForwardAction = memo(
  ({
    ref,
    onBack,
    onForward,
    backDisabled,
    forwardDisabled,
    ...restProps
  }: ToolbarBackForwardActionProps) => {
    const t = useLocalization();

    return (
      <Group ref={ref} {...restProps}>
        <Action
          label={t('toolbar.back')}
          icon={<ArrowLeft />}
          showLabel={false}
          disabled={backDisabled}
          onClick={onBack}
        />
        <Action
          label={t('toolbar.forward')}
          icon={<ArrowRight />}
          showLabel={false}
          disabled={forwardDisabled}
          onClick={onForward}
        />
      </Group>
    );
  },
);
