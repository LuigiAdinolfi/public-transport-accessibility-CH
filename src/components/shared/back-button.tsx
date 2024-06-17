"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();
  return (
    <Button variant="outline" type="button" onClick={() => router.back()}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      Zurück
    </Button>
  );
}
