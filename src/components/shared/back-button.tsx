"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { useRouter } from "next/navigation";

/**
 * Back button component that navigates back in the router history.
 * @returns {JSX.Element} BackButton component.
 */
export function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      type="button"
      onClick={() => router.back()}
      aria-label="Zurück"
    >
      <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
      Zurück
    </Button>
  );
}
