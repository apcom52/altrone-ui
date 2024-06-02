import { memo, ReactEventHandler } from 'react';
import { SpoilerProps } from './Spoiler.types.ts';
import clsx from 'clsx';
import { Icon } from '../icon';
import s from './spoiler.module.scss';
import { useBoolean } from '../../utils';

export const Spoiler = memo<SpoilerProps>(
  ({
    children,
    className,
    style,
    openedByDefault = false,
    title,
    ...restProps
  }) => {
    const { value: opened, setValue: setOpened } = useBoolean(openedByDefault);

    const cls = clsx(
      s.Spoiler,
      {
        [s.Opened]: opened,
      },
      className,
    );

    const onToggle: ReactEventHandler<HTMLDetailsElement> = (event) => {
      setOpened((event.target as HTMLDetailsElement).open);
    };

    return (
      <details className={cls} open={opened} {...restProps} onToggle={onToggle}>
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
