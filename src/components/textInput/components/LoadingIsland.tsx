import clsx from 'clsx';
import s from './loading.module.scss';
import { LoadingIslandProps } from '../TextInput.types.ts';
import { Loading } from '../../loading';
import { useTextInputSize } from '../TextInput.context.ts';
import { Size } from 'types/entity.ts';
import { useLocalization } from '../../application/useLocalization.tsx';

const LoadingSizes: Record<Size, string> = {
  mini: '12px',
  s: '14px',
  m: '16px',
  l: '20px',
  xl: '24px',
};

export const LoadingIsland = ({
  ref,
  className,
  placement,
  ...props
}: LoadingIslandProps) => {
  const t = useLocalization();

  return (
    <div
      ref={ref}
      data-placement={placement}
      className={clsx(s.LoadingIsland, className)}
      role="status"
      aria-label={t('textInput.loading')}
      {...props}
    >
      <Loading size={LoadingSizes[useTextInputSize()]} strokeWidth="1.5" />
    </div>
  );
};
