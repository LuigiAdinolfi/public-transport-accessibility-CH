import { MessageCircleQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react";

/**
 * Component representing a help button with an icon and text.
 *
 * This component renders a button with a question mark icon and the text
 * "Brauchst du Hilfe?" ("Do you need help?"). It uses a secondary button
 * variant for styling and aligns the icon and text horizontally.
 *
 * @returns {React.ReactElement} - The rendered help button.
 */
export function HelpButton(): React.ReactElement {
  return (
    <Button variant="secondary" className="flex items-center md:text-base">
      <MessageCircleQuestion className="mr-2 h-4 w-4" />
      <span>Brauchst du Hilfe?</span>
    </Button>
  );
}
