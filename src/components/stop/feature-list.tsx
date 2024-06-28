import React from "react";
import { SquareCheckBig } from "lucide-react";
import { useMediaQuery } from "react-responsive";

// List of features to display
const features = [
  "Unterstützung verfügbar",
  "Rollstuhl-Ticket-Service",
  "Rollstuhl-Toilette",
  "Dynamisches Audiosystem",
  "Dynamisches optisches System",
];

/**
 * Component displaying a list of features with checkboxes.
 * @returns {React.ReactElement} - FeatureList component.
 */
export default function FeatureList(): React.ReactElement {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div
      className={`${!isMobile ? "grid grid-cols-3 px-12" : "flex flex-col px-8"} gap-x-1 gap-y-6 py-4`}
    >
      {features.map((feature, index) => (
        <div key={index} className="flex flex-row items-center px-2">
          <SquareCheckBig size={isMobile ? 16 : 20} />
          <div
            className={`pl-2 align-middle font-normal ${isMobile ? "text-sm" : "text-base"}`}
          >
            {feature}
          </div>
        </div>
      ))}
    </div>
  );
}
