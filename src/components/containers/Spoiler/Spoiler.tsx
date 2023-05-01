import { memo, PropsWithChildren } from 'react';

interface SpoilerProps extends PropsWithChildren {
  label: string;
  openedByDefault?: boolean;
}

const Spoiler = ({ label, openedByDefault = true, children }: SpoilerProps) => {
  return (
    <div>
      <button>{label}</button>
      <div>{children}</div>
    </div>
  );
};

export default memo(Spoiler) as typeof Spoiler;
