import clsx from 'clsx';
import { ToolbarTitleProps } from '../Toolbar.types';
import s from './title.module.scss';
import { ChevronDown } from 'lucide-react';
import { Button } from 'components/button';

export const Title = (props: ToolbarTitleProps) => {
  const { label, className, ...restProps } = props;

  const cls = clsx(s.Title, className);

  return (
    <div className={cls} {...restProps}>
      {label}
      <Button
        className={s.ToggleButton}
        icon={<ChevronDown />}
        label="Open"
        showLabel={false}
        size="mini"
      />
    </div>
  );
};
