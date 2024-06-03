import React from "react";

type IconProps = React.HTMLAttributes<SVGElement>;

export const LightActiveCircle: React.FC<IconProps> = (props) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_2698_979)">
      <path
        d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z"
        fill="#0F172A"
        stroke="#0F172A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2698_979">
        <rect width="12" height="12" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const LightActiveSmallCircle: React.FC<IconProps> = (props) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_2698_979)">
      <path
        d="M4.99992 9.16659C7.30111 9.16659 9.16659 7.30111 9.16659 4.99992C9.16659 2.69873 7.30111 0.833252 4.99992 0.833252C2.69873 0.833252 0.833252 2.69873 0.833252 4.99992C0.833252 7.30111 2.69873 9.16659 4.99992 9.16659Z"
        fill="#0F172A"
        stroke="#0F172A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2698_979">
        <rect width="10" height="10" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
