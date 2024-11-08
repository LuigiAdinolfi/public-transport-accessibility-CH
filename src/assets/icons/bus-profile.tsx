import React from "react";

type IconProps = React.HTMLAttributes<SVGElement>;

export const DarkBusProfile: React.FC<IconProps> = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.146 4H2v1h13.146a2.5 2.5 0 0 1 2.236 1.382l2.46 4.92a1.5 1.5 0 0 1 .158.67V16.5a.5.5 0 0 1-.5.5H11a3 3 0 1 0-6 0H2v1h3.17a3.001 3.001 0 0 0 5.66 0h8.67a1.5 1.5 0 0 0 1.5-1.5v-4.528a2.5 2.5 0 0 0-.264-1.118l-2.46-4.92A3.5 3.5 0 0 0 15.146 4ZM2 7h3v4H2v1h4V6H2v1Zm5-1h6v6H7V6Zm1 1v4h4V7H8ZM6 17a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm8-11h1.809l.138.276 3 6 .053.106V14h-5V6Zm1 1v6h3v-.382L15.191 7H15Z"
      fill="#F8FAFC"
    />
  </svg>
);

export const LightBusProfile: React.FC<IconProps> = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.146 4H2v1h13.146a2.5 2.5 0 0 1 2.236 1.382l2.46 4.92a1.5 1.5 0 0 1 .158.67V16.5a.5.5 0 0 1-.5.5H11a3 3 0 1 0-6 0H2v1h3.17a3.001 3.001 0 0 0 5.66 0h8.67a1.5 1.5 0 0 0 1.5-1.5v-4.528a2.5 2.5 0 0 0-.264-1.118l-2.46-4.92A3.5 3.5 0 0 0 15.146 4ZM2 7h3v4H2v1h4V6H2v1Zm5-1h6v6H7V6Zm1 1v4h4V7H8ZM6 17a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm8-11h1.809l.138.276 3 6 .053.106V14h-5V6Zm1 1v6h3v-.382L15.191 7H15Z"
      fill="#000"
    />
  </svg>
);
