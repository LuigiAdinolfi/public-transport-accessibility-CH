import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";
import ThemeArrowChange from "@/components/arrow-change-toggle";

export function CardPlanJourney() {
  return (
    <Tabs defaultValue="new-journey" className="lg:w-[960px] w-full">
      <TabsList className="grid lg:w-1/2 grid-cols-2 lg:h-12">
        <TabsTrigger className="lg:h-10 lg:text-base mx-1" value="new-journey">
          {/*TODO: Add a new journey icon*/}
          <div className="lg:pl-2">Neue Reise</div>
        </TabsTrigger>
        <TabsTrigger
          className="lg:h-8 lg:text-base mx-1"
          value="recent-journeys"
        >
          {/*TODO: Add a recent journeys icon*/}
          <div className="lg:pl-2">Letzte Reisen</div>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="new-journey">
        <Card>
          <CardHeader className="pb-8">
            {/*<CardTitle>Account</CardTitle>*/}
            <CardDescription>Gib deine Reisedaten ein.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-12 pb-12">
            <div className="space-y-1">
              <div className="flex justify-between">
                <div className="space-y-1  w-5/12">
                  <Label htmlFor="origin">Von</Label>
                  <Input id="origin" defaultValue="Basel" />
                  <CardDescription className="pt-2">
                    Gib den Abfahrtsort ein.
                  </CardDescription>
                </div>
                <div className="flex items-center justify-center w-2/12">
                  <Button variant="outline" size="icon">
                    <ThemeArrowChange />
                  </Button>
                </div>
                <div className="space-y-1  w-5/12">
                  <Label htmlFor="destination">Nach</Label>
                  <Input id="destination" defaultValue="Brugg" />
                  <CardDescription className="pt-2">
                    Gib den Zielort ein.
                  </CardDescription>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <div className="space-y-1  w-4/12">
                  <Label htmlFor="datetime">Wann</Label>
                  <Input id="datetime" type="datetime-local" />
                  <CardDescription className="pt-2">
                    Gib Datum und Uhrzeit ein.
                  </CardDescription>
                </div>
                <div className="space-y-1  w-4/12 content-center lg:mt-[-4px] mt-[-24px]">
                  <Tabs defaultValue="departure">
                    <TabsList className="lg:w-64">
                      <TabsTrigger className="lg:w-32" value="departure">
                        Abreise
                      </TabsTrigger>
                      <TabsTrigger className="lg:w-32" value="arrival">
                        Ankunft
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="content-center lg:mt-[-4px] mt-[-24px]">
                  <Button id="submit" type="submit" className="lg:w-40">
                    Suche
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="recent-journeys">
        <Card></Card>
      </TabsContent>
    </Tabs>
  );
}
