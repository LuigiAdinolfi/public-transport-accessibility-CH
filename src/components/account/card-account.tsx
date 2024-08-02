"use client";

import * as React from "react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import { CircleIcons } from "@/components/details/circle-icons";
import { CardProfile } from "@/components/account/card-profile";
import { CardRating } from "@/components/account/card-rating";

type ActiveTab = "profile" | "ratings";

/**
 * Component representing the account card.
 * Provides a tabbed interface to switch between profile and ratings.
 * @returns {React.ReactElement} The AccountCard component.
 */
export function AccountCard(): React.ReactElement {
  // Retrieve the current theme (light or dark) using the useTheme hook from next-themes
  const { resolvedTheme } = useTheme();
  // State to manage the active tab, initialized to "profile"
  const [activeTab, setActiveTab] = useState<ActiveTab>("profile");

  return (
    <Tabs
      // Set the default active tab and manage tab value change
      defaultValue={activeTab}
      className="mx-auto w-full max-w-screen-lg px-0 lg:h-14"
      onValueChange={(value) => setActiveTab(value as ActiveTab)}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-full grid-cols-2 md:w-1/2 lg:h-14">
            <TabsTrigger
              className="mx-1 flex items-center text-zinc-700 active:text-zinc-950 dark:text-zinc-300 dark:active:text-white lg:h-12"
              value="profile"
            >
              <div className="lg:pt-[2px]">
                <CircleIcons
                  active={activeTab === "profile"}
                  darkTheme={resolvedTheme === "dark"}
                />
              </div>
              <div className="pl-1 md:text-lg lg:pl-2">Profil</div>
            </TabsTrigger>
            <TabsTrigger
              className="mx-1 flex items-center text-zinc-700 active:text-zinc-950 dark:text-zinc-300 dark:active:text-white lg:h-12 lg:text-base"
              value="ratings"
            >
              <div className="lg:pt-[2px]">
                <CircleIcons
                  active={activeTab === "ratings"}
                  darkTheme={resolvedTheme === "dark"}
                />
              </div>
              <div className="pl-1 md:text-lg lg:pl-2">Meine Bewertungen</div>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="profile">
          <CardProfile />
        </TabsContent>
        <TabsContent value="ratings">
          <CardRating />
        </TabsContent>
      </div>
    </Tabs>
  );
}
