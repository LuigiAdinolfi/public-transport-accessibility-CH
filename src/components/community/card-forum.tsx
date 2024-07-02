import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card";
import * as React from "react";
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input"; 
import { useTheme } from "next-themes";
import { useRouter } from "next/router"; // Import useRouter from next/router

/**
 * Component representing a card displaying forum posts.
 * @returns {JSX.Element} JSX Element
 */
export function CardForum() {
  const { resolvedTheme } = useTheme();
  //const router = useRouter(); 
  // Example forum posts data, enhanced with duration since posted and view count
  const forumPosts = [
    {
      id: 1,
      title: "Zukunft der Bahnreisen",
      date: "08.05.2024",
      summary: "Wie sehen Sie die Zukunft der Bahnreisen in Anbetracht der technologischen Entwicklungen?",
      daysAgo: 10, // Example value, replace with actual logic to calculate days ago
      views: 150, // Example view count
    },
    {
      id: 2,
      title: "Erfahrungen mit dem neuen Fahrplan",
      date: "15.04.2024",
      summary: "Hat jemand Erfahrungen mit dem neuen Fahrplan gemacht? Teilen Sie Ihre Gedanken und Tipps.",
      daysAgo: 20, // Example value, replace with actual logic to calculate days ago
      views: 75, // Example view count
    },
  ];

  // Function to handle post click
  const handlePostClick = (postId: number) => {
    // Navigate to the post's page using its ID
   // router.push(`/forum/posts/${postId}`);
  };

  return (
    <Card>
      <CardHeader className="pb-8 flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <Input placeholder="Suche im Forum..." className="flex-grow mr-4" />
          <Button variant="outline" className="self-start">Suche</Button>
        </div>
        <Button variant="outline" className="self-start">Neuer Beitrag</Button>
      </CardHeader>
      <CardContent className="space-y-8 lg:pb-12">
        {forumPosts.length > 0 ? (
          forumPosts.map((post) => (
            <div key={post.id} className="border-2 border-gray-300 p-4 rounded-lg cursor-pointer hover:border-gray-400" onClick={() => handlePostClick(post.id)}>
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-500">{post.date} - {post.daysAgo} Tage her - {post.views} Ansichten</p>
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