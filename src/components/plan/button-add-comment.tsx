import { MessageCirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react";

export function ButtonAddComment() {
  return (
    <Button variant="secondary">
      <MessageCirclePlus className="mr-2 h-4 w-4" />
      Kommentar hinzufügen
    </Button>
  );
}
