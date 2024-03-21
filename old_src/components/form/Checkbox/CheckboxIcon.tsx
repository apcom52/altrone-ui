import clsx from 'clsx';
import './check-icon.scss';

export interface CheckboxIconProps {
  checked: boolean;
  width?: number;
  height?: number;
  className?: string;
}

export const CheckboxIcon = ({
  checked = true,
  width = 14,
  height = 9,
  className
}: CheckboxIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('alt-check-icon', className, {
        'alt-check-icon--checked': checked
      })}>
      <path
        d="M2 8.5L7 13.5L18.5 2"
        stroke="currentColor"
        className="alt-check-icon__iconPath"
        strokeDasharray={checked ? '40 0' : '0 40'}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
