import { memo, ReactElement } from 'react';
import { Button } from 'components/button';
import { useLocalization } from '../../application/useLocalization';
import { useIcons } from '../../application/useIcons.tsx';
import s from '../calendar.module.scss';

interface CalendarHeaderProps {
  caption: string;
  showNavigation: boolean;
  onPrev: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onNext: (event: React.MouseEvent<HTMLButtonElement>) => void;
  prevIcon?: ReactElement;
  nextIcon?: ReactElement;
}

export const CalendarHeader = memo<CalendarHeaderProps>(
  ({ caption, showNavigation, onPrev, onNext, prevIcon, nextIcon }) => {
    const t = useLocalization();
    const icons = useIcons();

    return (
      <div className={s.Header}>
        {showNavigation ? (
          <Button
            className={s.NavButton}
            icon={prevIcon ?? icons.prev}
            label={t('calendar.previousMonth')}
            showLabel={false}
            onClick={onPrev}
          />
        ) : null}
        <span className={s.Caption}>{caption}</span>
        {showNavigation ? (
          <Button
            className={s.NavButton}
            icon={nextIcon ?? icons.next}
            label={t('calendar.nextMonth')}
            showLabel={false}
            onClick={onNext}
          />
        ) : null}
      </div>
    );
  },
);
