import clsx from 'clsx';
import s from './loading.module.scss';
import { forwardRef } from 'react';
import { LoadingIslandProps } from '../TextInput.types.ts';
import { useConfiguration } from 'components/configuration';
import { Loading } from '../../loading';
import { useTextInputSize } from '../TextInput.context.ts';

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

    const loadingSize =
      inputSize === 'l' ? '20px' : inputSize === 's' ? '12px' : '16px';

    return (
      <div className={cls} style={styles} role="status" ref={ref} {...props}>
        <Loading size={loadingSize} strokeWidth="1.5" />
      </div>
    );
  },
);
