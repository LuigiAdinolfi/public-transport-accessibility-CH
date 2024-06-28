"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { useRouter } from "next/navigation";

/**
 * Back button component that navigates back in the router history.
 * @returns {React.ReactElement} The back button component.
 */
export function BackButton(): React.ReactElement {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className="md:text-base"
      type="button"
      onClick={() => router.back()}
      aria-label="Back"
    >
      <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
      Zurück
    </Button>
  );
}
