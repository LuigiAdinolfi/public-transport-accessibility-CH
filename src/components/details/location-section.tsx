import React from "react";
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
import { truncateTo20Chars, truncateTo40Chars } from "@/utils/handleLocation";
import { useMediaQuery } from "react-responsive";
import { WheelchairReservationIcon } from "@/components/select/wheelchair-reservation-icon";

interface LocationSectionProps {
  locationName: string;
  platform: string;
}

/**
 * LocationSection component displays details about a specific location and platform,
 * including accessibility information and additional details in accordions.
 *
 * @param {Object} props - Props for LocationSection component.
 * @param {string} props.locationName - Name of the location.
 * @param {string} props.platform - Platform information.
 * @returns {React.ReactElement} LocationSection component.
 */
export default function LocationSection({
  locationName,
  platform,
}: LocationSectionProps): React.ReactElement {
  const router = useRouter();
  const { setSelectedStop } = useJourneyStore();
  const locationTitle = truncateTo40Chars(locationName);
  const location = truncateTo20Chars(locationName);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  /**
   * Handles click on "Info zur Haltestelle" button.
   * Sets selected stop and navigates to stop details page.
   *
   * @param {string} stop - The name of the stop.
   */
  const handleClick = (stop: string | null) => {
    if (!stop) return;
    setSelectedStop(stop);
    router.push("/select/details/stop");
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
          {`Gleis ${platform}`}
        </div>
        <div className={`pl-1 font-semibold ${!isMobile ? "" : "text-sm"}`}>
          Sektor B
        </div>
      </div>
      <div className="flex flex-row items-center pb-2 pt-1 align-middle">
        <div className="px-4 text-sm font-normal">
          <div className="flex basis-1/2 items-center justify-start">
            {/* Wheelchair Accessibility Icon */}
            <WheelchairReservationIcon />
            {!isMobile && (
              <div className="flex flex-col pl-2">
                <span>Mit Personalhilfe ein-/aussteigen</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center pb-2 pt-1 align-middle">
        <div className="px-4 text-sm font-normal">
          Zugang zum Bahnsteig ohne Hilfe
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
              height={100}
              className="px-2"
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
            Ein- und Aussteigen für Rollstuhlfahrer
          </AccordionTrigger>
          <AccordionContent className="px-2">
            <div className="py-3">Informationen zur Rampe</div>
            <div className="py-3">Informationen zum Lift</div>
            <div className="py-3">Informationen über Treppen</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* Button for "Information zur Haltestelle" */}
      <div className="mt-6 flex justify-center">
        <Button
          variant="outline"
          onClick={() => handleClick(locationName)}
          className="flex w-full items-center p-2 md:text-base"
        >
          <div>Info zur Haltestelle &nbsp;</div>
          <div>{location}</div>
          <ArrowUpRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
