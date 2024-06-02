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
