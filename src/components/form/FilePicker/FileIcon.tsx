import './file-icon.scss';
import { PropsWithChildren } from 'react';

interface FileIconProps {}

export const FileIcon = ({ children }: PropsWithChildren<FileIconProps>) => {
  return (
    <div className="alt-file-icon">
      <div className="alt-file-icon__content">
        {typeof children === 'string' ? (
          <div className="alt-file-icon__extension">{children}</div>
        ) : (
          children
        )}
      </div>
      <svg
        width="80"
        height="103"
        viewBox="0 0 80 103"
        fill="none"
        className="alt-file-icon__decorations"
        xmlns="http://www.w3.org/2000/svg">
        <mask id="file-icon-mask">
          <path
            d="M0 102.662V0L80 0.0649351V65.0649C79.3126 74.0876 78.5337 78.1914 75.974 82.6623C71.2488 87.4251 67.6682 90.097 55.6494 94.8701C43.5502 99.7795 30.826 101.718 17.5974 102.662H0Z"
            fill="transparent"
          />
        </mask>
        <path
          d="M77.8571 79.6104L79.2207 70.1299L43.6363 77.4026L19.3506 102.338L29.6753 101.623L49.5454 96.7533L74.1558 84.4805L77.8571 79.6104Z"
          fill="url(#paint0_radial_3014_70)"
        />
        <path
          d="M18.5713 102.532L29.0258 101.169C34.8096 99.805 37.9516 98.6636 43.3115 95.7143C50.1193 90.7653 53.7234 87.8717 57.857 81.4286C61.5074 83.4066 63.7187 84.27 67.9869 85.3247C71.0346 85.676 72.5454 85.1582 74.9349 83.1818C77.2306 80.0388 78.0534 78.0744 78.7661 74.2208L79.9349 65.2598L78.9609 74.2208C78.492 77.3538 77.9057 79.2584 76.6882 81.2153C76.3325 81.7871 75.9228 82.3633 75.4465 82.9759L74.9349 83.7013C73.0435 85.5546 71.6222 86.6935 67.9869 89.026C62.4152 92.1171 59.354 93.3683 53.896 95.5844C45.4613 98.4464 40.6736 99.7593 31.9479 101.169L18.5713 102.532Z"
          fill="url(#paint1_linear_3014_70)"
        />
        <path
          d="M29.0258 101.169L18.5713 102.532L29.0258 101.364C35.0121 100.153 38.2429 99.0563 43.3765 95.9741C50.3401 91.3373 53.8862 88.557 57.857 82.0779C61.6438 83.9064 63.8228 84.7438 67.9869 85.6494C71.4662 86.0704 72.9341 85.3919 75.1297 83.3766C77.4747 80.4559 78.3255 78.466 78.9609 74.2208L79.9349 65.2598L78.7661 74.2208C78.0534 78.0744 77.2306 80.0388 74.9349 83.1818C72.5454 85.1582 71.0346 85.676 67.9869 85.3247C63.7187 84.27 61.5074 83.4066 57.857 81.4286C53.7234 87.8717 50.1193 90.7653 43.3115 95.7143C37.9516 98.6636 34.8096 99.805 29.0258 101.169Z"
          fill="var(--border)"
        />
        <defs>
          <radialGradient
            id="paint0_radial_3014_70"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(56.4285 92.3377) rotate(-117.3) scale(13.5918 56.6489)">
            <stop stopOpacity="0.07" />
            <stop offset="0.893651" stopOpacity="0" />
            <stop offset="1" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id="paint1_linear_3014_70"
            x1="57.1427"
            y1="82.4676"
            x2="64.6752"
            y2="100.649"
            gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--metalTop)" />
            <stop offset="1" stopColor="var(--metalBottom)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
