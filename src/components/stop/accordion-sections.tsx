import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMediaQuery } from "react-responsive";
import { useBehigRecordStore } from "@/store/useBehigRecordStore";

/**
 * Component displaying accordion sections based on media query for responsiveness.
 * @returns {React.ReactElement} - AccordionSections component.
 */
export default function AccordionSections(): React.ReactElement {
  // Determine if the screen width is considered mobile
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { behigRecord } = useBehigRecordStore();
  const assistancecondition = behigRecord.assistancecondition;

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
          <AccordionContent className="px-2">
            <div
              className={`py-3 ${isMobile ? "text-sm" : ""} leading-relaxed`}
            >
              Parkplatz-Informationen
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
