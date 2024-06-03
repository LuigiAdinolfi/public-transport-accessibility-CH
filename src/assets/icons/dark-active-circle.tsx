import React from "react";

type IconProps = React.HTMLAttributes<SVGElement>;

export const DarkActiveCircle: React.FC<IconProps> = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_2698_976)">
      <path
        d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z"
        fill="#CBD5E1"
        stroke="#CBD5E1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2698_976">
        <rect width="12" height="12" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const DarkActiveSmallCircle: React.FC<IconProps> = () => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_2698_976)">
      <path
        d="M4.00008 7.33342C5.84103 7.33342 7.33342 5.84103 7.33342 4.00008C7.33342 2.15913 5.84103 0.666748 4.00008 0.666748C2.15913 0.666748 0.666748 2.15913 0.666748 4.00008C0.666748 5.84103 2.15913 7.33342 4.00008 7.33342Z"
        fill="#CBD5E1"
        stroke="#CBD5E1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2698_976">
        <rect width="8" height="8" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
