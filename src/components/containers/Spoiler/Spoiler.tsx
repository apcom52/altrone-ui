import { PropsWithChildren, useEffect, useState } from 'react';
import { Icon } from '../../typography';
import './spoiler.scss';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useToggledState } from '../../../hooks';

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
  const {
    value: opened,
    enable: showSpoiler,
    disable: hideSpoiler,
    setValue: setOpened
  } = useToggledState(openedByDefault);

  const [height, setHeight] = useState(openedByDefault ? 'auto' : 0);

  const onHeaderClick = () => {
    if (!opened) {
      showSpoiler();
      setHeight('auto');
    } else {
      setHeight(0);
    }
  };

  const onAnimationComplete = () => {
    if (height === 0) {
      hideSpoiler();
    }
  };

  useEffect(() => {
    setOpened(openedByDefault);
    setHeight(openedByDefault ? 'auto' : 0);
  }, [openedByDefault]);

  return (
    <div
      className={clsx('alt-spoiler', {
        'alt-spoiler--opened': height === 'auto'
      })}>
      <button className="alt-spoiler__header" onClick={onHeaderClick}>
        <span className="alt-spoiler__headerIcon">
          <Icon i="chevron_right" />
        </span>
        <span className="alt-spoiler__headerLabel">{label}</span>
      </button>

      {opened && (
        <motion.div
          className="alt-spoiler__content"
          initial={{ height: 0 }}
          animate={{ height }}
          onAnimationComplete={onAnimationComplete}>
          {children}
        </motion.div>
      )}
    </div>
  );
};

export default Spoiler;
