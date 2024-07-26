import React, { useEffect, useState } from "react";
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
 * Component that displays accordion sections for displaying information
 * based on screen size and store data. The content of the accordions adjusts
 * for mobile and desktop views.
 *
 * @returns {React.ReactElement} - The AccordionSections component.
 */
export default function AccordionSections(): React.ReactElement {
  // Determine if the screen width is considered mobile (less than 768px)
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { stopPoint } = useStopPointStore();
  const assistanceCondition = stopPoint.assistanceCondition;
  const { parkingLot } = useParkingLotStore();

  const [parkingLotAvailable, setParkingLotAvailable] = useState(false);
  const [wheelchairPlaces, setWheelchairPlaces] = useState(false);
  const [parkingLotAdditionalInfo, setParkingLotAdditionalInfo] = useState("");

  // Determine parking lot availability and specific features
  useEffect(() => {
    if (parkingLot && parkingLot.length > 0) {
      const parkingLotsAvailable = parkingLot[0]?.placesAvailable === "YES";
      const wheelchairPlaces = parkingLot[0]?.prmPlacesAvailable === "YES";
      const parkingLotsAdditionalInfo =
        parkingLot[0]?.additionalInformation || "";

      setParkingLotAvailable(parkingLotsAvailable);
      setWheelchairPlaces(wheelchairPlaces);
      setParkingLotAdditionalInfo(parkingLotsAdditionalInfo);
    }
  }, [parkingLot]);

  const noParkingInfoAvailable =
    !parkingLotAvailable && !wheelchairPlaces && !parkingLotAdditionalInfo;

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
              {assistanceCondition || "N/A"}
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
            {noParkingInfoAvailable ? (
              <div className="leading-relaxed">
                Keine Parkplatzinformationen verfügbar.
              </div>
            ) : (
              <>
                {/* Check for available parking lots */}
                {parkingLotAvailable && (
                  <div className="flex flex-row items-center py-2 align-middle">
                    <SquareCheckBig size={isMobile ? 12 : 16} />
                    <div
                      className={`pl-2 align-middle text-sm font-normal ${isMobile ? "text-sm" : "text-sm"}`}
                    >
                      Parkplätze vorhanden
                    </div>
                  </div>
                )}
                {/* Check for wheelchair accessible parking */}
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
                {/* Display additional parking lot information */}
                {parkingLotAdditionalInfo && (
                  <div
                    className={`py-3 ${isMobile ? "text-sm" : ""} leading-relaxed`}
                  >
                    Zusätzliche Informationen: {parkingLotAdditionalInfo}
                  </div>
                )}
              </>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
