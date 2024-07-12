import React from "react";
import { useMediaQuery } from "react-responsive";

/**
 * Component displaying information about ticket machine assistance.
 * @returns {React.ReactElement} - InfoSection component.
 */
export default function InfoSection(): React.ReactElement {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div
      className={`flex ${isMobile ? "flex-col justify-start gap-1 px-8 pb-6 pt-4" : "flex-row items-center px-14 pb-10 pt-8 align-middle"}`}
    >
      {/* Label for ticket machine assistance */}
      <div className={`font-medium ${isMobile ? "text-sm" : ""}`}>
        Info Ticketautomat:
      </div>
      {/* Text description */}
      <div className={`font-normal ${isMobile ? "text-sm" : "pl-3 pr-1"}`}>
        Hilfestellung für Sehbehinderte unter Telefon
      </div>
      {/* Phone number */}
      <div className={`font-medium ${isMobile ? "text-sm" : "pl-1"}`}>
        0800 11 44 77
      </div>
    </div>
  );
}
