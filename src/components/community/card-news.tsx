import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import * as React from "react";
import { Button } from "@/components/ui/button";

/**
 * Component representing a card displaying news.
 * @returns {React.ReactElement} JSX Element
 */
export function CardNews(): React.ReactElement {
  // Example news data, replace with actual data fetching logic
  const newsItems = [
    {
      id: 1, // Assume each news item has a unique ID
      title: "Neue Zuggeneration vorgestellt",
      date: "08.05.2024",
      summary:
        "Eine innovative Zuggeneration wurde heute von der Bahnindustrie vorgestellt, die...",
    },
    {
      id: 2, // Assume each news item has a unique ID
      title: "Erweiterung des Schienennetzes",
      date: "15.04.2024",
      summary:
        "Die Regierung hat Pläne zur Erweiterung des nationalen Schienennetzes bekanntgegeben...",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-8">
        <CardDescription className="text-sm text-zinc-600 md:text-base">
          Aktuelle Nachrichten
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {newsItems.length > 0 ? (
          newsItems.map((news) => (
            // Added a border and padding to create a frame around clickable elements
            <Button
              key={news.id}
              className="ml-auto flex h-auto w-full flex-col items-start justify-start border border-zinc-800 bg-white dark:border-zinc-300 dark:bg-zinc-900 md:min-h-36"
              variant="outline"
              onClick={() => {}}
            >
              <div className="flex px-5 pt-3 text-lg font-semibold">
                <p className="hyphens-auto whitespace-normal break-words text-left">
                  {news.title}
                </p>
              </div>
              <div className="flex px-5 pt-1 text-sm text-zinc-600 dark:text-zinc-300">
                <p className="hyphens-auto whitespace-normal break-words text-left">
                  {news.date}
                </p>
              </div>
              <div className="flex px-5 pb-2 pt-6 text-base">
                <p className="hyphens-auto whitespace-normal break-words text-left">
                  {news.summary}
                </p>
              </div>
            </Button>
          ))
        ) : (
          <CardDescription className="flex w-full justify-center text-base">
            Keine aktuellen Nachrichten vorhanden.
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
}
