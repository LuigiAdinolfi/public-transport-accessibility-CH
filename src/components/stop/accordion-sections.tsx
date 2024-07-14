import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMediaQuery } from "react-responsive";
import { SquareCheckBig } from "lucide-react";
import { useParkingLotStore } from "@/store/useParkingLotStore";
import { useStopPointStore } from "@/store/useStopPointStore";

/**
 * Component displaying accordion sections based on media query for responsiveness.
 * @returns {React.ReactElement} - AccordionSections component.
 */
export default function AccordionSections(): React.ReactElement {
  // Determine if the screen width is considered mobile
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { stopPoint } = useStopPointStore();
  const assistancecondition = stopPoint?.assistanceCondition;
  const { parkingLot } = useParkingLotStore();

  const parkingLotsAvailable = parkingLot?.placesAvailable === "YES";
  const wheelchairPlaces = parkingLot?.prmPlacesAvailable === "YES";
  const parkingLotsAdditionalInfo = parkingLot?.additionalInformation;

  return (
    <div
      className={`${!isMobile ? "px-14" : "px-8"} items-center py-3 align-middle`}
    >
      {/* First Accordion Section */}
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className={`py-6 ${isMobile ? "text-sm" : ""}`}>
            Bedingung für die Unterstützung
          </AccordionTrigger>
          <AccordionContent className="px-2">
            <div
              className={`py-3 ${isMobile ? "text-sm" : ""} leading-relaxed`}
            >
              {assistancecondition || "N/A"}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Second Accordion Section */}
      <Accordion type="single" collapsible>
        <AccordionItem value="item-2">
          <AccordionTrigger className={`py-6 ${isMobile ? "text-sm" : ""}`}>
            Parkplatz-Informationen
          </AccordionTrigger>
          <AccordionContent className="px-2 py-2">
            {Object.keys(parkingLot).length > 0 ? (
              <>
                {parkingLotsAvailable && (
                  <div className="flex flex-row items-center py-2 align-middle">
                    <SquareCheckBig size={isMobile ? 12 : 16} />
                    <div
                      className={`pl-2 align-middle text-sm font-normal ${isMobile ? "text-sm" : "text-sm"}`}
                    >
                      Parkplätze vorhanden
                    </div>
                  </div>
                )}
                {wheelchairPlaces && (
                  <div className="flex flex-row items-center py-2 align-middle">
                    <SquareCheckBig size={isMobile ? 12 : 16} />
                    <div
                      className={`pl-2 align-middle text-sm font-normal ${isMobile ? "text-sm" : "text-sm"}`}
                    >
                      Parkplätze für Gehbehinderte vorhanden
                    </div>
                  </div>
                )}
                {parkingLotsAdditionalInfo && (
                  <div
                    className={`py-3 ${isMobile ? "text-sm" : ""} leading-relaxed`}
                  >
                    Zusätzliche Informationen: {parkingLotsAdditionalInfo}
                  </div>
                )}
              </>
            ) : (
              <div className="leading-relaxed">
                Keine Parkplatzinformationen verfügbar.
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
