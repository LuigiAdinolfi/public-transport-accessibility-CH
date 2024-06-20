"use client";

import { Card } from "@/components/ui/card";
import { DarkTrainProfile, LightTrainProfile } from "@/assets/icons/train-profile";
import { useTheme } from "next-themes";
import { SquareCheckBig } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import * as React from "react";

export function CardStopPoint() {
  const { resolvedTheme } = useTheme();
  return (
    <Card className="mt-3">
      <div className="flex flex-row items-center space-y-1.5 px-14 pt-8 pb-6">
        <h1 className="text-xl font-bold items-center text-zinc-900 dark:text-zinc-100">
          Haltestelle
        </h1>
        <div className="flex items-center pb-1.5 pl-16">
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
      <div className="grid grid-cols-3 gap-x-1 gap-y-6 px-12 py-4">
        <div className="flex flex-row items-center px-2">
          <SquareCheckBig size={20} />
          <div className="text-base align-middle font-normal pl-2">
            Unterstützung verfügbar
          </div>
        </div>
        <div className="flex flex-row items-center px-2">
          <SquareCheckBig size={20} />
          <div className="text-base align-middle font-normal pl-2">
            Rollstuhl-Ticket-Service
          </div>
        </div>
        <div className="flex flex-row items-center px-2">
          <SquareCheckBig size={20} />
          <div className="text-base align-middle font-normal pl-2">
            Rollstuhl-Toilette
          </div>
        </div>
        <div className="flex flex-row items-center px-2">
          <SquareCheckBig size={20} />
          <div className="text-base align-middle font-normal pl-2">
            Dynamisches Audiosystem
          </div>
        </div>
        <div className="flex flex-row items-center px-2">
          <SquareCheckBig size={20} />
          <div className="text-base align-middle font-normal pl-2">
            Dynamisches optisches System
          </div>
        </div>
      </div>
      <div className="px-14 items-center align-middle py-3">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="py-6">Bedingung für die Unterstützung</AccordionTrigger>
            <AccordionContent className="px-2">
              <div className=" py-3">
                Bedingung für die Unterstützung
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-2">
            <AccordionTrigger className="py-6">Parkplatz-Informationen</AccordionTrigger>
            <AccordionContent className="px-2">
              <div className=" py-3">
                Parkplatz-Informationen
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex flex-row px-14 items-center align-middle pt-8 pb-10">
        <div className="font-medium">Info Ticketautomat:</div>
        <div className="pr-1 pl-3 font-normal">Hilfestellung für Sehbehinderte unter Telefon</div>
        <div className="pl-1 font-medium">0800 11 44 77</div>
      </div>
    </Card>
  );
}
