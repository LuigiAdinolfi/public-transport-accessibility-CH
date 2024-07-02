"use client";

import * as React from "react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardNews } from "@/components/community/card-news"; 
import { CardForum } from "@/components/community/card-forum"; 
import { useTheme } from "next-themes";
import { DarkActiveCircle, LightActiveCircle } from "@/assets/icons/active-circle";
import { DarkInactiveCircle, LightInactiveCircle } from "@/assets/icons/inactive-circle";
import { HelpButton } from "@/components/shared/help-button";

/**
 * Component representing the community card for news and forum.
 * @returns {JSX.Element} - CommunityCard component.
 */
export function CommunityCard() {
  // State variables
  const [activeTab, setActiveTab] = useState("news");

  // Theme hook
  const { resolvedTheme } = useTheme();

  // Function to render the active/inactive circle based on the theme and active tab
  const renderCircle = (tab: string, isActive: boolean) => {
    if (resolvedTheme === "dark") {
      return isActive ? <DarkActiveCircle /> : <DarkInactiveCircle />;
    } else {
      return isActive ? <LightActiveCircle /> : <LightInactiveCircle />;
    }
  };

  return (
    <Tabs
      defaultValue={activeTab}
      className="w-full lg:w-[960px]"
      onValueChange={(value) => setActiveTab(value)}
    >
      <div className="flex flex-col">
        {/* Mobile variant of HelpButton */}
        <div className="flex md:hidden justify-end pb-6">
          <HelpButton />
        </div>

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

          {/* Desktop variant of HelpButton */}
          <div className="hidden md:flex">
            <HelpButton />
          </div>
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