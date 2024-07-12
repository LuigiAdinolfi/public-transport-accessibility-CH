"use client";

import * as React from "react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardNews } from "@/components/community/card-news"; 
import { CardForum } from "@/components/community/card-forum"; 
import { useTheme } from "next-themes";
import {
  DarkActiveCircle,
  LightActiveCircle,
  DarkInactiveCircle,
  LightInactiveCircle,
} from "@/assets/icons/active-circle";

import { HelpButton } from "@/components/shared/help-button";

type ActiveTab = "news" | "forum";
/**
 * Component representing the community card for news and forum.
 * @returns {JSX.Element} - CommunityCard component.
 */
export function CommunityCard() {
   // Theme hook
   const { resolvedTheme } = useTheme();
  
    // Function to render the active/inactive circle based on the theme and active tab
    const renderCircle = (
      _tab: ActiveTab,
      isActive: boolean,
    ): React.ReactElement => {
      if (resolvedTheme === "dark") {
        return isActive ? <DarkActiveCircle /> : <DarkInactiveCircle />;
      } else {
        return isActive ? <LightActiveCircle /> : <LightInactiveCircle />;
      }
    };
  // State variables
  const [activeTab, setActiveTab] = useState<ActiveTab>("news");

  return (
    <>
      <Tabs
        defaultValue={activeTab}
        className="w-full lg:w-[960px]"
        onValueChange={(value) => setActiveTab(value as ActiveTab)}
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <TabsList className="grid grid-cols-2 lg:h-12 md:w-1/2 w-full">
              <TabsTrigger
                className="mx-1 text-zinc-700 active:text-zinc-950 dark:text-zinc-300 dark:active:text-white lg:h-10 lg:text-base"
                value="news"
              >
                {renderCircle("news", activeTab === "news")}
                <div className="pl-1 lg:pl-2 md:text-base">News</div>
              </TabsTrigger>
              <TabsTrigger
                className="mx-1 text-zinc-700 active:text-zinc-950 dark:text-zinc-300 dark:active:text-white lg:h-10 lg:text-base"
                value="forum"
              >
                 {renderCircle("forum", activeTab === "forum")}
                <div className="pl-1 lg:pl-2 md:text-base">Forum</div>
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
    </>
  );
}