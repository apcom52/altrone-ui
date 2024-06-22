import { memo, ReactEventHandler } from 'react';
import { SpoilerProps } from './Spoiler.types.ts';
import clsx from 'clsx';
import { Icon } from '../icon';
import s from './spoiler.module.scss';
import { useBoolean } from '../../utils';
import { useConfiguration } from 'components/configuration';

export const Spoiler = memo<SpoilerProps>(
  ({
    children,
    className,
    style,
    openedByDefault = false,
    title,
    onToggle,
    ...restProps
  }) => {
    const { spoiler: spoilerConfig = {} } = useConfiguration();

    const { value: opened, setValue: setOpened } = useBoolean(openedByDefault);

    const cls = clsx(
      s.Spoiler,
      {
        [s.Opened]: opened,
      },
      className,
      spoilerConfig.className,
    );

    const styles = {
      ...spoilerConfig.style,
      ...style,
    };

    const onToggleHandler: ReactEventHandler<HTMLDetailsElement> = (event) => {
      setOpened((event.target as HTMLDetailsElement).open);
      onToggle?.(event);
    };

    return (
      <details
        className={cls}
        open={opened}
        style={styles}
        {...restProps}
        onToggle={onToggleHandler}
      >
        <summary className={s.Heading}>
          {title}
          <div className={s.ArrowIcon} aria-hidden={true}>
            <Icon i={opened ? 'expand_less' : 'expand_more'} />
          </div>
        </summary>
        <div className={s.Content}>{children}</div>
      </details>
    );
  },
);
