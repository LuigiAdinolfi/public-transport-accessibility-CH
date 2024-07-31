"use client";

import * as React from "react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardNews } from "@/components/community/card-news";
import { CardForum } from "@/components/community/card-forum";
import { useTheme } from "next-themes";
import { CircleIcons } from "@/components/details/circle-icons";

type ActiveTab = "news" | "forum";

/**
 * Component representing the community card for news and forum.
 * Provides a tabbed interface to switch between news and forum content.
 * @returns {React.ReactElement} The CommunityCard component.
 */
export function CommunityCard(): React.ReactElement {
  // Retrieve the current theme (light or dark) using the useTheme hook from next-themes
  const { resolvedTheme } = useTheme();
  // State to manage the active tab, initialized to "news"
  const [activeTab, setActiveTab] = useState<ActiveTab>("news");

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
              value="news"
            >
              <div className="lg:pt-[2px]">
                <CircleIcons
                  active={activeTab === "news"}
                  darkTheme={resolvedTheme === "dark"}
                />
              </div>
              <div className="pl-1 md:text-lg lg:pl-2">News</div>
            </TabsTrigger>
            <TabsTrigger
              className="mx-1 flex items-center text-zinc-700 active:text-zinc-950 dark:text-zinc-300 dark:active:text-white lg:h-12 lg:text-base"
              value="forum"
            >
              <div className="lg:pt-[2px]">
                <CircleIcons
                  active={activeTab === "forum"}
                  darkTheme={resolvedTheme === "dark"}
                />
              </div>
              <div className="pl-1 md:text-lg lg:pl-2">Forum</div>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="news">
          <CardNews />
        </TabsContent>
        <TabsContent value="forum">
          <CardForum />
        </TabsContent>
      </div>
    </Tabs>
  );
}
