import { MessageCirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react";

/**
 * Component representing a button to add a comment.
 * @returns {JSX.Element} JSX Element
 */
export function ButtonAddComment() {
  return (
    <Button variant="secondary" aria-label="Kommentar hinzufügen">
      <MessageCirclePlus className="mr-2 h-4 w-4" aria-hidden="true" />
      <span>Kommentar hinzufügen</span>
    </Button>
  );
}
