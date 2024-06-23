import { MessageCircleQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react";

/**
 * Component representing a help button with an icon and text.
 * @returns {JSX.Element} HelpButton component with icon and text.
 */
export function HelpButton() {
  return (
    <Button variant="secondary" className="flex items-center md:text-base">
      <MessageCircleQuestion className="h-4 w-4 mr-2" />
      <span>Brauchst du Hilfe?</span>
    </Button>
  );
}
