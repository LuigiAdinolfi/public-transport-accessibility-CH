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
import { truncateTo20Chars } from "@/utils/tripUtils";

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
  const location = truncateTo20Chars(locationName);

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
      <div className="mb-3 flex items-center p-2">
        <div className="text-lg font-semibold">{location}</div>
      </div>
      <div className="flex flex-row p-2">
        <div className="text-base font-medium">Rollstuhlgerechte Waggons:</div>
        <div className="pl-3 pr-1 text-base font-semibold">
          {platform}&nbsp;&nbsp;Sektor XY
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
          <AccordionTrigger className="py-6">Zugkomposition</AccordionTrigger>
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
          <AccordionTrigger className="py-6">
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
