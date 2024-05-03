import { memo } from 'react';
import s from './footer.module.scss';
import { Button, Icon } from 'components';

export const DatePickerFooter = memo(() => {
  return (
    <div className={s.Footer}>
      <Button transparent leftIcon={<Icon i="backspace" />} label="Clear" />
      <Button transparent leftIcon={<Icon i="event" />} label="Today" />
    </div>
  );
});
