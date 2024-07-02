import React from "react";
import { FirstConnection } from "@/components/select/first-connection";
import { LastConnection } from "@/components/select/last-connection";
import { ChevronDown, ChevronRight } from "lucide-react";
import * as OJP from "ojp-sdk";
import { useMediaQuery } from "react-responsive";

/**
 * Component to display details of connections between trip legs.
 * @param {Object} props - Component props.
 * @param {OJP.TripLeg[]} props.allLegs - Array of trip legs containing connection details.
 * @returns {React.ReactElement} - The rendered connection details component.
 */
export const ConnectionDetails = ({
  allLegs,
}: {
  allLegs: OJP.TripLeg[];
}): React.ReactElement => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="mb-2 flex flex-col sm:flex-row">
      <div className={`w-full ${isMobile ? "mb-1" : ""}`}>
        <FirstConnection allLegs={allLegs} />
      </div>
      <div className="flex items-center justify-center px-2">
        {isMobile ? <ChevronDown /> : <ChevronRight />}
      </div>
      <div className={`w-full ${isMobile ? "mt-1" : ""}`}>
        <LastConnection allLegs={allLegs} />
      </div>
    </div>
  );
};
