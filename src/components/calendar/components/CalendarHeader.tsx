import { memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from 'components/button';
import { useLocalization } from '../../application/useLocalization';
import s from '../calendar.module.scss';

interface CalendarHeaderProps {
  caption: string;
  showNavigation: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export const CalendarHeader = memo<CalendarHeaderProps>(
  ({ caption, showNavigation, onPrev, onNext }) => {
    const t = useLocalization();

    return (
      <div className={s.Header}>
        {showNavigation ? (
          <Button
            className={s.NavButton}
            icon={<ChevronLeft />}
            label={t('calendar.previousMonth')}
            showLabel={false}
            onClick={onPrev}
          />
        ) : null}
        <span className={s.Caption}>{caption}</span>
        {showNavigation ? (
          <Button
            className={s.NavButton}
            icon={<ChevronRight />}
            label={t('calendar.nextMonth')}
            showLabel={false}
            onClick={onNext}
          />
        ) : null}
      </div>
    );
  },
);
