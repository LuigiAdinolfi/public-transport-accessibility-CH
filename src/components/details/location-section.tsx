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

interface LocationSectionProps {
  locationName: string;
  platform: Platform | null;
  platformNr: string;
  accessIconLocationProps: {
    icon: any;
    text: string;
    score: number;
  } | null;
}

/**
 * LocationSection component displays details about a specific location and platform,
 * including accessibility information and additional details in accordions.
 *
 * @param {Object} props - Props for LocationSection component.
 * @param {string} props.locationName - Name of the location.
 * @param {Platform} props.platform - Platform information.
 * @param {string} props.platformNr - Platform information.
 * @returns {React.ReactElement} LocationSection component.
 */
export default function LocationSection({
  locationName,
  platform,
  platformNr,
  accessIconLocationProps,
}: LocationSectionProps): React.ReactElement {
  const router = useRouter();
  const { setSelectedStop } = useJourneyStore();

  const locationTitle = truncateTo40Chars(locationName);
  const location = truncateTo20Chars(locationName);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const AccessIconLocation = accessIconLocationProps?.icon;
  const accessTextLocation = accessIconLocationProps?.text;
  const [platformInfo, setPlatformInfo] = useState({
    haltekanteAccess: "",
    accessInfo: "",
    additionalInformation: "",
    tactileSystem: "",
    boardingDevice: "",
    dynamicVisual: "",
    dynamicAudio: "",
  });

  const [isLoading, setIsLoading] = useState(false);

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
      });
    }
  }, [platform]);

  /**
   * Handles click on "Info zur Haltestelle" button.
   * Sets selected stop and navigates to stop details page.
   *
   * @param {string} stop - The name of the stop.
   */
  const handleClick = (stop: string | null) => {
    if (!stop) return;
    setIsLoading(true); // Start loading state
    setSelectedStop(stop);
    router.push("/select/details/stop");
    setIsLoading(false); // End loading state after navigation
  };

  return (
    <div className="flex w-full flex-col rounded-lg bg-zinc-50 p-4 text-zinc-950 shadow-sm dark:bg-zinc-900 dark:text-zinc-50 md:w-1/2">
      <div
        className={`flex items-center ${!isMobile ? "mb-3 p-2" : "mb-2 px-2 py-1"}`}
      >
        <div className="text-lg font-semibold">{locationTitle}</div>
      </div>
      <div className="flex flex-row p-2 pb-4">
        <div className={`font-medium ${!isMobile ? "" : "text-sm"}`}>
          Rollstuhlgerechte Waggons:
        </div>
        <div
          className={`pl-3 pr-1 font-semibold ${!isMobile ? "" : "text-sm"}`}
        >
          {`Gleis ${platformNr}`}
        </div>
        <div className={`pl-1 font-semibold ${!isMobile ? "" : "text-sm"}`}>
          Sektor B
        </div>
      </div>
      <div className="flex flex-row items-center pb-2 pt-1 align-middle">
        <div className="px-4 text-sm font-normal">
          <div className="flex basis-1/2 items-center justify-start">
            {/* Wheelchair Accessibility Icon */}
            {AccessIconLocation && <AccessIconLocation className="h-6 w-6" />}
            {!isMobile && (
              <div className="flex flex-col pl-2">
                <span>{accessTextLocation}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center pb-2 pt-1 align-middle">
        <div className="hei px-4 py-2 text-sm font-normal leading-relaxed">
          {/*Zugang zum Bahnsteig ohne Hilfe*/}
          Haltekante Zugang: &nbsp;
          {platformInfo.haltekanteAccess}
        </div>
      </div>
      {/* Accordion for Zugkomposition */}
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
      {/* Accordion for Ein- und Aussteigen für Rollstuhlfahrer */}
      <Accordion type="single" collapsible className="px-2">
        <AccordionItem value="item-2">
          <AccordionTrigger
            className={`${!isMobile ? "py-6" : "py-4 text-sm"}`}
          >
            {/*Ein- und Aussteigen für Rollstuhlfahrer*/}
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
      <div className="mt-6 flex justify-center">
        <Button
          variant={isLoading ? "ghost" : "outline"}
          onClick={() => handleClick(locationName)}
          className="flex w-full items-center p-2 md:text-base"
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
