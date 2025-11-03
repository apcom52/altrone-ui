import clsx from 'clsx';
import s from './loading.module.scss';
import { forwardRef } from 'react';
import { LoadingIslandProps } from '../TextInput.types.ts';
import { useConfiguration } from 'components/configuration';
import { Loading } from '../../loading';
import { useTextInputSize } from '../TextInput.context.ts';
import { Size } from 'types/entity.ts';

const LoadingSizes: Record<Size, string> = {
  mini: '12px',
  s: '14px',
  m: '16px',
  l: '20px',
  xl: '24px',
};

export const LoadingIsland = forwardRef<HTMLDivElement, LoadingIslandProps>(
  ({ className, style, ...props }, ref) => {
    const { textInput: { loadingIsland: loadingIslandConfig = {} } = {} } =
      useConfiguration();

    const inputSize = useTextInputSize();

    const cls = clsx(s.LoadingIsland, className, loadingIslandConfig.className);

    const styles = {
      ...loadingIslandConfig.style,
      ...style,
    };

    const loadingSize = LoadingSizes[inputSize];

    return (
      <div className={cls} style={styles} role="status" ref={ref} {...props}>
        <Loading size={loadingSize} strokeWidth="1.5" />
      </div>
    );
  }
);
