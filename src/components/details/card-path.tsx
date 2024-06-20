import { Card } from "@/components/ui/card";
import * as React from "react";
import { DarkTrainProfile, LightTrainProfile } from "@/assets/icons/train-profile";
import { DarkIc6, LightIc6 } from "@/assets/icons/ic-6";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Map } from "lucide-react";
import { useRouter } from "next/navigation";
import { CommunityRatingDetails } from "@/components/details/community-rating-details";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";

export function CardPath() {
  const { resolvedTheme } = useTheme();
  const router = useRouter();

  return (
    <Card>
      <div className="flex items-center justify-between p-6 px-8 pb-6">
        <div className="flex items-center space-x-1.5">
          <div className="text-base font-normal pr-1">Zug</div>
          <div className="text-base font-normal">
            {resolvedTheme === "dark" ? (
              <DarkTrainProfile className="h-6 w-6" />
            ) : (
              <LightTrainProfile className="h-6 w-6" />
            )}
          </div>
          <div className="text-base font-normal">
            {resolvedTheme === "dark" ? (
              <DarkIc6 className="h-6 w-6" />
            ) : (
              <LightIc6 className="h-6 w-6" />
            )}
          </div>
          <div className="text-base font-normal">Richtung Brig</div>
        </div>
        <div className="flex-grow text-base font-semibold text-center">
          7 Minuten zum umsteigen
        </div>
        <Button className="ml-4" variant="outline">
          Weg zum Umsteigen
          <Map className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="flex px-6 gap-6">
        <div
          className="flex flex-col w-1/2 p-4 bg-zinc-50 rounded-lg text-zinc-950 shadow-sm dark:bg-zinc-900 dark:text-zinc-50">
          <div className="flex items-center p-2 mb-3">
            <div className="text-lg font-semibold">Basel SBB</div>
          </div>
          <div className="flex flex-row p-2">
            <div className="font-medium">Rollstuhlgerechte Waggons:</div>
            <div className="pr-1 pl-3 font-semibold">Gleis 9</div>
            <div className="pl-1 font-semibold">Sektor A / C</div>
          </div>
          <div className="flex flex-row align-middle items-center pb-2 pt-1">
            <div className="text-sm font-normal px-4">Zugang zum Bahnsteig ohne Hilfe</div>
          </div>
          <Accordion type="single" collapsible className="px-2">
            <AccordionItem value="item-1">
              <AccordionTrigger className="py-6">Zugkomposition</AccordionTrigger>
              <AccordionContent>
                <Image src="/train-composition.png" alt="Zugkomposition" width={320} height={100} className="px-2" />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="px-2">
            <AccordionItem value="item-2">
              <AccordionTrigger className="py-6">Ein- und Aussteigen für Rollstuhlfahrer</AccordionTrigger>
              <AccordionContent className="px-2">
                <div className=" py-3">
                  Informationen zur Rampe
                </div>
                <div className=" py-3">
                  Informationen zum Lift
                </div>
                <div className=" py-3">
                  Informationen über Treppen
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex justify-center mt-6">
            <Button
              variant="outline"
              onClick={() => router.push("/select/details/stop")}
              className="flex w-full items-center p-2"
            >
              <div>Info zur Haltestelle &nbsp;</div>
              <div>Basel SBB</div>
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
        <div
          className="flex flex-col w-1/2 p-4 bg-zinc-50 rounded-lg text-zinc-950 shadow-sm dark:bg-zinc-900 dark:text-zinc-50">
          <div className="flex items-center p-2 mb-3">
            <div className="text-lg font-semibold">Olten</div>
          </div>
          <div className="flex flex-row p-2">
            <div className="font-medium">Rollstuhlgerechte Waggons:</div>
            <div className="pr-1 pl-3 font-semibold">Gleis 12</div>
            <div className="pl-1 font-semibold"></div>
          </div>
          <div className="flex flex-row align-middle items-center pb-2 pt-1">
            <div className="text-sm font-normal px-4">Zugang zum Bahnsteig ohne Hilfe</div>
          </div>
          <Accordion type="single" collapsible className="px-2">
            <AccordionItem value="item-1">
              <AccordionTrigger className="py-6">Zugkomposition</AccordionTrigger>
              <AccordionContent>
                <Image src="/train-composition.png" alt="Zugkomposition" width={320} height={100} className="px-2" />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="px-2">
            <AccordionItem value="item-1">
              <AccordionTrigger className="py-6">Ein- und Aussteigen für Rollstuhlfahrer</AccordionTrigger>
              <AccordionContent className="px-2">
                <div className=" py-3">
                  Informationen zur Rampe
                </div>
                <div className=" py-3">
                  Informationen zum Lift
                </div>
                <div className=" py-3">
                  Informationen über Treppen
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex justify-center mt-6">
            <Button
              variant="outline"
              onClick={() => router.push("/select/details/stop")}
              className="flex w-full items-center p-2"
            >
              <div>Info zur Haltestelle &nbsp;</div>
              <div>Olten</div>
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center px-3 py-6 font-normal">
        <div className="pr-3">Bewertung der Community:</div>
        <CommunityRatingDetails value={3} />
      </div>
    </Card>
  );
}
