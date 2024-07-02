import {
    Card,
    CardContent,
    CardDescription,
    CardHeader
  } from "@/components/ui/card";
  import * as React from "react";
  import { Button } from "@/components/ui/button";
  import { useTheme } from "next-themes";
  
  /**
   * Component representing a card displaying forum posts.
   * @returns {JSX.Element} JSX Element
   */
  export function CardForum() {
    const { resolvedTheme } = useTheme();
  
    // Example forum posts data, replace with actual data fetching logic
    const forumPosts = [
      {
        title: "Zukunft der Bahnreisen",
        date: "08.05.2024",
        summary: "Wie sehen Sie die Zukunft der Bahnreisen in Anbetracht der technologischen Entwicklungen?",
      },
      {
        title: "Erfahrungen mit dem neuen Fahrplan",
        date: "15.04.2024",
        summary: "Hat jemand Erfahrungen mit dem neuen Fahrplan gemacht? Teilen Sie Ihre Gedanken und Tipps.",
      },
    ];
  
    return (
      <Card>
        <CardHeader className="pb-8 flex justify-between items-center">
          <CardDescription className="text-zinc-600 md:text-base">
            Forum Beiträge
          </CardDescription>
          <Button       
          variant="outline"
         className="md:text-base"
        type="button">Neuer Beitrag</Button>
        </CardHeader>
        <CardContent className="space-y-8 lg:pb-12">
          {forumPosts.length > 0 ? (
            forumPosts.map((post, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-500">{post.date}</p>
                <p className="mt-2 text-base">{post.summary}</p>
              </div>
            ))
          ) : (
            <CardDescription className="flex justify-center w-full text-base">
              Keine Beiträge vorhanden.
            </CardDescription>
          )}
        </CardContent>
      </Card>
    );
  }