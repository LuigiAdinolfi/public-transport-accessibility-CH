import { MessageCircleQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react";

export function HelpButton() {
  return (
    <Button variant="secondary">
      {/*<Button className="mr-4 bg-indigo-900 hover:bg-indigo-800 dark:text-zinc-100">*/}
      <MessageCircleQuestion className="mr-2 h-4 w-4" />
      Brauchst du Hilfe?
    </Button>
  );
}
