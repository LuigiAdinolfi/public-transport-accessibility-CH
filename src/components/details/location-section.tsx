import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useJourneyStore } from "@/store/useJourneyStore";
import { useMediaQuery } from "react-responsive";
import { truncateTo40Chars } from "@/utils/truncateTo40Chars";
import { truncateTo20Chars } from "@/utils/truncateTo20Chars";
import { Platform } from "@/types/Platform";
import getTactileSystem from "@/utils/getTactileSystem";
import getBoardingDevice from "@/utils/getBoardingDevice";
import getDynamicVisual from "@/utils/getDynamicVisual";
import getDynamicAudio from "@/utils/getDynamicAudio";
import { getPlatformAccess } from "@/utils/getPlatformAccess";
import { useParkingLotStore } from "@/store/useParkingLotStore";
import { accessProps } from "@/helpers/accessIconProps";
import { useTheme } from "next-themes";
import { getAccessibilityIconByText } from "@/utils/handleAccessibilityIcon";
import * as OJP from "ojp-sdk";
import { getVehicleType } from "@/utils/getVehicleType";
import { renderAccessTextLocation } from "@/components/details/render-access-text-location";

interface LocationSectionProps {
  locationName: string;
  platform: Platform | null;
  platformNr: string;
  accessIconLocationProps: accessProps | null;
  selectedLeg: OJP.TripLeg;
  time: string;
}

/**
 * LocationSection component displays details about a specific location and platform,
 * including accessibility information and additional details in accordions.
 *
 * @param {Object} props - Props for LocationSection component.
 * @param {string} props.locationName - Name of the location.
 * @param {Platform} props.platform - Platform information.
 * @param {string} props.platformNr - Platform number.
 * @param {accessProps | null} props.accessIconLocationProps - Accessibility icon properties.
 * @param {OJP.TripLeg} props.selectedLeg - Selected leg of the trip.
 * @param {string} props.time - Time of arrival or departure.
 * @returns {React.ReactElement} LocationSection component.
 */
