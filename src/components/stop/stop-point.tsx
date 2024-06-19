import { HelpButton } from "@/components/shared/help-button";
import * as React from "react";
import { BackButton } from "@/components/shared/back-button";

export function StopPoint() {
  return (
    <div className="w-full lg:w-[960px]">
      <div className="mt-1 flex items-center justify-between">
        <BackButton />
        <HelpButton />
      </div>
    </div>
  );
}
