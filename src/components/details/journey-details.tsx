import { HelpButton } from "@/components/shared/help-button";
import * as React from "react";
import { BackButton } from "@/components/shared/back-button";
import Link from "next/link";

export function JourneyDetails() {
  return (
    <div className="w-full lg:w-[960px]">
      <div className="mt-1 flex items-center justify-between">
        <Link href={"/select"} passHref legacyBehavior>
          <BackButton />
        </Link>
        <HelpButton />
      </div>
    </div>
  );
}
