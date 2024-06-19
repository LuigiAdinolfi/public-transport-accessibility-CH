"use client";

import { HelpButton } from "@/components/shared/help-button";
import * as React from "react";
import { BackButton } from "@/components/shared/back-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useTheme } from "next-themes";
import { DarkActiveCircle, LightActiveCircle } from "@/assets/icons/active-circle";
import { DarkInactiveCircle, LightInactiveCircle } from "@/assets/icons/inactive-circle";
import { CardFirstPath } from "@/components/details/card-first-path";
import { DummyMap } from "@/components/details/dummy-map";

export function JourneyDetails() {
  // State variables
  const [activeRouteTab, setActiveRouteTab] = useState("first-route");
  // Theme hook
  const { resolvedTheme } = useTheme();

  return (
    <div className="w-full lg:w-[960px]">
      <div className="mt-1 flex items-center justify-between">
        <BackButton />
        <HelpButton />
      </div>
      <Tabs
        defaultValue={activeRouteTab}
        onValueChange={(value) => setActiveRouteTab(value)}
      >
        <div className="flex items-center justify-between pt-3">
          <TabsList className="grid grid-cols-2 lg:h-12 lg:w-full">
            <TabsTrigger
              className="mx-1 text-zinc-700 active:text-zinc-950 dark:text-zinc-300 dark:active:text-white lg:h-10 lg:text-base"
              value="first-route"
            >
              {resolvedTheme === "dark" ? (
                activeRouteTab === "first-route" ? (
                  <DarkActiveCircle />
                ) : (
                  <DarkInactiveCircle />
                )
              ) : activeRouteTab === "first-route" ? (
                <LightActiveCircle />
              ) : (
                <LightInactiveCircle />
              )}
              <div className="pl-1 lg:pl-2">Basel SBB - Olten</div>
            </TabsTrigger>
            <TabsTrigger
              className="mx-1 text-zinc-700 active:text-zinc-950 dark:text-zinc-300 dark:active:text-white lg:h-10 lg:text-base"
              value="second-route"
            >
              {resolvedTheme === "dark" ? (
                activeRouteTab === "second-route" ? (
                  <DarkActiveCircle />
                ) : (
                  <DarkInactiveCircle />
                )
              ) : activeRouteTab === "second-route" ? (
                <LightActiveCircle />
              ) : (
                <LightInactiveCircle />
              )}
              <div className="pl-1 lg:pl-2">Olten - Brugg AG</div>
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="first-route" className="flex flex-col gap-8">
          <CardFirstPath />
          <DummyMap />
        </TabsContent>
        <TabsContent value="second-route">
          {/*<CardSecondPath />*/}
        </TabsContent>
      </Tabs>
    </div>
  );
}
