import { Size } from 'types';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  firstName: string;
  lastName?: string;
  size?: Size;
  color?: string;
  imageSrc?: string;
}
