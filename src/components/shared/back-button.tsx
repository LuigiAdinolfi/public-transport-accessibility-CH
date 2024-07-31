"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { useRouter } from "next/navigation";

/**
 * A button component that navigates back to the previous page in the router history.
 *
 * This component utilizes the `router.back()` method to navigate backward in the application's history.
 * It includes an icon (ArrowLeft) and a label ("Zurück") to indicate the back action.
 *
 * @returns {React.ReactElement} The rendered back button component.
 */
export function BackButton(): React.ReactElement {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className="h-11 md:text-base"
      type="button"
      onClick={() => router.back()}
      aria-label="Zurück"
    >
      {/* Arrow icon indicating the back action */}
      <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
      Zurück
    </Button>
  );
}
