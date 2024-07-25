import React from "react";
import { useMediaQuery } from "react-responsive";
import { useStopPointStore } from "@/store/useStopPointStore";

/**
 * Component displaying information about the ticket machine assistance.
 * This section provides details on the availability of ticket machine assistance
 * for a given stop point.
 *
 * @returns {React.ReactElement} - The InfoSection component.
 */
export default function InfoSection(): React.ReactElement {
  // Determine if the screen width is considered mobile (less than 768px)
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Access stop point data from the store
  const { stopPoint } = useStopPointStore();

  // Destructure ticket machine information from stop point data
  const infoticketmachine = stopPoint.infoTicketMachine;

  return (
    <div
      className={`flex ${isMobile ? "flex-col justify-start gap-1 px-8 pb-6 pt-4" : "flex-row items-center px-14 pb-10 pt-8 align-middle"}`}
    >
      {/* Label for ticket machine assistance */}
      <div className={`font-medium ${isMobile ? "text-sm" : ""}`}>
        Info Ticketautomat:
      </div>
      {/* Text description for ticket machine assistance */}
      <div
        className={`font-normal ${isMobile ? "text-sm" : "pl-3 pr-1"} leading-relaxed`}
      >
        {infoticketmachine || "N/A"}
      </div>
    </div>
  );
}
