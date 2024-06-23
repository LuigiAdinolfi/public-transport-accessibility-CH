"use client";

import { Card } from "@/components/ui/card";
import { DarkTrainProfile, LightTrainProfile } from "@/assets/icons/train-profile";
import { useTheme } from "next-themes";
import { SquareCheckBig } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import * as React from "react";
import { useMediaQuery } from "react-responsive";

/**
 * Component representing a card displaying details about a stop point.
 * @returns {JSX.Element} - CardStopPoint component.
 */
export function CardStopPoint() {
  const { resolvedTheme } = useTheme();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <Card className="mt-3">
      {/* Header Section */}
      <div className={`flex flex-row items-center space-y-1.5 ${!isMobile ? "px-14 pt-8 pb-6" : "px-8 pt-4 pb-2"}`}>
        <h1 className="text-xl font-bold items-center text-zinc-900 dark:text-zinc-100">
          Haltestelle
        </h1>
        <div className={`flex items-center pb-1.5 ${!isMobile ? "pl-16" : "pl-8"}`}>
          <div className="text-base font-normal pr-2">Zug</div>
          <div className="text-base font-normal">
            {resolvedTheme === "dark" ? (
              <DarkTrainProfile className="h-6 w-6" />
            ) : (
              <LightTrainProfile className="h-6 w-6" />
            )}
          </div>
        </div>
      </div>

      {/* Feature List Section */}
      <div className={`${!isMobile ? "grid grid-cols-3 px-12" : "flex flex-col px-8"} gap-x-1 gap-y-6 py-4`}>
        {/* Feature Items */}
        {[
          "Unterstützung verfügbar",
          "Rollstuhl-Ticket-Service",
          "Rollstuhl-Toilette",
          "Dynamisches Audiosystem",
          "Dynamisches optisches System"
        ].map((feature, index) => (
          <div key={index} className="flex flex-row items-center px-2">
            {
              !isMobile ?
                <SquareCheckBig size={20} />
                :
                <SquareCheckBig size={16} />
            }
            <div className={`align-middle font-normal pl-2 ${!isMobile ? "text-base" : "text-sm"}`}>{feature}</div>
          </div>
        ))}
      </div>

      {/* Accordion Sections */}
      <div className={`${!isMobile ? "px-14" : "px-8"} items-center align-middle py-3`}>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className={`py-6 ${!isMobile ? "" : "text-sm"}`}>Bedingung für die
              Unterstützung</AccordionTrigger>
            <AccordionContent className="px-2">
              <div className={`py-3 ${!isMobile ? "" : "text-sm"}`}>Bedingung für die Unterstützung</div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-2">
            <AccordionTrigger
              className={`py-6 ${!isMobile ? "" : "text-sm"}`}>Parkplatz-Informationen</AccordionTrigger>
            <AccordionContent className="px-2">
              <div className={`py-3 ${!isMobile ? "" : "text-sm"}`}>Parkplatz-Informationen</div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Info Section */}
      <div
        className={`flex ${!isMobile ? "flex-row px-14 items-center align-middle pt-8 pb-10" : "justify-start flex-col px-8 pt-4 pb-6 gap-1"}`}>
        <div className={`font-medium ${!isMobile ? "" : "text-sm"}`}>Info Ticketautomat:</div>
        <div className={`font-normal ${!isMobile ? "pr-1 pl-3" : "text-sm"}`}>Hilfestellung für Sehbehinderte unter
          Telefon
        </div>
        <div className={`font-medium ${!isMobile ? "pl-1" : "text-sm"}`}>0800 11 44 77</div>
      </div>
    </Card>
  );
}
