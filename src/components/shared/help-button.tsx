import { MessageCircleQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react";

export function HelpButton() {
  return (
    <Button className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700">
      {/*<Button className="mr-4 bg-indigo-900 hover:bg-indigo-800 dark:text-zinc-100">*/}
      <MessageCircleQuestion className="mr-2 h-4 w-4" />
      Brauchst du Hilfe?
    </Button>
  );
}
