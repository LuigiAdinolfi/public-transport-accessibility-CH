import React from "react";

type IconProps = React.HTMLAttributes<SVGElement>;

export const LightInactiveCircle: React.FC<IconProps> = (props) => (
  <svg
    width="13"
    height="12"
    viewBox="0 0 13 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_2600_2593)">
      <path
        d="M6.5 11C9.26142 11 11.5 8.76142 11.5 6C11.5 3.23858 9.26142 1 6.5 1C3.73858 1 1.5 3.23858 1.5 6C1.5 8.76142 3.73858 11 6.5 11Z"
        stroke="#CBD5E1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2600_2593">
        <rect width="12" height="12" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>
);

export const LightInactiveSmallCircle: React.FC<IconProps> = (props) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_2698_974)">
      <path
        d="M4.99992 9.16659C7.30111 9.16659 9.16659 7.30111 9.16659 4.99992C9.16659 2.69873 7.30111 0.833252 4.99992 0.833252C2.69873 0.833252 0.833252 2.69873 0.833252 4.99992C0.833252 7.30111 2.69873 9.16659 4.99992 9.16659Z"
        stroke="#CBD5E1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2698_974">
        <rect width="10" height="10" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
