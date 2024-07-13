import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { SelectDemo } from "@/components/community/filter-forum";

/**
 * Component representing a card displaying forum posts.
 * @returns {React.ReactElement} JSX Element
 */
export function CardForum(): React.ReactElement {
  // Example forum posts data, enhanced with duration since posted and view count
  const forumPosts = [
    {
      id: 1,
      title: "Zukunft der Bahnreisen",
      date: "08.05.2024",
      summary:
        "Wie sehen Sie die Zukunft der Bahnreisen in Anbetracht der technologischen Entwicklungen?",
      daysAgo: 10, // Example value, replace with actual logic to calculate days ago
      views: 150, // Example view count
    },
    {
      id: 2,
      title: "Erfahrungen mit dem neuen Fahrplan",
      date: "15.04.2024",
      summary:
        "Hat jemand Erfahrungen mit dem neuen Fahrplan gemacht? Teilen Sie Ihre Gedanken und Tipps.",
      daysAgo: 20, // Example value, replace with actual logic to calculate days ago
      views: 75, // Example view count
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-col pb-4 pt-8">
        <div className="flex items-center justify-between">
          <div className="flex w-full items-center space-x-4">
            <Input type="search" placeholder="Suche im Forum..." />
            <Button type="submit" variant="secondary" className="lg:w-48">
              Suche
            </Button>
            <SelectDemo />
          </div>
        </div>
        <div className="flex items-center justify-start pb-2 pt-8">
          <Button variant="outline" className="self-start lg:w-40">
            <span className="pr-2">Neuer Beitrag</span>
            <Plus size={16} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {forumPosts.length > 0 ? (
          forumPosts.map((post) => (
            <Button
              key={post.id}
              className="ml-auto flex h-auto w-full flex-col items-start justify-start border-zinc-400 md:min-h-36"
              variant="outline"
              onClick={() => {}}
            >
              <div className="flex px-5 pt-3 text-lg font-semibold">
                <p className="hyphens-auto whitespace-normal break-words text-left">
                  {post.title}
                </p>
              </div>
              <div className="flex px-5 pt-1 text-sm text-gray-500">
                <p className="hyphens-auto whitespace-normal break-words text-left">
                  {post.date} - {post.daysAgo} Tage her - {post.views} Ansichten
                </p>
              </div>
              <div className="flex px-5 pb-2 pt-6 text-base">
                <p className="hyphens-auto whitespace-normal break-words text-left">
                  {post.summary}
                </p>
              </div>
            </Button>
          ))
        ) : (
          <CardDescription className="flex w-full justify-center text-base">
            Keine Beiträge vorhanden.
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
}
