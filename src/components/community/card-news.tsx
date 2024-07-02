import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card";
import * as React from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router"; // Import useRouter from next/router

/**
 * Component representing a card displaying news.
 * @returns {JSX.Element} JSX Element
 */
export function CardNews() {
  const { resolvedTheme } = useTheme();
 // const router = useRouter(); // Use useRouter hook for navigation

  // Example news data, replace with actual data fetching logic
  const newsItems = [
    {
      id: 1, // Assume each news item has a unique ID
      title: "Neue Zuggeneration vorgestellt",
      date: "08.05.2024",
      summary: "Eine innovative Zuggeneration wurde heute von der Bahnindustrie vorgestellt, die...",
    },
    {
      id: 2, // Assume each news item has a unique ID
      title: "Erweiterung des Schienennetzes",
      date: "15.04.2024",
      summary: "Die Regierung hat Pläne zur Erweiterung des nationalen Schienennetzes bekanntgegeben...",
    },
  ];

  // Function to handle news click
  const handleNewsClick = (newsId: number) => {
    // Navigate to the news's page using its ID
   // router.push(`/news/${newsId}`);
  };

  return (
    <Card>
      <CardHeader className="pb-8">
        <CardDescription className="text-zinc-600 md:text-base">
          Aktuelle Nachrichten
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 lg:pb-12">
        {newsItems.length > 0 ? (
          newsItems.map((news) => (
            // Added a border and padding to create a frame around clickable elements
            <div key={news.id} className="border-2 border-gray-300 p-4 rounded-lg cursor-pointer hover:border-gray-400" onClick={() => handleNewsClick(news.id)}>
              <h3 className="text-lg font-semibold">{news.title}</h3>
              <p className="text-sm text-gray-500">{news.date}</p>
              <p className="mt-2 text-base">{news.summary}</p>
            </div>
          ))
        ) : (
          <CardDescription className="flex justify-center w-full text-base">
            Keine aktuellen Nachrichten vorhanden.
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
}