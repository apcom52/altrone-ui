import { PropsWithChildren, useEffect, useState } from 'react';
import { Icon } from '../../typography';
import './spoiler.scss';
import clsx from 'clsx';

interface SpoilerProps extends PropsWithChildren {
  label: string;
  openedByDefault?: boolean;
}

/**
 * This component is used to group content and allow to toggle them
 * @param label
 * @param openedByDefault
 * @param children
 * @constructor
 */
const Spoiler = ({ label, openedByDefault = true, children }: SpoilerProps) => {
  const [opened, setOpened] = useState(openedByDefault);

  useEffect(() => {
    setOpened(openedByDefault);
  }, [openedByDefault]);

  return (
    <div
      className={clsx('alt-spoiler', {
        'alt-spoiler--opened': opened
      })}>
      <button className="alt-spoiler__header" onClick={() => setOpened(!opened)}>
        <span className="alt-spoiler__headerIcon">
          <Icon i="chevron_right" />
        </span>
        <span className="alt-spoiler__headerLabel">{label}</span>
      </button>
      {!!opened && <div className="alt-spoiler__content">{children}</div>}
    </div>
  );
};

export default Spoiler;