export default function LocationSection({
  locationName,
  platform,
  platformNr,
  accessIconLocationProps,
  selectedLeg,
  time,
}: LocationSectionProps): React.ReactElement {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const { setSelectedStop } = useJourneyStore();
  const vehicleType = getVehicleType(selectedLeg);

  const locationTitle = truncateTo40Chars(locationName);
  const location = truncateTo20Chars(locationName);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const accessTextLocation = accessIconLocationProps?.text;
  const AccessIconLocation = getAccessibilityIconByText(
    accessTextLocation,
    resolvedTheme,
  );
  const [platformInfo, setPlatformInfo] = useState({
    haltekanteAccess: "",
    accessInfo: "",
    additionalInformation: "",
    tactileSystem: "",
    boardingDevice: "",
    dynamicVisual: "",
    dynamicAudio: "",
    parentSloid: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const vehicleTypesWithPlatformInfo = ["Zug", "EC", "RE", "S", "ICE", "IC"];

  // Update platform information when platform data changes
  useEffect(() => {
    if (platform) {
      setPlatformInfo({
        haltekanteAccess: getPlatformAccess(platform),
        accessInfo: platform?.adviceAccessInfo || "",
        additionalInformation: platform?.additionalInformation || "",
        tactileSystem: getTactileSystem(platform) || "",
        boardingDevice: getBoardingDevice(platform) || "",
        dynamicVisual: getDynamicVisual(platform) || "",
        dynamicAudio: getDynamicAudio(platform) || "",
        parentSloid: platform?.parentServicePointSloid || "",
      });
    }
  }, [platform]);

  const { setParentServicePointSloid } = useParkingLotStore();

  /**
   * Handles click event to navigate to stop details.
   *
   * @param {string | null} stop - The stop name.
   */
  const handleClick = (stop: string | null) => {
    if (!stop) return;
    setIsLoading(true);
    setSelectedStop(stop);
    setParentServicePointSloid(platformInfo.parentSloid);
    localStorage.setItem("selectedStop", stop);
    localStorage.setItem("parentSloid", platformInfo.parentSloid);
    router.push("/select/details/stop");
    setIsLoading(false);
  };

  return (
    <div className="flex w-full flex-col rounded-lg bg-zinc-50 p-4 text-zinc-950 shadow-sm dark:bg-zinc-900 dark:text-zinc-50 md:w-1/2">
      <div
        className={`flex items-center ${!isMobile ? "mb-3 p-2" : "mb-2 px-2 py-1"}`}
      >
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-semibold">{locationTitle}</h1>
          <div className="flex justify-end whitespace-pre font-medium">
            {time}
          </div>
        </div>
      </div>
      <h2 className="flex flex-row items-center p-2 pb-4 pr-0 pt-3 align-middle">
        <div className={`font-medium ${!isMobile ? "text-lg" : "text-sm"}`}>
          Rollstuhlzugang:
        </div>
        <div
          className={`pl-3 font-semibold ${!isMobile ? "text-lg" : "text-sm"}`}
        >
          {vehicleTypesWithPlatformInfo.includes(vehicleType)
            ? `${isMobile ? "Gl." : "Gleis"} ${platformNr}`
            : `Kante ${platformNr}`}
        </div>
        <div
          className={`pl-3 font-semibold ${!isMobile ? "text-lg" : "text-sm"}`}
        >
          {vehicleTypesWithPlatformInfo.includes(vehicleType)
            ? `${isMobile ? "Sekt. B" : "Sektor B"}`
            : ""}
        </div>
        <div
          className={`pl-3 font-semibold ${!isMobile ? "text-lg" : "text-sm"}`}
        >
          {vehicleTypesWithPlatformInfo.includes(vehicleType)
            ? `${isMobile ? "Wag. 5" : "Waggon 5"}`
            : ""}
        </div>
      </h2>
      <div className="flex flex-row items-center pb-2 pt-4 align-middle">
        <div className="pl-4 text-sm font-normal">
          <div className="flex basis-1/2 items-center justify-start">
            {/* Wheelchair Accessibility Icon */}
            {AccessIconLocation && (
              <AccessIconLocation className="h-6 w-6 flex-shrink-0" />
            )}
            <div
              className={`flex flex-col pl-2 text-sm md:text-base ${isMobile ? "text-right" : ""}`}
            >
              <span>{renderAccessTextLocation(accessTextLocation)}</span>
            </div>
          </div>
        </div>
      </div>
      {vehicleTypesWithPlatformInfo.includes(vehicleType) && (
        <>
          <div className="flex flex-row items-center pb-3 pt-1 align-middle">
            <div className="py-2 pl-4 text-sm font-normal leading-relaxed md:text-base">
              {/* Platform accessibility information */}
              Zugang zum Perron: &nbsp;
              {platformInfo.haltekanteAccess}
            </div>
          </div>
          {/* Accordion for train composition */}
          <Accordion type="single" collapsible className="px-2">
            <AccordionItem value="item-1">
              <AccordionTrigger
                className={`${!isMobile ? "py-6" : "py-4 text-sm"}`}
              >
                Zugkomposition
              </AccordionTrigger>
              <AccordionContent>
                <Image
                  src="/train-composition.png"
                  alt="Zugkomposition"
                  width={320}
                  height={200}
                  className="flex h-full w-full px-2"
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      )}
      <Accordion type="single" collapsible className="px-2">
        <AccordionItem value="item-2">
          <AccordionTrigger
            className={`${!isMobile ? "py-6" : "py-4 text-sm"}`}
          >
            {/* Accessibility information */}
            Zugänglichkeitsinformationen
          </AccordionTrigger>
          <AccordionContent className="px-2">
            {platformInfo.boardingDevice && (
              <div className="py-2 leading-relaxed">
                <span className="font-semibold">
                  Hilfsmittel für Rollstuhl:&nbsp;
                </span>
                <span>{platformInfo.boardingDevice}</span>
              </div>
            )}
            {platformInfo.tactileSystem && (
              <div className="py-2 leading-relaxed">
                {platformInfo.tactileSystem}
              </div>
            )}
            {platformInfo.additionalInformation && (
              <div className="py-2 leading-relaxed">
                {platformInfo.additionalInformation}
              </div>
            )}
            {platformInfo.accessInfo && (
              <div className="py-2 leading-relaxed">
                <div className="font-semibold">
                  Hinweise zum Zugang zum Verkehrsmittel:
                </div>
                <div>{platformInfo.accessInfo}</div>
              </div>
            )}
            {platformInfo.dynamicVisual && (
              <div className="py-2 leading-relaxed">
                <div>{platformInfo.dynamicVisual}</div>
              </div>
            )}
            {platformInfo.dynamicAudio && (
              <div className="py-2 leading-relaxed">
                <div>{platformInfo.dynamicAudio}</div>
              </div>
            )}
            {/* No accessibility information available */}
            {!platformInfo.boardingDevice &&
              !platformInfo.tactileSystem &&
              !platformInfo.additionalInformation &&
              !platformInfo.accessInfo &&
              !platformInfo.dynamicVisual &&
              !platformInfo.dynamicAudio && (
                <div className="py-2 leading-relaxed">
                  Keine Informationen vorhanden.
                </div>
              )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* Button for "Information zur Haltestelle" */}
      <div className="mb-2 mt-8 flex justify-center">
        <Button
          variant={isLoading ? "outline" : "default"}
          onClick={() => handleClick(locationName)}
          className="flex w-full items-center p-2 md:text-base lg:h-11"
          disabled={isLoading}
        >
          {isLoading ? (
            "Loading..."
          ) : (
            <>
              <div>Info zur Haltestelle &nbsp;</div>
              <div>{location}</div>
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
